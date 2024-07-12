import {Injectable} from '@angular/core';
import {GeoJSON, Map} from 'leaflet';

import {DatasetService} from '../services/dataset.service';
import {GeoFeature} from '../constants/geo.types';
import {IAtlasLayer, ISummaryControl} from '@/app/views/atlas/atlas.types';
import {LifeIndexResponse} from '../constants/response.types';
import {SummaryControlService} from '@/app/views/atlas/services/summary-control.service';
import {TooltipService} from './tooltip.service';

import {SORT_ORDER} from '@/app/shared/constants/math.const';

@Injectable({
    providedIn: 'root'
})
export class LayerEventsService {
    constructor(
        private datasetService: DatasetService,
        private summaryControlService: SummaryControlService,
        private tooltipService: TooltipService
    ) {}

    public addEvents(map: Map, layer: GeoJSON, geoLand: GeoFeature, response: LifeIndexResponse, summaryControl: ISummaryControl | undefined) {
        // this.onBindPopup(layer, geoLand, response);
        this.onBindTooltip(layer, geoLand, response);
        this.onLayerMouseOver(layer, geoLand, response, summaryControl);
        this.onLayerMouseOut(layer, geoLand, response, summaryControl);
    }

    public onToggleTooltip(layers: Array<IAtlasLayer>, response: LifeIndexResponse, showScore: boolean): void {
        if (showScore) {
            layers.forEach(layer => {
                if (layer.geoLand) {
                    this.onBindTooltip(layer.value as GeoJSON, layer.geoLand, response);
                }
            });
        } else {
            layers.forEach(layer => layer.value.unbindTooltip());
        }
    }

    /** @deprecated */
    private onBindPopup(layer: GeoJSON, geoLand: GeoFeature, response: LifeIndexResponse) {
        const options = this.summaryControlService.getPopupOptions();
        const content = this.summaryControlService.createContent(geoLand, response);
        layer.bindPopup(content, options);
    }

    private onBindTooltip(layer: GeoJSON, geoLand: GeoFeature, response: LifeIndexResponse) {
        const score = this.datasetService.getScore(geoLand, response);

        // Avoid displaying the tooltip if the country has been filtered out
        if (score === this.datasetService.EXCLUDED_COUNTRY_SCORE) {
            return;
        }

        const options = this.tooltipService.getOptions(geoLand);
        const content = this.tooltipService.createContent(geoLand, response);

        layer.bindTooltip(content, options);
        layer.addEventListener(EVENT_TYPES.POPUP_CLOSE, () => {
            layer.bindTooltip(content, options);
        });
    }

    private onLayerMouseOver(layer: GeoJSON, geoLand: GeoFeature, response: LifeIndexResponse, summaryControl: ISummaryControl | undefined) {
        layer.addEventListener(EVENT_TYPES.MOUSE_OVER, () => {
            layer.setStyle({
                fillOpacity: 0.8,
                opacity: 1
            });
            summaryControl?.update(geoLand, response);
        });
    }

    private onLayerMouseOut(layer: GeoJSON, geoLand: GeoFeature, response: LifeIndexResponse, summaryControl: ISummaryControl | undefined) {
        layer.addEventListener(EVENT_TYPES.MOUSE_OUT, () => {
            layer.setStyle({
                fillOpacity: 0.6,
                opacity: 0.8
            });
            summaryControl?.update();
        });
    }
}

export const EVENT_TYPES = {
    CLICK: 'click',
    MOUSE_OVER: 'mouseover',
    MOUSE_OUT: 'mouseout',
    POPUP_CLOSE: 'popupclose'
};
