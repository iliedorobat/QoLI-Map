import {BaseChartDirective, NgChartsModule} from 'ng2-charts';
import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NgClass, NgIf} from '@angular/common';
import noop from 'lodash-es/noop';

import {BackendService} from '@/app/views/atlas/services/backend.service';
import {Filter} from '@/app/shared/filter';
import {FilterComponent} from '@/app/shared/filter/filter.component';
import {StatsScreenService} from '@/app/views/stats/stats-screen.service';

import {CHART_DIRECTION} from '@/app/shared/constants/app.const';

@Component({
    selector: 'qoli-stats-screen',
    templateUrl: './stats-screen.component.html',
    standalone: true,
    styleUrls: ['./stats-screen.component.scss'],
    imports: [FilterComponent, NgClass, NgChartsModule, NgIf],
    providers: [StatsScreenService]
})
export class StatsScreenComponent implements OnInit, OnDestroy {
    constructor(
        private activeModal: NgbActiveModal,
        private backendService: BackendService,
        protected filter: Filter,
        private statsService: StatsScreenService
    ) {}

    @ViewChild(BaseChartDirective)
    public chart: BaseChartDirective | undefined;
    protected chartData = this.statsService.generateChartData();
    protected chartOptions = this.statsService.generateChartOptions();
    protected isHorizontal = false;

    ngOnInit(): void {
        this.filter.baseFilter.reset(this.filter.form);
        this.backendService.lifeIndex$
            .subscribe(scores => {
                this.isHorizontal = this.filter.form.get('chartDirection')?.value === CHART_DIRECTION.HORIZONTAL;
                this.chartData = this.statsService.generateChartData(scores);
                this.chartOptions = this.statsService.generateChartOptions(this.isHorizontal);

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
