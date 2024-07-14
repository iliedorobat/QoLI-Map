import {CommonModule} from '@angular/common';
import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {BaseChartDirective, NgChartsModule} from 'ng2-charts';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import noop from 'lodash-es/noop';

import {BackendService} from '@/app/views/atlas/services/backend.service';
import {ChartService} from '@/app/shared/charts/chart.service';
import {Filter, FilterComponent} from '@/app/shared/filter';

@Component({
    selector: 'qoli-stats-screen',
    templateUrl: './stats-screen.component.html',
    standalone: true,
    styleUrls: ['./stats-screen.component.scss'],
    imports: [FilterComponent, NgChartsModule, CommonModule],
    providers: [ChartService]
})
export class StatsScreenComponent implements OnInit, OnDestroy {
    constructor(
        private activeModal: NgbActiveModal,
        private backendService: BackendService,
        private chartService: ChartService,
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

    ngOnDestroy(): void {
        this.chart?.ngOnDestroy();
    }

    @Input() onActiveButtonResets: Function = noop;

    onViewClose = () => {
        this.activeModal.close();
        this.onActiveButtonResets();
    };
}
