import {Injectable} from '@angular/core';
import Chart from 'chart.js/auto';
import {ChartDataset} from 'chart.js/dist/types';

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

    private getChartTitle = (): string => {
        const {startYear, endYear} = this.filter.baseFilter;
        const label =  this.filter.baseFilter.isAggregateAnalysis()
            ? 'QoLI Stats'
            : this.filter.individuallyFilter.selectedIndicator.label;

        return startYear === endYear
            ? `${label} For The Year ${this.filter.baseFilter.startYear}`
            : `${label} For The Period ${startYear} - ${endYear}`;
    };

    private initDataset = (data: number[] = []): ChartDataset => {
        return {
            label: 'QoLI Stats',
            data,
            borderWidth: 2,
            borderRadius: 4,
            borderSkipped: false
        };
    };

    private updateChartDatasets = (chart: Chart, scores: LifeIndexMultipleResponses): void => {
        const {startYear, endYear} = this.filter.baseFilter;
        const datasets = [];

        for (let year = startYear; year <= endYear; year++) {
            const data = this.backendService.reduceLifeIndexes(scores, year);
            const dataset = this.initDataset(Object.values(data));
            dataset.label = year.toString();
            datasets.push(dataset);
        }

        chart.data.datasets = datasets;
        chart.update();
    };

    private updateChartLabel = (chart: Chart): void => {
        const tooltip = chart?.options?.plugins?.tooltip;
        const isIndividuallyAnalysis = this.filter.baseFilter.isIndividuallyAnalysis();

        if (tooltip?.callbacks) {
            tooltip.callbacks.label = (context) => {
                const units = this.datasetService.getUnits(isIndividuallyAnalysis);
                return `${context.formattedValue} ${units}`;
            }
        }

        chart.update();
    };

    private updateChartLabels = (chart: Chart, scores: LifeIndexMultipleResponses): void => {
        chart.data.labels = this.filter.baseFilter.countries;
        chart.update();
    };

    private updateChartTitle = (chart: Chart) => {
        const title = chart?.options?.plugins?.title;

        if (title?.text) {
            title.text = this.getChartTitle();
        }

        chart.update();
    };

    public updateChart = (chart: Chart | undefined, scores: LifeIndexMultipleResponses): void => {
        if (chart === undefined) {
            return;
        }

        this.updateChartDatasets(chart, scores);
        this.updateChartLabel(chart);
        this.updateChartLabels(chart, scores);
        this.updateChartTitle(chart);
    };

    public initChart = (id: string) => {
        return new Chart(
            id,
            {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [
                        this.initDataset()
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: this.getChartTitle()
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.formattedValue;
                                },
                                title: (context) => {
                                    const countryCode = context[0].label;
                                    const year = context[0].dataset.label;

                                    return `${COUNTRIES[countryCode]} (${year})`;
                                }
                            }
                        }
                    }
                }
            }
        );
    };
}

