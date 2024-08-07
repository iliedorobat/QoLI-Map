import {Injectable} from '@angular/core';
import {Control, DomUtil, geoJSON, Map} from 'leaflet';

import {DatasetService} from '@/app/views/atlas/services/dataset.service';
import {GeoFeature} from '@/app/views/atlas/constants/geo.types';
import {Filter} from '@/app/shared/filter';
import {IAtlasLayer, ISummaryControl} from '@/app/views/atlas/atlas.types';
import {LayerEventsService} from '@/app/views/atlas/services/layer-events.service';
import {LifeIndexResponse} from '@/app/views/atlas/constants/response.types';
import {SummaryControlService} from '@/app/views/atlas/services/summary-control.service';

import * as COUNTRIES_NON_EU from '@/../files/geo-location/europe-non-eu.json';
import * as COUNTRIES_EU from '@/../files/geo-location/europe-eu.json';
import {COLOR_PALETTE, EXCLUDED_COLOR} from '@/app/views/atlas/constants/colors.const';
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
        private filter: Filter,
        private summaryControlService: SummaryControlService
    ) {}

    public GRADES = [4, 8, 12, 16, 19, 22, 25, 100];

    public onFilterControlAdd(map: Map): Control {
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
        return filterControl;
    }

    public onLegendAdd(map: Map): Control {
        const CustomLegend = Control.extend({
            onAdd(map: Map) {
                return DomUtil.get('legend');
            },
            onRemove(map: Map) {}
        });
        const legend = new CustomLegend({
            position: 'bottomleft'
        });

        map.addControl(legend);
        return legend;
    }

    public onSummaryAdd(map: Map): ISummaryControl {
        const CustomControl = Control.extend({
            onAdd(map: Map) {
                return DomUtil.get('land-summary');
            },
            onRemove(map: Map) {},
            update: (geoLand: GeoFeature, response: LifeIndexResponse): void => {
                this.summaryControlService.updateContent('land-summary', geoLand, response);
            }
        });
        const infoControl = new CustomControl({
            position: 'topright'
        });

        map.addControl(infoControl);
        return infoControl;
    }

    public onToggleTooltip(layers: Array<IAtlasLayer>, response: LifeIndexResponse, showScore: boolean): void {
        this.eventsService.onToggleTooltip(layers, response, showScore);
    }

    public prepareLayers(map: Map, baseLayers: Array<IAtlasLayer>, response: LifeIndexResponse, summaryControl: ISummaryControl | undefined): Array<IAtlasLayer> {
        const countriesLayers = FEATURES.map(country => this.getFeatureLayer(map, country, response, summaryControl));

        return [...baseLayers, ...countriesLayers];
    }

    private getFeatureLayer(map: Map, geoLand: GeoFeature, response: LifeIndexResponse, summaryControl: ISummaryControl | undefined): IAtlasLayer {
        const countryCode = geoLand.id as string;
        const score = this.datasetService.getScore(geoLand, response);
        const geoJsonObject = geoLand.geometry;
        const options = {
            style: () => ({
                color: this.getLayerColor(response, countryCode, score),
                fillColor: this.getLayerColor(response, countryCode, score),
                fillOpacity: 0.6,
                opacity: 0.8,
                weight: 3
            })
        };

        const layer = geoJSON(geoJsonObject, options);
        this.eventsService.addEvents(map, layer, geoLand, response, summaryControl);

        return {
            geoLand,
            value: layer
        } as IAtlasLayer;
    }

    private getLayerColor(response: LifeIndexResponse, countryCode: string, score?: number): string {
        const isNegativeState = this.filter.baseFilter.isIndividuallyAnalysis()
            && this.filter.individuallyFilter.isNegativeState()
        const sortedResponse = isNegativeState
            ? this.datasetService.getSortedResponse(response, SORT_ORDER.ASC)
            : this.datasetService.getSortedResponse(response, SORT_ORDER.DESC);
        const rank = sortedResponse.findIndex(item => item[0] === countryCode) + 1;
        const isExcluded = score === this.datasetService.EXCLUDED_COUNTRY_SCORE;

        return this.getColor(rank, sortedResponse.length, isExcluded);
    }

    public getColor(rank: number, maxRank: number, isExcluded?: boolean): string {
        if (isExcluded) {
            return EXCLUDED_COLOR;
        }

        const colorIndex = this.test(rank, maxRank);
        return COLOR_PALETTE[colorIndex];
    }

    private test(rank: number, maxRank: number): number {
        // "COLOR_PALETTE.length - 1" because arrays start indexing from 0
        const diff = COLOR_PALETTE.length - 1 - maxRank;
        const aux = Math.abs(diff / maxRank);

        if (diff > 0) {
            // E.g.:
            //      * colors.length = 30
            //      * maxRank = 28
            //      * diff = 30 - 1 - 28
            return Math.floor(rank + aux * rank);
        } else if (diff < 0) {
            // E.g.:
            //      * colors.length = 26
            //      * maxRank = 28
            //      * diff = 26 - 1 - 28
            return Math.floor(rank - aux * rank);
        }

        return rank;
    }
}

export const MARKERS_STATUS = {
    DISPLAY_ALL: 'all',
    DISPLAY_NONE: 'none',
    DISPLAY_FILTERED: 'filtered'
};
