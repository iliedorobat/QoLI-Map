import {Injectable} from '@angular/core';
import {ChartData, ChartDataset, ChartOptions, ChartTypeRegistry} from 'chart.js/dist/types';

import {BarChartService} from '@/app/shared/charts/bar-chart.service';
import {ChartUtils} from '@/app/shared/charts/chart.utils';
import {DatasetService} from '@/app/views/atlas/services/dataset.service';
import {Filter} from '@/app/shared/filter';
import {LifeIndexMultipleResponses} from '@/app/views/atlas/constants/response.types';
import {LineChartService} from '@/app/shared/charts/line-chart.service';
import {StatsService} from '@/app/views/stats/stats.service';

import {COUNTRIES} from '@/app/shared/constants/app.const';
import {CHART_DIRECTION} from '@/app/shared/charts/chart.const';

@Injectable({
    providedIn: 'root'
})
export class ChartService {
    constructor(
        private barChartService: BarChartService,
        private chartUtils: ChartUtils,
        private datasetService: DatasetService,
        private filter: Filter,
        private lineChartService: LineChartService,
        private statsService: StatsService
    ) {}

    private generateChartDatasets = (chartType: keyof ChartTypeRegistry, scores?: LifeIndexMultipleResponses): ChartDataset[] => {
        if (scores === undefined) {
            // Default dataset
            return [this.chartUtils.generateChartDataset()];
        }

        if (chartType === 'bar') {
            return this.barChartService.generateChartDatasets(scores);
        }

        return this.lineChartService.generateChartDatasets(scores);
    };

    private generateTooltipTitle = (chartType: keyof ChartTypeRegistry, context: any): string => {
        if (chartType === 'bar') {
            const countryCode = context[0].label;
            const year = context[0].dataset.label;

            return `${COUNTRIES[countryCode]} (${year})`;
        }

        const countryCode = context[0].dataset.label;
        const year = context[0].label;

        return `${COUNTRIES[countryCode]} (${year})`;
    };

    public generateChartLabels = (chartType: keyof ChartTypeRegistry): string[] => {
        if (chartType === 'bar') {
            return this.filter.baseFilter.countries;
        }

        const {startYear, endYear} = this.filter.baseFilter;
        const periods = [];

        for (let year = startYear; year <= endYear; year++) {
            periods.push(String(year));
        }

        return periods;
    };

    public generateChartData = (chartType: keyof ChartTypeRegistry, scores?: LifeIndexMultipleResponses): ChartData => {
        return {
            labels: this.generateChartLabels(chartType),
            datasets: this.generateChartDatasets(chartType, scores)
        };
    };

    public isHorizontal = (chartType: keyof ChartTypeRegistry): boolean => {
        const chartDirection = this.filter.form.get('chartDirection')?.value;

        if (chartType === 'bar') {
            return chartDirection === CHART_DIRECTION[chartType].HORIZONTAL;
        } else if (chartType === 'line') {
            // The direction is set based on the values but not on the period
            // but the line chart is useful to make analyses based on the period
            return chartDirection !== CHART_DIRECTION[chartType].HORIZONTAL;
        }

        return false;
    };

    public generateChartOptions = (chartType: keyof ChartTypeRegistry): ChartOptions => {
        return {
            indexAxis: this.isHorizontal(chartType) ? 'y' : 'x',
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: this.statsService.generateChartTitle()
                },
                tooltip: {
                    callbacks: {
                        label: (context): string => {
                            const isIndividuallyAnalysis = this.filter.baseFilter.isIndividuallyAnalysis();
                            const units = this.datasetService.getUnits(isIndividuallyAnalysis);
                            return `${context.formattedValue} ${units}`;
                        },
                        title: (context): string => this.generateTooltipTitle(chartType, context)
                    }
                }
            }
        };
    };
}
