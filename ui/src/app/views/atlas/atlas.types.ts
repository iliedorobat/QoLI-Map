import {Control, GeoJSON, Layer} from 'leaflet';

import {GeoFeature} from './constants/geo.types';
import {LifeIndexResponse} from '@/app/views/atlas/constants/response.types';

export interface IAtlasLayer {
    value: Layer | GeoJSON;
    geoLand?: GeoFeature;
}

export interface ISummaryControl extends Control {
    update(geoLand?: GeoFeature, response?: LifeIndexResponse): void;
}
