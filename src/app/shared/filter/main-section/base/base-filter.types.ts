import {FormControl, FormGroup} from '@angular/forms';

import {endYearValidator, startYearValidator} from '@/app/shared/filter';
import {IIndividuallyQoLI} from '@/app/views/atlas/constants/qoliBaseOptions.types';
import {IAggrQoLI} from '@/app/views/atlas/constants/qoliOptions.types';
import qoliOptions from '@/app/views/atlas/constants/qoliOptions';
import qoliBaseOptions from '@/app/views/atlas/constants/qoliBaseOptions';

import {ANALYSIS_TYPE, DEFAULT_ANALYSIS_TYPE, DEFAULT_YEAR, EU28_MEMBER_CODES} from '@/app/shared/constants/app.const';

export interface IBaseFilter {
    analysisType: ANALYSIS_TYPE;
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
    isAggregateAnalysis(): boolean;
    isIndividuallyAnalysis(): boolean;
    reset(form: FormGroup): void;
    save(form: FormGroup): void;
}

export class BaseFilter implements IBaseFilter {
    public analysisType: ANALYSIS_TYPE = DEFAULT_ANALYSIS_TYPE;
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

    isAggregateAnalysis = () => {
        return this.analysisType === ANALYSIS_TYPE.AGGREGATE;
    }

    isIndividuallyAnalysis(): boolean {
        return this.analysisType === ANALYSIS_TYPE.INDIVIDUALLY;
    }

    initForm(controls: {[key: string]: FormControl}): void {
        controls['analysisType'] = new FormControl(this.analysisType);
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
        this.analysisType = form.value['analysisType'];
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
        form.get('analysisType')?.setValue(this.analysisType);
        form.get('countries')?.setValue([...this.countries]);
        form.get('startYear')?.setValue(this.startYear);
        form.get('endYear')?.setValue(this.endYear);
    }
}
