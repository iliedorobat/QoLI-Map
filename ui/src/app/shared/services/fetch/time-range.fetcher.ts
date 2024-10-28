import {BehaviorSubject, from, Observable} from "rxjs";
import {Injectable} from "@angular/core";

import {Filter} from "@/app/shared/filter";
import {IIndividuallyQoLIIndicator} from "@/app/views/atlas/constants/qoliBaseOptions.types";

import {ANALYSIS_TYPE, AVAILABLE_INTERVAL} from "@/app/shared/constants/app.const";

@Injectable({
    providedIn: 'root'
})
export class TimeRangeFetcher {
    private _data$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
    private _error$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    public fetch(filter: Filter): Observable<any> {
        const analysisType: ANALYSIS_TYPE = filter.form.get('analysisType')?.value;
        const selectedIndicator: IIndividuallyQoLIIndicator = filter.form.get('selectedIndicator')?.value;

        const timeRange = analysisType === ANALYSIS_TYPE.INDIVIDUALLY
            ? selectedIndicator?.timeRange || []
            : AVAILABLE_INTERVAL;

        this._data$.next(timeRange);
        this._isLoading$.next(false);

        return from([timeRange]);
    }

    public subscribe(filter: Filter, delay?: number): void {
        this._error$.next(null);
        this._isLoading$.next(true);

        const subscription = () => {
            this.fetch(filter)
                .subscribe((data: number[]) => {
                    this._data$.next(data);
                });
        };

        delay === undefined
            ? subscription()
            : setTimeout(subscription, delay);
    }

    public unsubscribe(): void {
        this._error$.unsubscribe();
        this._data$.unsubscribe();
        this._isLoading$.unsubscribe();
    }

    get data$(): Observable<number[]> {
        return this._data$.asObservable();
    }

    get error$(): Observable<string | null> {
        return this._error$.asObservable();
    }

    get isLoading$(): Observable<boolean> {
        return this._isLoading$.asObservable();
    }
}
