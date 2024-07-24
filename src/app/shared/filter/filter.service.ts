import {Injectable} from '@angular/core';
import get from 'lodash-es/get';

import {Filter} from '@/app/shared/filter';
import {LifeIndexFetcher} from '@/app/shared/services/fetch/life-index.fetcher';
import {StatsFilterService} from './stats-options/stats-filter.service';
import {SummaryControlService} from '@/app/views/atlas/services/summary-control.service';

// Suffix added by ngbAccordionItem
const SECTION_SUFFIX = '-collapse';

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    constructor(
        private filter: Filter,
        private lifeIndexFetcher: LifeIndexFetcher,
        private statsFilterService: StatsFilterService,
        private summaryControlService: SummaryControlService
    ) {}

    onChartOptionsReset(event: Event): void {
        event.stopPropagation();
        this.filter.statsFilter.reset(this.filter.form);
        this.statsFilterService.onSelectType(this.filter.statsFilter.selectedType);
    }

    onFilterApply(onToggleScore?: Function): void {
        this.filter.save();
        this.lifeIndexFetcher.subscribe(this.filter);
        this.summaryControlService.updateContent('land-summary');
        onToggleScore && onToggleScore(true);
    }

    onSectionReset(event: Event): void {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        const value = get(target, ['offsetParent', 'attributes', 'aria-controls', 'value']);

        switch (value) {
            case 'sidebar-main-section' + SECTION_SUFFIX:
                this.filter.aggregatedFilter.reset(this.filter.form);
                this.filter.baseFilter.reset(this.filter.form);
                this.filter.individuallyFilter.reset(this.filter.form);
                break;
            default:
                break;
        }
    }

    public onReset(): void {
        this.filter.reset();
        this.statsFilterService.onSelectType(this.filter.statsFilter.selectedType);
    }
}
