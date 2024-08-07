import {FormControl, FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';

import {CHART_DIRECTION, CHART_TYPE} from '@/app/shared/charts/chart.const';

export interface IStatsFilter {
    selectedDirection: string;
    selectedType: CHART_TYPE;

    initForm(controls: {[key: string]: FormControl}): void;
    isDisabled(form: FormGroup): boolean;
    isEmpty(form: FormGroup): boolean;
    reset(form: FormGroup): void;
    save(form: FormGroup): void;
}

@Injectable({
    providedIn: 'root',
})
export class StatsFilter implements IStatsFilter {
    selectedType: CHART_TYPE = CHART_TYPE.BAR;
    selectedDirection: string = this.selectedType === CHART_TYPE.BAR
        ? CHART_DIRECTION[this.selectedType].VERTICAL
        : CHART_DIRECTION[this.selectedType].HORIZONTAL;

    initForm(controls: { [p: string]: FormControl }): void {
        controls['chartDirection'] = new FormControl(this.selectedDirection);
        controls['chartType'] = new FormControl(this.selectedType);
    }

    isDisabled(form: FormGroup): boolean {
        return false;
    }

    isEmpty(form: FormGroup): boolean {
        return false;
    }

    reset(form: FormGroup): void {
        this.resetForm(form);
    }

    save(form: FormGroup): void {
        this.selectedDirection = form.value['chartDirection'];
        this.selectedType = form.value['chartType'];
    }

    private resetForm(form: FormGroup): void {
        form.get('chartDirection')?.setValue(this.selectedDirection);
        form.get('chartType')?.setValue(this.selectedType);
    }
}
