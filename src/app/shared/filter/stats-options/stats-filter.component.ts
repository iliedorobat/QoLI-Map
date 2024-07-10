import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import {Filter} from '@/app/shared/filter';
import {CHART_DIRECTION, CHART_DIRECTION_LABELS, CHART_TYPE, CHART_TYPE_LABELS} from '@/app/shared/charts/chart.const';

@Component({
    selector: 'qoli-stats-filter',
    templateUrl: './stats-filter.component.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule
    ]
})
export class StatsFilterComponent {
    constructor(
        protected filter: Filter
    ) {}

    protected readonly CHART_TYPE = Object.values(CHART_TYPE);
    protected readonly CHART_TYPE_LABELS = CHART_TYPE_LABELS;
    protected CHART_DIRECTION = Object.values(CHART_DIRECTION[this.filter.statsFilter.selectedType]);
    protected CHART_DIRECTION_LABELS = CHART_DIRECTION_LABELS;

    onSelectType(chartType: string) {
        const defaultDirection = chartType === CHART_TYPE.BAR
            ? CHART_DIRECTION[CHART_TYPE.BAR].VERTICAL
            : CHART_DIRECTION[CHART_TYPE.LINE].HORIZONTAL;

        this.filter.statsFilter.unsavedType = chartType as CHART_TYPE;
        this.CHART_DIRECTION = Object.values(CHART_DIRECTION[chartType as CHART_TYPE]);
        this.filter.form.get('chartDirection')?.setValue(defaultDirection);
    }

    onSelectDirection(direction: string) {
        this.filter.statsFilter.unsavedDirection = direction;
    }
}
