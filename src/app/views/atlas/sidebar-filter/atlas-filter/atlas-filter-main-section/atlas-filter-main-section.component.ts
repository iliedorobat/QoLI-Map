import {Component, Input, OnInit} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';

import {AtlasFilterService, EU28_MEMBER_CODES, EU28_MEMBERS} from '../atlas-filter.service';
import {IAtlasFilter} from '@/app/views/atlas/sidebar-filter/atlas-filter/atlas-filter.types';
import {IQoLIOptionsIndicator} from '@/app/views/atlas/constants/qoliOptions.types';

import {AVAILABLE_INTERVAL} from '@/app/shared/constants/app.const';

@Component({
    selector: 'app-atlas-filter-main-section',
    templateUrl: './atlas-filter-main-section.component.html',
    styleUrls: ['./app-atlas-filter-main-section.scss'],
    standalone: true,
    imports: [BrowserAnimationsModule, FormsModule, MatCheckboxModule, MatInputModule, MatSelectModule, ReactiveFormsModule]
})
export class AtlasFilterMainSectionComponent implements OnInit {
    constructor(
        private atlasFilterService: AtlasFilterService
    ) {}

    protected readonly AVAILABLE_INTERVAL = AVAILABLE_INTERVAL;
    protected readonly EU28_MEMBER_CODES = EU28_MEMBER_CODES;

    protected allCountries = true;
    protected allCountriesName = 'ALL';
    protected filter: IAtlasFilter = this.atlasFilterService.getFilter();
    protected form = this.atlasFilterService.getForm();
    protected selectedCountries: string[] = [];
    protected selectedIndicators: string[] = [];

    ngOnInit(): void {
        this.resetSelectedItems();
    }

    // Get the list of dimension keys
    private getDimensionKeys(): string[] {
        return this.filter.baseFilter.qoliOptions.aggregators.map(aggr => aggr.filename);
    }

    // Get the list of indicator keys which belongs to a specific dimension
    private getIndicatorKeys(dimKey: string | null | undefined, filterPredicate = (item: IQoLIOptionsIndicator) => true): string[] {
        if (!dimKey) {
            return [];
        }

        return this.filter.baseFilter.qoliOptions.aggregators
            .find(aggr => aggr.filename === dimKey)?.aggregators
            .filter(filterPredicate)
            .map(aggr => `${dimKey}:${aggr.filename}`) || [];
    }

    // Return "false" if one of the dimension indicators is false
    private isDimensionChecked(dimKey: string): boolean {
        const indKeys = this.getIndicatorKeys(dimKey);

        for (const indKey of indKeys) {
            if (!this.form.get(indKey)?.value) {
                return false;
            }
        }

        return true
    }

    private resetSelectedCountries(): void {
        this.selectedCountries = [...this.filter.baseFilter.countries];
    }

    private resetSelectedIndicators(): void {
        const dimKeys = this.getDimensionKeys();

        this.selectedIndicators = dimKeys.reduce((acc, dimKey) => {
            const indKeys = this.getIndicatorKeys(dimKey, (item: IQoLIOptionsIndicator) => item.checked);
            return [...acc, ...indKeys];
        }, [] as string[]);
    }

    onCountryChanges(event: MatSelectChange): void {
        this.selectedCountries = event.value.filter((code: string) => code !== this.allCountriesName);
        this.allCountries = this.selectedCountries.length === EU28_MEMBER_CODES.length;
        this.form.get('countries')?.setValue(this.selectedCountries);
    }

    isCountryChecked(countryCode: string): boolean {
        return this.selectedCountries.includes(countryCode);
    }

    onAllCountriesChanges(checked: boolean): void {
        this.selectedCountries = checked ? [...EU28_MEMBER_CODES] : [];
    }

    onAllDimensionsChanges(qoliKey: string | null, checked: boolean): void {
        const dimKeys = this.getDimensionKeys();

        for (const dimKey of dimKeys) {
            this.form.get(dimKey)?.setValue(checked);
            this.onDimensionChanges(dimKey, checked);
        }
    }

    onDimensionChanges(dimKey: string | null, checked: boolean): void {
        const indKeys = this.getIndicatorKeys(dimKey);

        for (const indKey of indKeys) {
            this.form.get(indKey)?.setValue(checked);
        }
    };

    onIndicatorChanges(event: MatCheckboxChange): void {
        const [dimKey, indKey] = (event.source.name || '')?.split(':');

        const isDimensionChecked = this.isDimensionChecked(dimKey);
        this.form.get(dimKey)?.setValue(isDimensionChecked);
    }

    onFeatureChanges(): void {
        const selectedIndicators = [];
        const dimKeys = this.getDimensionKeys();

        for (const dimKey of dimKeys) {
            const indKeys = this.getIndicatorKeys(dimKey);

            for (const indKey of indKeys) {
                const isSelected = this.form.get(indKey)?.value;
                isSelected && selectedIndicators.push(indKey);
            }
        }

        this.selectedIndicators = selectedIndicators;
    }

    someCountriesChecked(): boolean {
        return this.selectedCountries.length > 0 && this.selectedCountries.length < EU28_MEMBER_CODES.length;
    }

    someDimensionsChecked(): boolean {
        const dimKeys = this.getDimensionKeys();

        const checked = dimKeys.every(dimKey => {
            const indKeys = this.getIndicatorKeys(dimKey);
            return indKeys.every(key => this.form.get(key)?.value);
        });
        const unchecked = dimKeys.every(dimKey => {
            const indKeys = this.getIndicatorKeys(dimKey);
            return indKeys.every(key => !this.form.get(key)?.value);
        });

        if (checked || unchecked) {
            return false;
        }

        return dimKeys.some(key => !this.form.get(key)?.value);
    }

    someIndicatorsChecked(dimKey: string): boolean {
        const indKeys = this.getIndicatorKeys(dimKey);
        const checked = indKeys.every(key => this.form.get(key)?.value);
        const unchecked = indKeys.every(key => !this.form.get(key)?.value);

        if (checked || unchecked) {
            return false;
        }

        return indKeys.some(key => !this.form.get(key)?.value);
    }

    getCountryName(countryCode: any): string {
        return EU28_MEMBERS[countryCode as keyof typeof EU28_MEMBERS];
    }

    resetSelectedItems(): void {
        this.resetSelectedCountries();
        this.resetSelectedIndicators();
    }
}
