import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import {IIndividuallyQoLIIndicator} from '@/app/views/atlas/constants/qoliBaseOptions.types';
import {Filter} from '@/app/shared/filter';

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
        protected filter: Filter
    ) {}

    displaySelectedIndicator() {
        const crrIndicator: IIndividuallyQoLIIndicator = this.filter.form.get('selectedIndicator')?.value;
        return crrIndicator.label;
    }
}
