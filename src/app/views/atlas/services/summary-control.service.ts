import {Injectable} from '@angular/core';
import {DomUtil, PopupOptions} from 'leaflet';

import {ChartService} from '@/app/shared/charts/chart.service';
import {DatasetService} from './dataset.service';
import {GeoFeature} from '@/app/views/atlas/constants/geo.types';
import {HTMLElementParams, HtmlElementsService} from './html-elements.service';
import {LifeIndexResponse} from '@/app/views/atlas/constants/response.types';

import {SORT_ORDER} from '@/app/shared/constants/math.const';

@Injectable({
    providedIn: 'root'
})
export class SummaryControlService {
    constructor(
        private chartService: ChartService,
        private datasetService: DatasetService,
        private htmlElementsService: HtmlElementsService
    ) {}

    public createContent(geoLand: GeoFeature, response: LifeIndexResponse) {
        const content = document.createElement('div');
        content.className = 'content';

        const header = this.createHeader();
        content.appendChild(header);

        const body = this.createBody(geoLand, response);
        content.appendChild(body);

        return content;
    }

    public updateContent(parentId: string, geoLand?: GeoFeature, response?: LifeIndexResponse) {
        const summary: HTMLElement | null = DomUtil.get(parentId);
        const content = summary?.getElementsByClassName('content')[0];

        if (content) {
            const oldHeader = content.getElementsByClassName('header')[0];
            const newHeader = this.createHeader();

            if (oldHeader) {
                content.replaceChild(newHeader, oldHeader);
            }

            const oldBody = content.getElementsByClassName('body')[0];
            const newBody = this.createBody(geoLand, response);

            if (oldBody) {
                content.replaceChild(newBody, oldBody);
            }
        }
    }

    public getPopupOptions(): PopupOptions {
        return {
            className: 'land-summary'
        } as PopupOptions;
    }

    private createHeader(): HTMLElement {
        return this.htmlElementsService.createElement({
            className: 'header',
            innerText: this.chartService.generateChartTitle(),
            tagName: 'div'
        } as HTMLElementParams);
    }

    private createBody(geoLand?: GeoFeature, response?: LifeIndexResponse): HTMLElement {
        const bodyElement = this.htmlElementsService.createElement({
            className: 'body',
            tagName: 'div'
        } as HTMLElementParams);

        if (!geoLand || !response) {
            bodyElement.style.display = 'none';
            return bodyElement;
        }

        const countryCode = geoLand.id;
        const countryName = this.getCountryName(geoLand);
        const score = this.datasetService.getScoreStr(geoLand, response);
        const sortedResponse = this.datasetService.getSortedResponse(response, SORT_ORDER.DESC);
        const rank = sortedResponse.findIndex(item => item[0] === countryCode) + 1;

        const countryLabelElement = this.htmlElementsService.createLabelElement('Country');
        const countryElement = this.htmlElementsService.createValueElement(countryName);

        bodyElement.appendChild(countryLabelElement);
        bodyElement.appendChild(countryElement);

        if (score === this.datasetService.EXCLUDED_COUNTRY_SCORE) {
            return bodyElement;
        }

        const rankLabelElement = this.htmlElementsService.createLabelElement('Rank');
        const rankElement = this.htmlElementsService.createValueElement(`${rank} of ${sortedResponse.length}`);

        const scoreLabelElement = this.htmlElementsService.createLabelElement('Value');
        const scoreElement = this.htmlElementsService.createValueElement(score);

        bodyElement.appendChild(scoreLabelElement);
        bodyElement.appendChild(scoreElement);

        bodyElement.appendChild(rankLabelElement);
        bodyElement.appendChild(rankElement);

        return bodyElement;
    }

    private getCountryName(geoLand: GeoFeature): string {
        const countryName = geoLand.properties.NAME_ENGL;

        if (['Kazakhstan', 'Russian Federation', 'Türkiye'].includes(countryName)) {
            return `${countryName} (European territory)`
        }

        return countryName;
    }
}
