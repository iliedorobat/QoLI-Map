import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbAccordion, NgbPanel, NgbPanelContent, NgbPanelTitle} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import noop from 'lodash-es/noop';

import {AggregatedFilterComponent} from '@/app/shared/filter/main-section/aggregated/aggregated-filter.component';
import {BaseFilterComponent} from '@/app/shared/filter/main-section/base/base-filter.component';
import {Filter} from '@/app/shared/filter/filter.types';
import {FilterService} from '@/app/shared/filter/filter.service';
import {IndividuallyFilterComponent} from '@/app/shared/filter/main-section/individually/individually-filter.component';

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
        NgbAccordion,
        NgbPanel,
        NgbPanelContent,
        NgbPanelTitle,
        ReactiveFormsModule
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
