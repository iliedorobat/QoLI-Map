import {Injectable} from '@angular/core';
import {GeoJSON, geoJSON, Layer, Map} from 'leaflet';
import get from 'lodash-es/get';

import {DatasetService} from './dataset.service';
import {GeoFeature} from '../constants/geo.types';
import {LayerEventsService} from './layer-events.service';
import {LifeIndexResponse} from '../constants/response.types';

import * as COUNTRIES from '@/../files/geo-location/european-union.json';
import {SORT_ORDER} from '@/app/shared/constants/math.const';

const FEATURES = get(COUNTRIES, 'features', []) as Array<GeoFeature>;

@Injectable({
    providedIn: 'root',
})
export class LayersService {
    constructor(
        public eventsService: LayerEventsService,
        private datasetService: DatasetService,
    ) {}

    public prepareLayers(map: Map, baseLayers: Array<Layer | GeoJSON>, response: LifeIndexResponse): Array<Layer | GeoJSON> {
        const countriesLayers = FEATURES.map(county => this.getFeatureLayer(map, county, response));

        return [...baseLayers, ...countriesLayers];
    }

    public getFeatureLayer = (map: Map, geoLand: GeoFeature, response: LifeIndexResponse): GeoJSON => {
        const countryCode = geoLand.id as string;
        const score = this.datasetService.getScore(geoLand, response);
        const geoJsonObject = geoLand.geometry;
        const options = {
            style: () => ({
                color: this.getColor(response, score, countryCode),
                fillColor: this.getColor(response, score, countryCode),
                fillOpacity: 0.6,
                opacity: 0.8,
                weight: 3
            })
        };

        const layer = geoJSON(geoJsonObject, options);
        this.eventsService.addEvents(map, layer, geoLand, response);

        return layer;
    };

    private getColor = (response: LifeIndexResponse, score: number, countryCode: string): string => {
        const sortedResponse = this.datasetService.getSortedResponse(response, SORT_ORDER.DESC);
        const rank = sortedResponse.findIndex(item => item[0] === countryCode) + 1;

        switch (true) {
            case rank <= 3: return '#001146';
            case rank <= 9: return '#00116e';
            case rank <= 15: return '#0011aa';
            case rank <= 18: return '#3753f2';
            case rank <= 21: return '#809fff';
            case rank <= 24: return '#fc7272';
            case rank <= 26: return '#fc4949';
            default: return '#e60000';
        }
    };
}
