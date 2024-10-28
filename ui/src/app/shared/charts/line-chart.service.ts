import {Injectable} from '@angular/core';
import {ChartDataset} from 'chart.js/dist/types';

import {ChartUtils} from '@/app/shared/charts/chart.utils';
import {LifeIndexMultipleResponses} from '@/app/views/atlas/constants/response.types';

@Injectable({
    providedIn: 'root'
})
export class LineChartService {
    constructor(
        private chartUtils: ChartUtils,
    ) {}

    public generateChartDatasets = (scores: LifeIndexMultipleResponses): ChartDataset[] => {
        const datasets = [] as ChartDataset[];
        const timeRange = this.chartUtils.extractTimeRange(scores);

        for (const [country, values] of Object.entries(scores)) {
            const tempData = timeRange.map((year: number) => values[year]);
            const data = this.chartUtils.generateChartDataset(tempData, country);
            datasets.push(data);
        }

        return datasets;
    }
}
