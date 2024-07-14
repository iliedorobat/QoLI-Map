import {Injectable} from '@angular/core';

import {Filter} from '@/app/shared/filter';
import {GeoFeature} from '@/app/views/atlas/constants/geo.types';
import {LifeIndexResponse} from '@/app/views/atlas/constants/response.types';

import {SORT_ORDER} from '@/app/shared/constants/math.const';

export type DatasetEntry = Array<number | string>;

@Injectable({
    providedIn: 'root'
})
export class DatasetService {
    /** Placeholder used to mark the filtered out countries */
    public EXCLUDED_COUNTRY_SCORE = undefined;

    constructor(private filter: Filter) {}

    private sortByAsc(a: DatasetEntry, b: DatasetEntry): number {
        if (a[1] < b[1]) {
            return -1;
        } else if (a[1] > b[1]) {
            return 1;
        }
        return 0;
    }

    private sortByDesc(a: DatasetEntry, b: DatasetEntry): number {
        if (a[1] > b[1]) {
            return -1;
        } else if (a[1] < b[1]) {
            return 1;
        }
        return 0;
    }

    public getScore(geoLand: GeoFeature, response: LifeIndexResponse): number | undefined {
        const countryCode = geoLand.id;

        // Use "undefined" if the country have been filtered out
        return response[countryCode as string] ?? this.EXCLUDED_COUNTRY_SCORE;
    }

    public getScoreStr(geoLand: GeoFeature, response: LifeIndexResponse, precision?: number): string | undefined {
        const isIndividuallyAnalysis = this.filter.baseFilter.isIndividuallyAnalysis();
        const score = this.getScore(geoLand, response);
        const units: string = this.getUnits(isIndividuallyAnalysis);

        if (score === this.EXCLUDED_COUNTRY_SCORE) {
            return this.EXCLUDED_COUNTRY_SCORE;
        }

        if (isIndividuallyAnalysis) {
            return `${score.toFixed(2)} ${units}`;
        }

        if (!precision) {
            return score.toString();
        }

        return score.toFixed(precision);
    }

    public getSortedResponse(response: LifeIndexResponse, sortOrder: SORT_ORDER): Array<DatasetEntry> {
        const array = Object.keys(response)
            .map(code => [code, response[code]]);
        const sortMethod = sortOrder === SORT_ORDER.ASC
            ? this.sortByAsc
            : this.sortByDesc;

        array.sort(sortMethod)
        return array;
    }

    public getUnits(isIndividuallyAnalysis: boolean): string {
        const units = isIndividuallyAnalysis
            ? this.filter.individuallyFilter.selectedIndicator.units
            : '';

        if (units === 'number') {
            // E.g.: "Police-recorded Offences - X"
            return '';
        } else if (units.toLowerCase().startsWith('scores')) {
            // E.g. "Population Trust in X"
            return `(${units})`;
        }

        return units;
    }
}
