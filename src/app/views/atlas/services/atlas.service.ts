import {Injectable} from '@angular/core';
import {Control, DomUtil, geoJSON, Map} from 'leaflet';

import {DatasetService} from '@/app/views/atlas/services/dataset.service';
import {GeoFeature} from '@/app/views/atlas/constants/geo.types';
import {Filter} from '@/app/shared/filter';
import {IAtlasLayer} from '@/app/views/atlas/atlas.types';
import {LayerEventsService} from '@/app/views/atlas/services/layer-events.service';
import {LifeIndexResponse} from '@/app/views/atlas/constants/response.types';

import * as COUNTRIES_NON_EU from '@/../files/geo-location/europe-non-eu.json';
import * as COUNTRIES_EU from '@/../files/geo-location/europe-eu.json';
import {NON_EU28_MEMBER_CODES} from '@/app/shared/constants/app.const';
import {SORT_ORDER} from '@/app/shared/constants/math.const';

const FEATURES_NON_EU = (COUNTRIES_NON_EU?.features || []) as Array<GeoFeature>;
const FEATURES_EU = (COUNTRIES_EU?.features || []) as Array<GeoFeature>;
const FEATURES = [...FEATURES_NON_EU, ...FEATURES_EU] as Array<GeoFeature>;

@Injectable({
    providedIn: 'root'
})
export class AtlasService {
    constructor(
        private datasetService: DatasetService,
        private eventsService: LayerEventsService,
        private filter: Filter
    ) {}

    public GRADES = [4, 8, 12, 16, 19, 22, 25, 100];

    public onFilterControlAdd(map: Map): void {
        const CustomControl = Control.extend({
            onAdd(map: Map) {
                return DomUtil.get('filter-controller');
            },
            onRemove(map: Map) {}
        });
        const filterControl = new CustomControl({
            position: 'topleft'
        });
        map.addControl(filterControl);
    }

    public onLegendAdd(map: Map): void {
        const CustomLegend = Control.extend({
            onAdd(map: Map) {
                console.log('legend added');
                return DomUtil.get('legend');
            },
            onRemove(map: Map) {
                console.log('legend removed');
            }
        });
        const legend = new CustomLegend({
            position: 'bottomleft'
        });
        map.addControl(legend);
    }

    public onToggleTooltip(layers: Array<IAtlasLayer>, response: LifeIndexResponse, showScore: boolean): void {
        this.eventsService.onToggleTooltip(layers, response, showScore);
    }

    public prepareLayers(map: Map, baseLayers: Array<IAtlasLayer>, response: LifeIndexResponse): Array<IAtlasLayer> {
        const countriesLayers = FEATURES.map(country => this.getFeatureLayer(map, country, response));

        return [...baseLayers, ...countriesLayers];
    }

    private getFeatureLayer(map: Map, geoLand: GeoFeature, response: LifeIndexResponse): IAtlasLayer {
        const countryCode = geoLand.id as string;
        const score = this.datasetService.getScore(geoLand, response);
        const geoJsonObject = geoLand.geometry;
        const options = {
            style: () => ({
                color: this.getLayerColor(response, score, countryCode),
                fillColor: this.getLayerColor(response, score, countryCode),
                fillOpacity: 0.6,
                opacity: 0.8,
                weight: 3
            })
        };

        const layer = geoJSON(geoJsonObject, options);
        this.eventsService.addEvents(map, layer, geoLand, response);

        return {
            geoLand,
            value: layer
        } as IAtlasLayer;
    }

    private getLayerColor(response: LifeIndexResponse, score: number, countryCode: string): string {
        const isNegativeState = this.filter.baseFilter.isIndividuallyAnalysis()
            && this.filter.individuallyFilter.isNegativeState()
        const sortedResponse = isNegativeState
            ? this.datasetService.getSortedResponse(response, SORT_ORDER.ASC)
            : this.datasetService.getSortedResponse(response, SORT_ORDER.DESC);
        const rank = sortedResponse.findIndex(item => item[0] === countryCode) + 1;
        const isExcluded = score === this.datasetService.EXCLUDED_COUNTRY_SCORE;

        return this.getColor(rank, isExcluded);
    }

    public getColor(rank: number, isExcluded?: boolean): string {
        switch (true) {
            case isExcluded: return '#838996';
            case rank <= 4: return '#001146';
            case rank <= 8: return '#0011aa';
            case rank <= 12: return '#3753f2';
            case rank <= 16: return '#809fff';
            case rank <= 19: return '#fca9a9';
            case rank <= 22: return '#fc7272';
            case rank <= 25: return '#fc4949';
            default: return '#e60000';
        }
    }

    private async getNonEuFeatures() {
        const worldFeatures = await import('@/../files/geo-location/world.json');

        return worldFeatures?.features?.filter(feature => NON_EU28_MEMBER_CODES.includes(feature.id)) || [];
    }
}

export const MARKERS_STATUS = {
    DISPLAY_ALL: 'all',
    DISPLAY_NONE: 'none',
    DISPLAY_FILTERED: 'filtered'
};
