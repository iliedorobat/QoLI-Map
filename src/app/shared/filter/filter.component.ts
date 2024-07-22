import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {ReactiveFormsModule} from '@angular/forms';

import noop from 'lodash-es/noop';

import {
    AggregatedFilterComponent,
    BaseFilterComponent,
    IndividuallyFilterComponent
} from '@/app/shared/filter/main-section';
import {Filter} from './filter.types';
import {FilterService} from './filter.service';
import {StatsFilterComponent} from './stats-options/stats-filter.component';

import {ANALYSIS_TYPE} from '@/app/shared/constants/app.const';

@Component({
    selector: 'qoli-filter',
    standalone: true,
    styleUrls: ['./filter.component.scss'],
    templateUrl: './filter.component.html',
    imports: [
        AggregatedFilterComponent,
        BaseFilterComponent,
        CommonModule,
        IndividuallyFilterComponent,
        MatExpansionModule,
        ReactiveFormsModule,
        StatsFilterComponent
    ],
    providers: [FilterService]
})
export class FilterComponent {
    constructor(
        protected filter: Filter,
        protected filterService: FilterService
    ) {
        this.filterService.onReset();
    }

    protected readonly ANALYSIS_TYPE = ANALYSIS_TYPE;

    @Input() isAoristicAnalysis: boolean = false;
    @Input() onToggleScore: Function = noop;
}
