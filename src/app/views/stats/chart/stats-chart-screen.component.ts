import {CommonModule} from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';

import {BaseChartDirective} from 'ng2-charts';

import {BackendService} from '@/app/views/atlas/services/backend.service';
import {ChartService} from '@/app/shared/charts/chart.service';
import {Filter, FilterComponent} from '@/app/shared/filter';
import {SidebarComponent} from '@/app/views/sidebar/sidebar.component';

@Component({
    selector: 'qoli-stats-chart-screen',
    templateUrl: './stats-chart-screen.component.html',
    standalone: true,
    styleUrls: ['../stats-screen.scss'],
    imports: [BaseChartDirective, CommonModule, FilterComponent, MatDialogModule, MatIcon, SidebarComponent],
    providers: [ChartService]
})
export class StatsChartScreenComponent implements OnInit {
    constructor(
        private backendService: BackendService,
        private chartService: ChartService,
        protected dialogRef: MatDialogRef<StatsChartScreenComponent>,
        protected filter: Filter
    ) {}

    @ViewChild(BaseChartDirective)
    public chart: BaseChartDirective | undefined;
    protected chartType = this.filter.statsFilter.selectedType;
    protected chartData = this.chartService.generateChartData(this.chartType);
    protected chartOptions = this.chartService.generateChartOptions(this.chartType);
    protected isHorizontal = false;

    ngOnInit(): void {
        this.filter.baseFilter.reset(this.filter.form);
        this.backendService.lifeIndex$
            .subscribe(scores => {
                this.chartType = this.filter.form.get('chartType')?.value
                this.chartData = this.chartService.generateChartData(this.chartType, scores);
                this.chartOptions = this.chartService.generateChartOptions(this.chartType);
                this.isHorizontal = this.chartService.isHorizontal(this.chartType);

                // Workaround to update the indexAxis
                if (this.chart?.options) {
                    this.chart.options.indexAxis = this.isHorizontal ? 'y' : 'x';
                    this.chart.render();
                }
            });
    }
}
