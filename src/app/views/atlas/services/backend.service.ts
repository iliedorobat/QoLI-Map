import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {LifeIndexMultipleResponses, LifeIndexResponse} from '@/app/views/atlas/constants/response.types';
import {IAtlasFilter} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter.types';

const MAIN_URL = 'http://localhost:3070';

@Injectable({
    providedIn: 'root'
})
// TODO: use backend APIs to get data
export class BackendService {
    private _datasetConfig$: BehaviorSubject<any> = new BehaviorSubject<any>({} as any);
    private _lifeIndex$: BehaviorSubject<LifeIndexResponse> = new BehaviorSubject<LifeIndexResponse>({} as LifeIndexResponse);

    private prepareLifeIndexResponse(filter: IAtlasFilter, data: LifeIndexMultipleResponses): LifeIndexResponse {
        const countries = Object.keys(data);
        const year = filter.baseFilter.year;

        return countries.reduce((acc, country) => {
            acc[country] = data[country][year];
            return acc;
        }, {} as LifeIndexResponse);
    }

    private getDatasetConfig(): Observable<LifeIndexResponse> {
        const promise = fetch(`${MAIN_URL}/stats/dataset/config`)
            .then(result => result.json());

        return from(promise);
    }

    private getLifeIndex(filter: IAtlasFilter): Observable<LifeIndexResponse> {
        // TODO: revisit: build the "aggr" based on the applied filter
        const aggrs = 'aggr=education&aggr=environment&aggr=governance&aggr=health&aggr=interactions&aggr=leisure&aggr=mainActivity&aggr=livingConditions&aggr=overallExperience&aggr=safety';

        const promise = fetch(`${MAIN_URL}/stats?${aggrs}&countryCode=AT&year=${filter.baseFilter.year}`)
            .then(response => response.json())
            .then((data: any) => this.prepareLifeIndexResponse(filter, data.scores));

        return from(promise);
    }

    public datasetConfigSubscription(): void {
        this.getDatasetConfig()
            .subscribe((config: any) => {
                this._datasetConfig$.next(config);
            });
    }

    public lifeIndexSubscription(filter: IAtlasFilter): void {
        this.getLifeIndex(filter)
            .subscribe((data: LifeIndexResponse) => {
                this._lifeIndex$.next(data);
            })
    }

    get datasetConfig$(): Observable<any> {
        return this._datasetConfig$.asObservable();
    }

    get lifeIndex$(): Observable<LifeIndexResponse> {
        return this._lifeIndex$.asObservable();
    }
}
