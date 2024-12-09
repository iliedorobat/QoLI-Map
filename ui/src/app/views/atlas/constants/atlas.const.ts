import {LatLngTuple, MapOptions, TileLayerOptions, latLng, tileLayer} from 'leaflet';

import {COPYRIGHT} from 'src/app/shared/constants/app.const';

const CENTER_POS = [49, 15] as LatLngTuple;

const LAYER_OPTIONS = {
    attribution: `Maps &copy; <a href="${COPYRIGHT.ORGANIZATION.URI}" target="_blank">${COPYRIGHT.ORGANIZATION.name}</a>`
} as TileLayerOptions;

// TODO: check the layers
const LAYERS = {
    OPEN_STREET_MAP: {
        BASE: {
            name: 'Open Street Map',
            enabled: true,
            layer: tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', LAYER_OPTIONS)
        },
        CYCLE: {
            name: 'Cycle',
            enabled: true,
            layer: tileLayer('https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', LAYER_OPTIONS)
        },
        LAND: {
            name: 'Land',
            enabled: true,
            layer: tileLayer('https://{s}.tile3.opencyclemap.org/landscape/{z}/{x}/{y}.png', LAYER_OPTIONS)
        },
        TRANSPORT: {
            name: 'Public Transport',
            enabled: true,
            layer: tileLayer('https://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png', LAYER_OPTIONS)
        }
    },
    CARTO: {
        BASE: {
            name: 'Black - White',
            enabled: false,
            layer: tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', LAYER_OPTIONS)
        }
    },
    ESRI: {
        NAT_GEO: {
            name: 'National Geographic',
            enabled: false,
            layer: tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', LAYER_OPTIONS)
        }
    },
    MAP_BOX: {
        BRIGHT: {
            name: 'MapBox Bright',
            enabled: false,
            layer: tileLayer('https://a.tiles.mapbox.com/v3/mapbox.world-bright/{z}/{x}/{y}.png', LAYER_OPTIONS)
        }
    },
    STAMEN: {
        TERRAIN: {
            name: 'Terrain',
            enabled: false,
            layer: tileLayer('https://tile.stamen.com/terrain/{z}/{x}/{y}.png', LAYER_OPTIONS)
        }
    },
    // TODO:
    THUNDER_FOREST: {
        LANDSCAPE: {
            name: 'Landscape',
            enabled: false,
            layer: tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}', LAYER_OPTIONS)
        }
    }
};

const BASE_LAYER = LAYERS.OPEN_STREET_MAP.BASE.layer;

const BASE_LAYERS = [{
    value: BASE_LAYER
}];

const MAP_OPTIONS = {
    center: latLng(CENTER_POS),
    zoom: 5
} as MapOptions;

export {
    BASE_LAYER,
    BASE_LAYERS,
    CENTER_POS,
    LAYERS,
    LAYER_OPTIONS,
    MAP_OPTIONS
};
