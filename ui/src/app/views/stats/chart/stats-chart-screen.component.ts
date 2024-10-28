import {CommonModule} from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';

import {BaseChartDirective} from 'ng2-charts';

import {ChartService} from '@/app/shared/charts/chart.service';
import {FetcherState} from '@/app/shared/state/fetcherState';
import {Filter, FilterComponent} from '@/app/shared/filter';
import {LifeIndexMultipleResponses} from '@/app/views/atlas/constants/response.types';
import {LoaderComponent} from '@/app/shared/loader/loader.component';
import {SidebarComponent} from '@/app/views/sidebar/sidebar.component';

@Component({
    selector: 'qoli-stats-chart-screen',
    templateUrl: './stats-chart-screen.component.html',
    standalone: true,
    styleUrls: ['../stats-screen.scss'],
    imports: [
        BaseChartDirective,
        CommonModule,
        FilterComponent,
        LoaderComponent,
        MatDialogModule,
        MatIcon,
        SidebarComponent
    ],
    providers: [ChartService]
})
export class StatsChartScreenComponent implements OnInit {
    constructor(
        private chartService: ChartService,
        protected dialogRef: MatDialogRef<StatsChartScreenComponent>,
        private fetcherState: FetcherState,
        protected filter: Filter
    ) {}

    @ViewChild(BaseChartDirective)
    public chart: BaseChartDirective | undefined;
    protected chartType = this.filter.statsFilter.selectedType;
    protected chartData = this.chartService.generateChartData(this.chartType);
    protected chartOptions = this.chartService.generateChartOptions(this.chartType);
    protected className: string = this.prepareClassName();
    protected isHorizontal = false;
    private scores: LifeIndexMultipleResponses | null = null;

    ngOnInit(): void {
        this.fetcherState.lifeIndex$
            .subscribe((scores: LifeIndexMultipleResponses) => {
                // Prevent rendering the chart when indicator changes until "Apply Filter" button is pressed
                if (this.scores !== scores) {
                    this.chartType = this.filter.form.get('chartType')?.value
                    this.chartData = this.chartService.generateChartData(this.chartType, scores);
                    this.chartOptions = this.chartService.generateChartOptions(this.chartType);
                    this.isHorizontal = this.chartService.isHorizontal(this.chartType);
                    this.className = this.prepareClassName();
                    this.scores = scores;

                    // Workaround to update the indexAxis
                    if (this.chart?.options) {
                        this.chart.options.indexAxis = this.isHorizontal ? 'y' : 'x';
                        this.chart.render();
                    }
                }
            });
    }

    prepareClassName(): string {
        const classes = ['chart-container'];
        this.isHorizontal && classes.push('horizontal');
        !this.isHorizontal && classes.push('vertical');

        return classes.join(' ');
    };
}
