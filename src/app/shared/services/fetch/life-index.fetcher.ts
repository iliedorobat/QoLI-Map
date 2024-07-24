import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';

import {Filter} from '@/app/shared/filter';
import {LifeIndexMultipleResponses, LifeIndexResponse} from '@/app/views/atlas/constants/response.types';
import {MAIN_URI} from '@/app/shared/constants/endpoint';

@Injectable({
    providedIn: 'root'
})
export class LifeIndexFetcher {
    private _error$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    private _lifeIndex$: BehaviorSubject<LifeIndexMultipleResponses> = new BehaviorSubject<LifeIndexMultipleResponses>({} as LifeIndexMultipleResponses);
    private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    public reduce(data: LifeIndexMultipleResponses, year: number): LifeIndexResponse {
        const countries = Object.keys(data);

        return countries.reduce((acc, country) => {
            acc[country] = data[country][year];
            return acc;
        }, {} as LifeIndexResponse);
    }

    private fetch(filter: Filter): Observable<LifeIndexMultipleResponses> {
        const aggrs = this.extractAggregators(filter).map(aggr => `aggr=${aggr}`);
        const analysisType = `analysisType=${filter.baseFilter.analysisType}`;
        const countryCodes = filter.baseFilter.countries.map(code => `countryCode=${code}`);
        const startYear = `startYear=${filter.baseFilter.startYear}`;
        const endYear = `endYear=${filter.baseFilter.endYear}`;
        const search = [analysisType, startYear, endYear, ...aggrs, ...countryCodes].filter(item => !!item).join('&');

        const promise = fetch(`${MAIN_URI}/stats?${search}`)
            .then(response => response.json())
            .catch(error => this._error$.next(error))
            .finally(() => this._isLoading$.next(false));

        return from(promise);
    }

    private extractAggregators(filter: Filter): string[] {
        if (filter.baseFilter.isIndividuallyAnalysis()) {
            return [filter.individuallyFilter.selectedIndicator.filename];
        }

        return filter.baseFilter.qoliOptions.aggregators.reduce((acc, dimension) => {
            const arr = [...acc];

            if (dimension.checked) {
                arr.push(dimension.filename);
            } else {
                dimension.aggregators.forEach(indicator => {
                    indicator.checked && arr.push(`${dimension.filename}:${indicator.filename}`);
                });
            }

            return arr;
        }, [] as string[]);
    }

    public subscribe(filter: Filter, delay?: number): void {
        this._error$.next(null);
        this._isLoading$.next(true);

        const subscription = () => {
            this.fetch(filter)
                .subscribe((data: LifeIndexMultipleResponses) => {
                    this._lifeIndex$.next(data);
                });
        };

        delay === undefined
            ? subscription()
            : setTimeout(subscription, delay);
    }

    public unsubscribe(): void {
        this._error$.unsubscribe();
        this._lifeIndex$.unsubscribe();
        this._isLoading$.unsubscribe();
    }

    get lifeIndex$(): Observable<LifeIndexMultipleResponses> {
        return this._lifeIndex$.asObservable();
    }

    get isLoading(): boolean {
        return this._isLoading$.getValue();
    }

    get error(): string | null {
        return this._error$.getValue();
    }
}
