import {FormControl, FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';

import {
    AggregatedFilter,
    BaseFilter,
    IAggregatedFilter,
    IIndividuallyFilter,
    IStatsFilter,
    IndividuallyFilter,
    StatsFilter
} from '@/app/shared/filter/index';

export interface IFilter {
    aggregatedFilter: IAggregatedFilter;
    individuallyFilter: IIndividuallyFilter;
    form: FormGroup;
    statsFilter: IStatsFilter;

    isDisabled(): boolean;
    isEmpty(): boolean;
    reset(): void;
    save(): void;
}

@Injectable({
    providedIn: 'root',
})
export class Filter implements IFilter {
    public form: FormGroup = this.initForm();

    constructor(
        public aggregatedFilter: AggregatedFilter,
        public baseFilter: BaseFilter,
        public individuallyFilter: IndividuallyFilter,
        public statsFilter: StatsFilter
    ) {}

    isDisabled(): boolean {
        return this.form.invalid
            || this.aggregatedFilter.isDisabled(this.form)
            || this.baseFilter.isDisabled(this.form)
            || this.individuallyFilter.isDisabled(this.form)
            || this.statsFilter.isDisabled(this.form);
    }

    isEmpty(): boolean {
        return this.aggregatedFilter.isEmpty(this.form)
            && this.baseFilter.isEmpty(this.form)
            && this.individuallyFilter.isEmpty(this.form)
            && this.statsFilter.isEmpty(this.form);
    }

    reset(): void {
        this.aggregatedFilter.reset(this.form);
        this.baseFilter.reset(this.form);
        this.individuallyFilter.reset(this.form);
        this.statsFilter.reset(this.form);
    }

    save(): void {
        this.aggregatedFilter.save(this.form);
        this.baseFilter.save(this.form);
        this.individuallyFilter.save(this.form);
        this.statsFilter.save(this.form);
    }

    private initForm(): FormGroup {
        const controls: {[key: string]: FormControl} = {};

        this.aggregatedFilter.initForm(controls);
        this.baseFilter.initForm(controls);
        this.individuallyFilter.initForm(controls);
        this.statsFilter.initForm(controls);

        return new FormGroup(controls);
    }
}
