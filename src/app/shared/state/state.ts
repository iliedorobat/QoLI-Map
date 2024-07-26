import {Injectable} from '@angular/core';

import {BehaviorSubject, combineLatest, Observable} from 'rxjs';

import {EuMembersFetcher} from '@/app/shared/services/fetch/geo/eu-members.fetcher';
import {Filter} from '@/app/shared/filter';
import {LifeIndexFetcher} from '@/app/shared/services/fetch/life-index.fetcher';
import {LifeIndexMultipleResponses} from '@/app/views/atlas/constants/response.types';

@Injectable({
    providedIn: 'root'
})
export class State {
    private _hasError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    private _euMembers$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([] as string[]);
    private _lifeIndex$: BehaviorSubject<LifeIndexMultipleResponses> = new BehaviorSubject<LifeIndexMultipleResponses>({} as LifeIndexMultipleResponses);

    constructor(
        protected euMembersFetcher: EuMembersFetcher,
        private filter: Filter,
        protected lifeIndexFetcher: LifeIndexFetcher
    ) {
        euMembersFetcher.subscribe();
        lifeIndexFetcher.subscribe(this.filter);

        combineLatest([euMembersFetcher.error$, lifeIndexFetcher.error$])
            .subscribe((values: Array<string | null>) => {
                this._hasError$.next(values.some(item => item));
            });

        combineLatest([euMembersFetcher.isLoading$, lifeIndexFetcher.isLoading$])
            .subscribe((values: boolean[]) => {
                this._isLoading$.next(values.some(item => item));
            });

        combineLatest([euMembersFetcher.data$, lifeIndexFetcher.data$])
            .subscribe(values => {
                this._euMembers$.next(values[0]);
                this._lifeIndex$.next(values[1]);
            });
    }

    get lifeIndex$(): Observable<LifeIndexMultipleResponses> {
        return this._lifeIndex$.asObservable();
    }

    get euMembers$(): Observable<string[]> {
        return this._euMembers$.asObservable();
    }

    get isLoading(): boolean {
        return this._isLoading$.getValue();
    }

    get error(): boolean {
        return this._hasError$.getValue();
    }

    public unsubscribe(): void {
        this.euMembersFetcher.unsubscribe();
        this.lifeIndexFetcher.unsubscribe();
    }
}
