import {Injectable} from '@angular/core';
import get from 'lodash-es/get';

import {Filter} from '@/app/shared/filter';
import {LifeIndexFetcher} from '@/app/shared/services/fetch/life-index.fetcher';
import {State} from "@/app/shared/state/state";
import {StatsFilterService} from './stats-options/stats-filter.service';
import {SummaryControlService} from '@/app/views/atlas/services/summary-control.service';
import {TimeRangeFetcher} from "@/app/shared/services/fetch/time-range.fetcher";

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    constructor(
        public filter: Filter,
        private lifeIndexFetcher: LifeIndexFetcher,
        private state: State,
        private statsFilterService: StatsFilterService,
        private summaryControlService: SummaryControlService,
        private timeRangeFetcher: TimeRangeFetcher
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
        const className: string = get(target, ['offsetParent', 'offsetParent', 'parentElement', 'className'], '');

        switch (true) {
            case className.includes('sidebar-main-section'):
                this.filter.aggregatedFilter.reset(this.filter.form);
                this.filter.baseFilter.reset(this.filter.form);
                this.filter.individuallyFilter.reset(this.filter.form);
                this.timeRangeFetcher.fetch(this.filter);
                break;
            default:
                break;
        }
    }

    onReset(): void {
        this.filter.reset();
        this.statsFilterService.onSelectType(this.filter.statsFilter.selectedType);
        this.timeRangeFetcher.fetch(this.filter);
    }

    onUpdatePeriods(year: number, condition: boolean = true): void {
        if (condition) {
            this.filter.form.get('startYear')?.setValue(year);
            this.filter.form.get('endYear')?.setValue(year);
        }
        this.filter.baseFilter.updatePeriodControls(this.filter.form);
    }
}
