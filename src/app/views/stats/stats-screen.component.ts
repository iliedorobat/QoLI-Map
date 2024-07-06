import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import Chart from 'chart.js/auto';
import noop from 'lodash-es/noop';

import {BackendService} from '@/app/views/atlas/services/backend.service';
import {Filter} from '@/app/shared/filter';
import {FilterComponent} from '@/app/shared/filter/filter.component';
import {LifeIndexMultipleResponses} from '@/app/views/atlas/constants/response.types';
import {StatsScreenService} from '@/app/views/stats/stats-screen.service';

@Component({
    selector: 'qoli-stats-screen',
    templateUrl: './stats-screen.component.html',
    standalone: true,
    styleUrls: ['./stats-screen.component.scss'],
    imports: [FilterComponent],
    providers: [StatsScreenService]
})
export class StatsScreenComponent implements OnInit, AfterViewInit {
    constructor(
        private activeModal: NgbActiveModal,
        private backendService: BackendService,
        protected filter: Filter,
        private statsService: StatsScreenService
    ) {}

    protected chart: Chart | undefined;
    private scores: LifeIndexMultipleResponses = {} as LifeIndexMultipleResponses;
    private indexAxis: string = 'x';

    ngOnInit(): void {
        this.chart = this.statsService.initChart('stats');
        this.backendService.lifeIndex$
            .subscribe(scores => {
                this.scores = scores;
                this.statsService.updateChart(this.chart, scores);
            });
        this.filter.baseFilter.reset(this.filter.form);
    }

    ngAfterViewInit(): void {
        const resizeObserver = new ResizeObserver(entries => {
            const width = entries[0].contentRect.width;
            const newIndexAxis = width > 600 ? 'x' : 'y';

            // Change the bar orientation
            if (this.indexAxis !== newIndexAxis) {
                this.indexAxis = newIndexAxis;
                const horizontal = width <= 600;
                this.chart = this.statsService.regenerateChart(this.chart, this.scores, horizontal);
            }
        });
        const body = document.getElementsByTagName('body')[0] as Element;
        resizeObserver.observe(body);
    }

    @Input() onActiveButtonResets: Function = noop;

    onViewClose = () => {
        this.activeModal.close();
        this.onActiveButtonResets();
    };
}
