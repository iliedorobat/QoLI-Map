import {Injectable} from '@angular/core';
import {ChartDataset} from 'chart.js/dist/types';

import {ChartUtils} from '@/app/shared/charts/chart.utils';
import {Filter} from '@/app/shared/filter';
import {LifeIndexFetcher} from '@/app/shared/services/fetch/life-index.fetcher';
import {LifeIndexMultipleResponses} from '@/app/views/atlas/constants/response.types';

@Injectable({
    providedIn: 'root'
})
export class BarChartService {
    constructor(
        private chartUtils: ChartUtils,
        private filter: Filter,
        private lifeIndexFetcher: LifeIndexFetcher
    ) {}

    public generateChartDatasets = (scores: LifeIndexMultipleResponses): ChartDataset[] => {
        const {startYear, endYear} = this.filter.baseFilter;
        const datasets = [] as ChartDataset[];

        for (let year = startYear; year <= endYear; year++) {
            const data = this.lifeIndexFetcher.reduce(scores, year);
            const dataset = this.chartUtils.generateChartDataset(Object.values(data)) as ChartDataset;
            dataset.label = year.toString();
            datasets.push(dataset);
        }

        return datasets;
    };
}
