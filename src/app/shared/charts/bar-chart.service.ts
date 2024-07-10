import {Injectable} from '@angular/core';
import {ChartDataset} from 'chart.js/dist/types';

import {BackendService} from '@/app/views/atlas/services/backend.service';
import {ChartUtils} from '@/app/shared/charts/chart.utils';
import {Filter} from '@/app/shared/filter';
import {LifeIndexMultipleResponses} from '@/app/views/atlas/constants/response.types';

@Injectable({
    providedIn: 'root'
})
export class BarChartService {
    constructor(
        private backendService: BackendService,
        private chartUtils: ChartUtils,
        private filter: Filter
    ) {}

    public generateChartDatasets = (scores: LifeIndexMultipleResponses): ChartDataset[] => {
        const {startYear, endYear} = this.filter.baseFilter;
        const datasets = [] as ChartDataset[];

        for (let year = startYear; year <= endYear; year++) {
            const data = this.backendService.reduceLifeIndexes(scores, year);
            const dataset = this.chartUtils.generateChartDataset(Object.values(data)) as ChartDataset;
            dataset.label = year.toString();
            datasets.push(dataset);
        }

        return datasets;
    };
}
