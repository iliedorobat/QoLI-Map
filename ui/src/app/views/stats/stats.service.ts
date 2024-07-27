import {Injectable} from '@angular/core';

import {Filter} from '@/app/shared/filter';

@Injectable({
    providedIn: 'root'
})
export class StatsService {
    constructor(
        private filter: Filter
    ) {}

    public generateChartTitle = (): string => {
        const {startYear, endYear} = this.filter.baseFilter;
        const label =  this.filter.baseFilter.isAggregateAnalysis()
            ? 'QoLI Stats'
            : this.filter.individuallyFilter.selectedIndicator.label;

        return startYear === endYear
            ? `${label} For The Year ${this.filter.baseFilter.startYear}`
            : `${label} For The Period ${startYear} - ${endYear}`;
    };
}
