import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

import {GeoJSON, Layer, Map} from 'leaflet';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

import {AtlasService} from './services/atlas.service';
import {Filter} from '@/app/shared/filter';
import {IAtlasLayer, ISummaryControl} from '@/app/views/atlas/atlas.types';
import {LifeIndexFetcher} from '@/app/shared/services/fetch/life-index.fetcher';
import {LifeIndexMultipleResponses} from '@/app/views/atlas/constants/response.types';
import {SummaryControlService} from '@/app/views/atlas/services/summary-control.service';

import {BASE_LAYERS, LAYERS, MAP_OPTIONS} from './constants/atlas.const';

@Component({
    selector: 'qoli-atlas',
    standalone: true,
    templateUrl: './atlas.component.html',
    styleUrls: ['./atlas.component.scss'],
    imports: [CommonModule, LeafletModule, MatProgressSpinner]
})
export class AtlasComponent implements OnInit, OnChanges {
    constructor(
        protected atlasService: AtlasService,
        private filter: Filter,
        protected lifeIndexFetcher: LifeIndexFetcher,
        private summaryControlService: SummaryControlService
    ) {}

    private map: Map | undefined;
    private scores = {};
    protected readonly MAP_OPTIONS = MAP_OPTIONS;
    protected atlasLayers: Array<IAtlasLayer> = BASE_LAYERS;
    protected readonly layersControl = {
        baseLayers: {
            [LAYERS.OPEN_STREET_MAP.BASE.name]: LAYERS.OPEN_STREET_MAP.BASE.layer,
            [LAYERS.OPEN_STREET_MAP.CYCLE.name]: LAYERS.OPEN_STREET_MAP.CYCLE.layer,
            [LAYERS.OPEN_STREET_MAP.LAND.name]: LAYERS.OPEN_STREET_MAP.LAND.layer,
            [LAYERS.OPEN_STREET_MAP.TRANSPORT.name]: LAYERS.OPEN_STREET_MAP.TRANSPORT.layer
        },
        overlays: {
            // GeoJSON: this.layerGeoJSON
        }
    };
    private summaryControl: ISummaryControl | undefined;

    @Input() showScore = true;
    @Output() openSidebar = new EventEmitter();

    get layers(): Array<Layer | GeoJSON> {
        return this.atlasLayers.map(atlasLayer => atlasLayer.value);
    }

    ngOnInit(): void {
        this.lifeIndexFetcher.lifeIndex$
            .subscribe((scores: LifeIndexMultipleResponses) => {
                if (this.map) {
                    this.scores = this.lifeIndexFetcher.reduce(scores, this.filter.baseFilter.startYear);
                    this.atlasLayers = this.atlasService.prepareLayers(this.map, BASE_LAYERS, this.scores, this.summaryControl);
                }
            });
        this.summaryControlService.updateContent('land-summary');
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.atlasService.onToggleTooltip(this.atlasLayers, this.scores, this.showScore);
    }

    onMapReady(map: Map): void {
        this.map = map;
        this.atlasService.onFilterControlAdd(map);
        this.atlasService.onLegendAdd(map);
        this.summaryControl = this.atlasService.onSummaryAdd(map);
    }

    onOpenSidebar(event: Event): void {
        this.openSidebar.emit(event);
    }
}
