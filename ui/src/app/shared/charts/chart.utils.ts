import {Injectable} from '@angular/core';
import {ChartDataset} from 'chart.js/dist/types';

import {LifeIndexMultipleResponses} from "@/app/views/atlas/constants/response.types";

@Injectable({
    providedIn: 'root'
})
export class ChartUtils {
    public generateChartDataset = (data: number[] = [], label: string = 'QoLI Stats'): ChartDataset => {
        return {
            label,
            data,
            borderWidth: 2,
            borderRadius: 4,
            borderSkipped: false
        };
    };

    public extractTimeRange(scores: LifeIndexMultipleResponses): number[] {
        const set = new Set();

        for (const countryKey of Object.keys(scores)) {
            const timeRange = Object.keys(scores[countryKey]);
            timeRange.forEach(year => set.add(year));
        }

        return Array.from(set).sort() as number[];
    }
}
