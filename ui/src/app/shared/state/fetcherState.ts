import {Injectable} from '@angular/core';

import {BehaviorSubject, combineLatest, Observable} from 'rxjs';

import {Filter} from '@/app/shared/filter';
import {LifeIndexFetcher} from '@/app/shared/services/fetch/life-index.fetcher';
import {LifeIndexMultipleResponses} from '@/app/views/atlas/constants/response.types';
import {TimeRangeFetcher} from "@/app/shared/services/fetch/time-range.fetcher";

@Injectable({
    providedIn: 'root'
})
export class FetcherState {
    private _hasError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    private _lifeIndex$: BehaviorSubject<LifeIndexMultipleResponses> = new BehaviorSubject<LifeIndexMultipleResponses>({} as LifeIndexMultipleResponses);
    private _timeRange$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

    constructor(
        private filter: Filter,
        protected lifeIndexFetcher: LifeIndexFetcher,
        private timeRangeFetcher: TimeRangeFetcher
    ) {
        lifeIndexFetcher.subscribe(this.filter);
        timeRangeFetcher.subscribe(this.filter);

        combineLatest([lifeIndexFetcher.error$, timeRangeFetcher.error$])
            .subscribe((values: Array<string | null>) => {
                this._hasError$.next(values.some(item => item));
            });

        combineLatest([lifeIndexFetcher.isLoading$, timeRangeFetcher.isLoading$])
            .subscribe((values: boolean[]) => {
                this._isLoading$.next(values.some(item => item));
            });

        combineLatest([lifeIndexFetcher.data$, timeRangeFetcher.data$])
            .subscribe(values => {
                this._lifeIndex$.next(values[0]);
                this._timeRange$.next(values[1]);
            });
    }

    get lifeIndex$(): Observable<LifeIndexMultipleResponses> {
        return this._lifeIndex$.asObservable();
    }

    get timeRange$(): Observable<number[]> {
        return this._timeRange$.asObservable();
    }

    get isLoading(): boolean {
        return this._isLoading$.getValue();
    }

    get error(): boolean {
        return this._hasError$.getValue();
    }

    public unsubscribe(): void {
        this.lifeIndexFetcher.unsubscribe();
        this.timeRangeFetcher.unsubscribe();
    }
}
