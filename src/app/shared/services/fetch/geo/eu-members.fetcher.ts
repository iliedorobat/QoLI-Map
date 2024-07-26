import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {MAIN_URI} from '@/app/shared/constants/endpoint';

@Injectable({
    providedIn: 'root'
})
export class EuMembersFetcher {
    private _data$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([] as string[]);
    private _error$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    private fetch(): Observable<string[]> {
        const search = ['entityType=EU', 'servedType=abbr'].join('&');
        const promise = fetch(`${MAIN_URI}/geo?${search}`)
            .then(response => response.json())
            .catch(error => this._error$.next(error))
            .finally(() => this._isLoading$.next(false));

        return from(promise);
    }

    public subscribe(delay?: number): void {
        const subscription = () => {
            this.fetch()
                .subscribe((data: string[]) => {
                    this._data$.next(data);
                });
        };

        delay === undefined
            ? subscription()
            : setTimeout(subscription, delay);
    }

    public unsubscribe(): void {
        this._data$.unsubscribe();
    }

    get data$(): Observable<string[]> {
        return this._data$.asObservable();
    }

    get error$(): Observable<string | null> {
        return this._error$.asObservable();
    }

    get isLoading$(): Observable<boolean> {
        return this._isLoading$.asObservable();
    }
}
