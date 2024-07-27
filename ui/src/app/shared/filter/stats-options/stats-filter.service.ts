import {Injectable} from '@angular/core';

import {Filter} from '@/app/shared/filter';
import {CHART_DIRECTION, CHART_DIRECTION_LABELS, CHART_TYPE, CHART_TYPE_LABELS} from '@/app/shared/charts/chart.const';

@Injectable({
    providedIn: 'root'
})
export class StatsFilterService {
    constructor(
        protected filter: Filter
    ) {}

    chartTypes: CHART_TYPE[] = Object.values(CHART_TYPE);
    chartTypesLabels = CHART_TYPE_LABELS;
    chartDirections = Object.values(CHART_DIRECTION[this.filter.statsFilter.selectedType]);
    chartDirectionsLabels = CHART_DIRECTION_LABELS;

    onSelectType(chartType: CHART_TYPE) {
        const prevChartType = this.filter.statsFilter.selectedType;

        this.filter.form.get('chartType')?.setValue(chartType);
        this.chartDirections = Object.values(CHART_DIRECTION[chartType]);

        if (chartType !== prevChartType) {
            const defaultDirection = chartType === CHART_TYPE.BAR
                ? CHART_DIRECTION[CHART_TYPE.BAR].VERTICAL
                : CHART_DIRECTION[CHART_TYPE.LINE].HORIZONTAL;
            this.onSelectDirection(defaultDirection);
        }
    }

    onSelectDirection(direction: string) {
        this.filter.form.get('chartDirection')?.setValue(direction);
    }
}
