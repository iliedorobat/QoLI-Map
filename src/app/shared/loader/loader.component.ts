import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

import {LifeIndexFetcher} from '@/app/shared/services/fetch/life-index.fetcher';

@Component({
    selector: 'qoli-loader',
    standalone: true,
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    imports: [CommonModule, MatProgressSpinner]
})
export class LoaderComponent {
    constructor(
        protected lifeIndexFetcher: LifeIndexFetcher
    ) {}

    @Input() className: string | undefined;
}
