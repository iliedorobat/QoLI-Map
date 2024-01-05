import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {AtlasFilter, AtlasFilterConstructor} from './atlas-filter.types';

import {LIFE_INDEX_CATEGORIES} from '@/app/shared/constants/app.const';

@Injectable({
    providedIn: 'root',
})
export class AtlasFilterService {
    // TODO: use an env constant instead of year 2021 / 2022
    private filter: AtlasFilter = new AtlasFilterConstructor(LIFE_INDEX_CATEGORIES.QOLI, 2021);

    public getFilter(): AtlasFilter {
        return this.filter;
    }

    public setFilter(filter: AtlasFilter): void {
        this.filter = filter;
    }

    public getInitFilterForm(filter: AtlasFilter): FormGroup {
        return new FormGroup({
            category: new FormControl(filter.category, []),
            categoryLabel: new FormControl(filter.categoryLabel, []),
            year: new FormControl(filter.year, [])
        });
    }
}
