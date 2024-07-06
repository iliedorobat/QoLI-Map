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

    public regenerateChart = (chart: Chart | undefined, scores: LifeIndexMultipleResponses, horizontal = false): Chart => {
        // TODO:
        // this.chart.options.indexAxis = this.indexAxis;
        // this.chart.update();

        chart?.destroy();
        const datasets = this.prepareChartDatasets(scores);
        const newChart = this.initChart('stats', datasets, horizontal);
        this.updateChartLabels(newChart);

        return newChart;
    }

    public updateChart = (chart: Chart | undefined, scores: LifeIndexMultipleResponses): void => {
        if (chart === undefined) {
            return;
        }

        this.updateChartDatasets(chart, scores);
        this.updateChartLabel(chart);
        this.updateChartLabels(chart);
        this.updateChartTitle(chart);
    };

    public initChart = (id: string, datasets = [this.initChartDataset()], horizontal = false) => {
        return new Chart(
            id,
            {
                type: 'bar',
                data: {
                    labels: [],
                    datasets
                },
                options: {
                    indexAxis: horizontal ? 'y' : 'x',
                    maintainAspectRatio: false,
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

    private getChartTitle = (): string => {
        const {startYear, endYear} = this.filter.baseFilter;
        const label =  this.filter.baseFilter.isAggregateAnalysis()
            ? 'QoLI Stats'
            : this.filter.individuallyFilter.selectedIndicator.label;

        return startYear === endYear
            ? `${label} For The Year ${this.filter.baseFilter.startYear}`
            : `${label} For The Period ${startYear} - ${endYear}`;
    };

    private initChartDataset = (data: number[] = []): ChartDataset => {
        return {
            label: 'QoLI Stats',
            data,
            borderWidth: 2,
            borderRadius: 4,
            borderSkipped: false
        };
    };

    private prepareChartDatasets = (scores: LifeIndexMultipleResponses): ChartDataset[] => {
        const {startYear, endYear} = this.filter.baseFilter;
        const datasets = [] as ChartDataset[];

        for (let year = startYear; year <= endYear; year++) {
            const data = this.backendService.reduceLifeIndexes(scores, year);
            const dataset = this.initChartDataset(Object.values(data));
            dataset.label = year.toString();
            datasets.push(dataset);
        }

        return datasets;
    };

    private updateChartDatasets = (chart: Chart, scores: LifeIndexMultipleResponses): void => {
        chart.data.datasets = this.prepareChartDatasets(scores);
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

    private updateChartLabels = (chart: Chart): void => {
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
}

