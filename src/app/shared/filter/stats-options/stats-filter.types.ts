import {FormControl, FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';

import {CHART_DIRECTION} from '@/app/shared/constants/app.const';

export interface IStatsFilter {
    selectedDirection: CHART_DIRECTION;
    unsavedDirection: CHART_DIRECTION;

    initForm(controls: {[key: string]: FormControl}): void;
    isDisabled(form: FormGroup): boolean;
    isEmpty(form: FormGroup): boolean;
    reset(form: FormGroup): void;
    save(form: FormGroup): void;
}

@Injectable({
    providedIn: 'root',
})
export class StatsFilter implements IStatsFilter{
    selectedDirection: CHART_DIRECTION = CHART_DIRECTION.VERTICAL;
    unsavedDirection: CHART_DIRECTION = CHART_DIRECTION.VERTICAL;

    initForm(controls: { [p: string]: FormControl }): void {
        controls['chartDirection'] = new FormControl(this.selectedDirection);
    }

    isDisabled(form: FormGroup): boolean {
        return false;
    }

    isEmpty(form: FormGroup): boolean {
        return false;
    }

    reset(form: FormGroup): void {
        this.resetForm(form);
        this.unsavedDirection = this.selectedDirection;
    }

    save(form: FormGroup): void {
        this.selectedDirection = form.value['chartDirection'];
        this.unsavedDirection = form.value['chartDirection'];
    }

    private resetForm(form: FormGroup): void {
        form.controls['chartDirection'].setValue(this.selectedDirection);
    }
}
