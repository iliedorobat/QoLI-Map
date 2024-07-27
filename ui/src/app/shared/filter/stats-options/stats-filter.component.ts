import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import {Filter} from '@/app/shared/filter';
import {StatsFilterService} from './stats-filter.service';

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
        protected filter: Filter,
        protected statsFilterService: StatsFilterService
    ) {}
}
