import {Injectable} from '@angular/core';
import {ChartData, ChartDataset, ChartOptions} from 'chart.js/dist/types';

import {BackendService} from '@/app/views/atlas/services/backend.service';
import {DatasetService} from '@/app/views/atlas/services/dataset.service';
import {Filter} from '@/app/shared/filter';
import {LifeIndexMultipleResponses} from '@/app/views/atlas/constants/response.types';

import {COUNTRIES} from '@/app/shared/constants/app.const';

@Injectable({
    providedIn: 'root'
})
export class StatsScreenService {
    constructor(
        private backendService: BackendService,
        private datasetService: DatasetService,
        protected filter: Filter
    ) {}

    private generateChartTitle = (): string => {
        const {startYear, endYear} = this.filter.baseFilter;
        const label =  this.filter.baseFilter.isAggregateAnalysis()
            ? 'QoLI Stats'
            : this.filter.individuallyFilter.selectedIndicator.label;

        return startYear === endYear
            ? `${label} For The Year ${this.filter.baseFilter.startYear}`
            : `${label} For The Period ${startYear} - ${endYear}`;
    };

    private generateChartDataset = (data: number[] = []): ChartDataset => {
        return {
            label: 'QoLI Stats',
            data,
            borderWidth: 2,
            borderRadius: 4,
            borderSkipped: false
        };
    };

    private generateChartDatasets = (scores: LifeIndexMultipleResponses): ChartDataset[] => {
        const {startYear, endYear} = this.filter.baseFilter;
        const datasets = [] as ChartDataset[];

        for (let year = startYear; year <= endYear; year++) {
            const data = this.backendService.reduceLifeIndexes(scores, year);
            const dataset = this.generateChartDataset(Object.values(data)) as ChartDataset;
            dataset.label = year.toString();
            datasets.push(dataset);
        }

        return datasets;
    };

    public generateChartData = (scores?: LifeIndexMultipleResponses): ChartData => {
        return {
            labels: this.filter.baseFilter.countries,
            datasets: scores
                ? this.generateChartDatasets(scores)
                : [this.generateChartDataset()]
        };
    };

    public generateChartOptions = (horizontal = false): ChartOptions => {
        return {
            indexAxis: horizontal ? 'y' : 'x',
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: this.generateChartTitle()
                },
                tooltip: {
                    callbacks: {
                        label: (context): string => {
                            const isIndividuallyAnalysis = this.filter.baseFilter.isIndividuallyAnalysis();
                            const units = this.datasetService.getUnits(isIndividuallyAnalysis);
                            return `${context.formattedValue} ${units}`;
                        },
                        title: (context): string => {
                            const countryCode = context[0].label;
                            const year = context[0].dataset.label;

                            return `${COUNTRIES[countryCode]} (${year})`;
                        }
                    }
                }
            }
        };
    };
}

