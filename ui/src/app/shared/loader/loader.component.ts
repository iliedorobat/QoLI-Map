import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

import {State} from '@/app/shared/state/state';

@Component({
    selector: 'qoli-loader',
    standalone: true,
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    imports: [CommonModule, MatProgressSpinner]
})
export class LoaderComponent {
    constructor(
        protected state: State
    ) {}

    @Input() className: string | undefined;
}
