import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {IAggrQoLI} from '@/app/views/atlas/constants/qoliOptions.types';

import {ANALYSIS_TYPE} from '@/app/shared/constants/app.const';
import {MAIN_URI} from '@/app/shared/constants/endpoint';

@Injectable({
    providedIn: 'root'
})
export class DatasetConfigFetcher {
    private _datasetConfig$: BehaviorSubject<IAggrQoLI> = new BehaviorSubject<IAggrQoLI>({} as IAggrQoLI);

    private fetch(): Observable<IAggrQoLI> {
        const promise = fetch(`${MAIN_URI}/stats/config?analysisType=${ANALYSIS_TYPE.AGGREGATE}`)
            .then(result => result.json());

        return from(promise);
    }

    public subscribe(): void {
        this.fetch()
            .subscribe((config: IAggrQoLI) => {
                this._datasetConfig$.next(config);
            });
    }

    public unsubscribe(): void {
        this._datasetConfig$.unsubscribe();
    }

    get datasetConfig$(): Observable<IAggrQoLI> {
        return this._datasetConfig$.asObservable();
    }
}
