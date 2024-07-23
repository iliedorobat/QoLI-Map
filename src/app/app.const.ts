import {MenuItem} from '@/app/app.types';

const MENU_ITEMS_IDS = {
    ABOUT: 'about-button',
    FILTER: 'filter-button',
    LOGO: 'logo-button',
    MAP: 'map-button',
    STATS_CHART: 'stats-chart-button',
    STATS_TABLE: 'stats-table-button',
};

const MENU_ITEMS = [
    {
        id: MENU_ITEMS_IDS.ABOUT,
        iconClasses: 'fa-solid fa-circle-info',
        label: 'About',
        order: 5
    },
    {
        id: MENU_ITEMS_IDS.FILTER,
        iconClasses: 'fa-solid fa-filter',
        label: 'Filter',
        order: 2
    },
    {
        id: MENU_ITEMS_IDS.LOGO,
        label: 'European Life Index Leaf',
        order: 0
    },
    {
        id: MENU_ITEMS_IDS.MAP,
        iconClasses: 'fa-solid fa-map-location-dot',
        label: 'Map',
        order: 1
    },
    {
        id: MENU_ITEMS_IDS.STATS_CHART,
        iconClasses: 'fa-solid fa-pie-chart',
        label: 'Chart',
        order: 4
    },
    // {
    //     id: MENU_ITEMS_IDS.STATS_TABLE,
    //     iconClasses: 'bi bi-border-width',
    //     label: 'Table',
    //     order: 3
    // },
].sort((a: MenuItem, b: MenuItem) => {
    if (a.order > b.order) {
        return 1;
    } else if (a.order < b.order) {
        return -1;
    }
    return 0;
});

const DEFAULT_ACTIVE_MENU_ITEM_ID = MENU_ITEMS_IDS.MAP;

export {
    DEFAULT_ACTIVE_MENU_ITEM_ID,
    MENU_ITEMS,
    MENU_ITEMS_IDS,
};
