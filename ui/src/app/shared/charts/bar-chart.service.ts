import {Injectable} from '@angular/core';
import {ChartDataset} from 'chart.js/dist/types';

import {ChartUtils} from '@/app/shared/charts/chart.utils';
import {LifeIndexFetcher} from '@/app/shared/services/fetch/life-index.fetcher';
import {LifeIndexMultipleResponses} from '@/app/views/atlas/constants/response.types';

@Injectable({
    providedIn: 'root'
})
export class BarChartService {
    constructor(
        private chartUtils: ChartUtils,
        private lifeIndexFetcher: LifeIndexFetcher
    ) {}

    public generateChartDatasets = (scores: LifeIndexMultipleResponses): ChartDataset[] => {
        const datasets = [] as ChartDataset[];
        const timeRange = this.chartUtils.extractTimeRange(scores);

        for (let year of timeRange) {
            const data = this.lifeIndexFetcher.reduce(scores, year);
            const dataset = this.chartUtils.generateChartDataset(Object.values(data)) as ChartDataset;
            dataset.label = year.toString();
            datasets.push(dataset);
        }

        return datasets;
    };
}
