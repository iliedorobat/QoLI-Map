import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import {Filter} from '@/app/shared/filter';
import {CHART_DIRECTION, CHART_DIRECTION_LABELS} from '@/app/shared/constants/app.const';

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

    protected readonly CHART_DIRECTION = Object.values(CHART_DIRECTION);
    protected readonly CHART_DIRECTION_LABELS = CHART_DIRECTION_LABELS;
}
