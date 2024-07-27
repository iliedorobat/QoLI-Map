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

    sortByDesc(a: number, b: number) {
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        }
        return 0;
    }

    public generateChartDatasets = (scores: LifeIndexMultipleResponses): ChartDataset[] => {
        const datasets = [] as ChartDataset[];

        for (const [country, values] of Object.entries(scores)) {
            const periods = Object.keys(values)
                .map((year: string) => parseInt(year))
                .sort(this.sortByDesc);
            const tempData = periods.map((year: number) => values[year]);
            const data = this.chartUtils.generateChartDataset(tempData, country);
            datasets.push(data);
        }

        return datasets;
    }
}
