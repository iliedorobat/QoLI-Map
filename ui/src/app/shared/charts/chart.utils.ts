import {Injectable} from '@angular/core';
import {ChartDataset} from 'chart.js/dist/types';

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
}
