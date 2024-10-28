import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';

import {FetcherState} from "@/app/shared/state/fetcherState";
import {Filter, FilterService} from '@/app/shared/filter';
import {State} from "@/app/shared/state/state";
import {TimeRangeFetcher} from "@/app/shared/services/fetch/time-range.fetcher";

import {ANALYSIS_TYPE, ANALYSIS_TYPE_LABELS, EU28_MEMBER_CODES, EU28_MEMBERS} from '@/app/shared/constants/app.const';

@Component({
    selector: 'qoli-atlas-base-filter',
    templateUrl: './base-filter.component.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule
    ]
})
export class BaseFilterComponent implements OnInit {
    constructor(
        private fetcherState: FetcherState,
        protected filter: Filter,
        private filterService: FilterService,
        protected state: State,
        private timeRangeFetcher: TimeRangeFetcher
    ) {}

    protected readonly ALL_COUNTRIES_NAME = 'ALL';
    protected readonly ANALYSIS_TYPE_LABELS = ANALYSIS_TYPE_LABELS;
    protected readonly ANALYSIS_TYPES = Object.values(ANALYSIS_TYPE);
    protected timeRange = [] as number[];
    protected readonly EU28_MEMBER_CODES = EU28_MEMBER_CODES;

    ngOnInit(): void {
        setTimeout(() => {
            if (!this.state.isStatsAnalysis()) {
                const startYear: number = this.filter.form.get('startYear')?.value;
                this.filter.form.get('endYear')?.setValue(startYear);
                this.filter.baseFilter.updatePeriodControls(this.filter.form);
            }
        });

        this.fetcherState.timeRange$
            .subscribe(timeRange => {
                this.timeRange = timeRange;
            });
    }

    onAnalysisTypeChanges(event: MatSelectChange): void {
        this.timeRangeFetcher.fetch(this.filter);
        this.filterService.onUpdatePeriods(this.timeRange[0]);
        this.filter.form.get('analysisType')?.setValue(event.value);
    }

    onCountryChanges(event: MatSelectChange): void {
        this.filter.baseFilter.selectedCountries = event.value.filter((code: string) => code !== this.ALL_COUNTRIES_NAME);
        this.filter.form.get('countries')?.setValue(this.filter.baseFilter.selectedCountries);
    }

    onEndYearChanges(event: MatSelectChange): void {
        this.filterService.onUpdatePeriods(event.value);
    }

    onStartYearChanges(event: MatSelectChange): void {
        this.filterService.onUpdatePeriods(event.value);
    }

    isCountryChecked(countryCode: string): boolean {
        return this.filter.baseFilter.selectedCountries.includes(countryCode);
    }

    onAllCountriesChanges(checked: boolean): void {
        this.filter.baseFilter.selectedCountries = checked ? [...EU28_MEMBER_CODES] : [];
    }

    someCountriesChecked(): boolean {
        return this.filter.baseFilter.selectedCountries.length > 0 && this.filter.baseFilter.selectedCountries.length < EU28_MEMBER_CODES.length;
    }

    getCountryName(countryCode: string): string {
        return EU28_MEMBERS[countryCode as keyof typeof EU28_MEMBERS];
    }
}
