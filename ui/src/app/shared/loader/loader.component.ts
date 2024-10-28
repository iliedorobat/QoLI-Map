import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

import {FetcherState} from '@/app/shared/state/fetcherState';

@Component({
    selector: 'qoli-loader',
    standalone: true,
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    imports: [CommonModule, MatProgressSpinner]
})
export class LoaderComponent {
    constructor(
        protected fetcherState: FetcherState
    ) {}

    @Input() className: string | undefined;
}
