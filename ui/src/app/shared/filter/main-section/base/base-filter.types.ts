import {FormControl, FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';

import {endYearValidator, startYearValidator} from '@/app/shared/filter';
import {IIndividuallyQoLI} from '@/app/views/atlas/constants/qoliBaseOptions.types';
import {IAggrQoLI} from '@/app/views/atlas/constants/qoliOptions.types';
import {State} from "@/app/shared/state/state";

import qoliOptions from '@/app/views/atlas/constants/qoliOptions';
import qoliBaseOptions from '@/app/views/atlas/constants/qoliBaseOptions';

import {DEFAULT_YEAR, EU28_MEMBER_CODES} from '@/app/shared/constants/app.const';

export interface IBaseFilter {
    countries: string[];
    qoliOptions: IAggrQoLI;
    qoliIndividuallyOptions: IIndividuallyQoLI;
    selectedCountries: string[];
    startYear: number;
    endYear: number;

    areAllCountriesChecked(): boolean;
    initForm(controls: {[key: string]: FormControl}): void;
    isDisabled(form: FormGroup): boolean;
    isEmpty(form: FormGroup): boolean;
    reset(form: FormGroup): void;
    save(form: FormGroup): void;
}

@Injectable({
    providedIn: 'root',
})
export class BaseFilter implements IBaseFilter {
    constructor(
        private state: State
    ) {}

    public countries: string[] = [...EU28_MEMBER_CODES];
    public qoliOptions: IAggrQoLI = qoliOptions;
    public qoliIndividuallyOptions: IIndividuallyQoLI = qoliBaseOptions;
    public startYear: number = DEFAULT_YEAR;
    public endYear: number = DEFAULT_YEAR;

    public selectedCountries: string[] = this.initSelectedCountries();

    areAllCountriesChecked(): boolean {
        return this.selectedCountries.length === EU28_MEMBER_CODES.length;
    }

    isDisabled(form: FormGroup): boolean {
        return !this.hasAnalysisType(form) || !this.hasCountries(form);
    }

    isEmpty(form: FormGroup): boolean {
        return this.hasAnalysisType(form) && this.hasCountries(form);
    }

    initForm(controls: {[key: string]: FormControl}): void {
        controls['analysisType'] = new FormControl(this.state.analysisType);
        controls['countries'] = new FormControl(this.countries);
        controls['startYear'] = new FormControl(this.startYear);
        controls['endYear'] = new FormControl(this.endYear);

        controls['endYear'].setValidators([
            endYearValidator(controls)
        ]);
        controls['startYear'].setValidators([
            startYearValidator(controls)
        ]);
    }

    save(form: FormGroup): void {
        this.state.analysisType = form.value['analysisType'];
        this.countries = form.value['countries'];
        this.startYear = form.value['startYear'];
        this.endYear = form.value['endYear'];
    }

    reset(form: FormGroup): void {
        this.resetForm(form);
        this.selectedCountries = this.initSelectedCountries();
        this.updatePeriodControls(form);
    }

    updatePeriodControls(form: FormGroup): void {
        form.get('startYear')?.updateValueAndValidity();
        form.get('endYear')?.updateValueAndValidity();
    }

    private hasAnalysisType(form: FormGroup): boolean {
        return !!form.get('analysisType')?.value;
    }

    private hasCountries(form: FormGroup): boolean {
        return form.get('countries')?.value.length > 0;
    }

    private initSelectedCountries(): string[] {
        return [...this.countries];
    }

    private resetForm(form: FormGroup): void {
        form.get('analysisType')?.setValue(this.state.analysisType);
        form.get('countries')?.setValue([...this.countries]);
        form.get('startYear')?.setValue(this.startYear);
        form.get('endYear')?.setValue(this.endYear);
    }
}
