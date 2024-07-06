import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import Chart from 'chart.js/auto';
import noop from 'lodash-es/noop';

import {BackendService} from '@/app/views/atlas/services/backend.service';
import {Filter} from '@/app/shared/filter';
import {FilterComponent} from '@/app/shared/filter/filter.component';
import {StatsScreenService} from '@/app/views/stats/stats-screen.service';

@Component({
    selector: 'qoli-stats-screen',
    templateUrl: './stats-screen.component.html',
    standalone: true,
    styleUrls: ['./stats-screen.component.scss'],
    imports: [FilterComponent],
    providers: [StatsScreenService]
})
export class StatsScreenComponent implements OnInit {
    constructor(
        private activeModal: NgbActiveModal,
        private backendService: BackendService,
        protected filter: Filter,
        private statsService: StatsScreenService
    ) {}

    protected chart: Chart | undefined;

    ngOnInit(): void {
        this.chart = this.statsService.initChart('stats');
        this.backendService.lifeIndex$
            .subscribe(scores => {
                this.statsService.updateChart(this.chart, scores);
            });
        this.filter.baseFilter.reset(this.filter.form);
    }

    @Input() onActiveButtonResets: Function = noop;

    onViewClose = () => {
        this.activeModal.close();
        this.onActiveButtonResets();
    };
}
