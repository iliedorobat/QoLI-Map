import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';

import {IIndividuallyQoLIIndicator} from '@/app/views/atlas/constants/qoliBaseOptions.types';
import {Filter, FilterService} from '@/app/shared/filter';
import {TimeRangeFetcher} from "@/app/shared/services/fetch/time-range.fetcher";

@Component({
    selector: 'qoli-atlas-individually-filter',
    templateUrl: './individually-filter.component.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule
    ]
})
export class IndividuallyFilterComponent {
    constructor(
        protected filter: Filter,
        private filterService: FilterService,
        private timeRangeFetcher: TimeRangeFetcher
    ) {}

    displaySelectedIndicator() {
        const crrIndicator: IIndividuallyQoLIIndicator = this.filter.form.get('selectedIndicator')?.value;
        return crrIndicator.label;
    }

    onIndicatorChanges(event: MatSelectChange): void {
        const selectedIndicator = this.filter.form.get('selectedIndicator')?.value;

        this.timeRangeFetcher.fetch(this.filter);
        this.filterService.onUpdatePeriods(selectedIndicator.timeRange[0]);
    }
}
