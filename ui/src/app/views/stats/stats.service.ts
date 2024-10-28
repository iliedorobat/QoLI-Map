import {Injectable} from '@angular/core';

import {Filter} from '@/app/shared/filter';
import {State} from "@/app/shared/state/state";

@Injectable({
    providedIn: 'root'
})
export class StatsService {
    constructor(
        private filter: Filter,
        private state: State
    ) {}

    public generateChartTitle = (): string => {
        const {startYear, endYear} = this.filter.baseFilter;
        const label =  this.state.isAggregatedAnalysis()
            ? 'QoLI Stats'
            : this.filter.individuallyFilter.selectedIndicator.label;

        return startYear === endYear
            ? `${label} For The Year ${this.filter.baseFilter.startYear}`
            : `${label} For The Period ${startYear} - ${endYear}`;
    };
}
