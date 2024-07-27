import {Injectable} from '@angular/core';

import {BehaviorSubject, combineLatest, Observable} from 'rxjs';

import {Filter} from '@/app/shared/filter';
import {LifeIndexFetcher} from '@/app/shared/services/fetch/life-index.fetcher';
import {LifeIndexMultipleResponses} from '@/app/views/atlas/constants/response.types';

@Injectable({
    providedIn: 'root'
})
export class State {
    private _hasError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    private _lifeIndex$: BehaviorSubject<LifeIndexMultipleResponses> = new BehaviorSubject<LifeIndexMultipleResponses>({} as LifeIndexMultipleResponses);

    constructor(
        private filter: Filter,
        protected lifeIndexFetcher: LifeIndexFetcher
    ) {
        lifeIndexFetcher.subscribe(this.filter);

        combineLatest([lifeIndexFetcher.error$])
            .subscribe((values: Array<string | null>) => {
                this._hasError$.next(values.some(item => item));
            });

        combineLatest([lifeIndexFetcher.isLoading$])
            .subscribe((values: boolean[]) => {
                this._isLoading$.next(values.some(item => item));
            });

        combineLatest([lifeIndexFetcher.data$])
            .subscribe(values => {
                this._lifeIndex$.next(values[0]);
            });
    }

    get lifeIndex$(): Observable<LifeIndexMultipleResponses> {
        return this._lifeIndex$.asObservable();
    }

    get isLoading(): boolean {
        return this._isLoading$.getValue();
    }

    get error(): boolean {
        return this._hasError$.getValue();
    }

    public unsubscribe(): void {
        this.lifeIndexFetcher.unsubscribe();
    }
}
