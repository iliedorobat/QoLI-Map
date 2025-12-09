import {Component, inject, OnDestroy, ViewChild} from '@angular/core';
import {ComponentType} from '@angular/cdk/overlay';
import {MatDialog} from '@angular/material/dialog';
import {MatDrawer} from '@angular/material/sidenav';
import {TranslateService} from '@ngx-translate/core';

import {Subject} from 'rxjs';

import {AboutScreenComponent} from '@/app/views/about/about-screen.component';
import {FetcherState} from '@/app/shared/state/fetcherState';
import {FilterService} from '@/app/shared/filter';
import {MenuItem} from '@/app/app.types';
import {StatsChartScreenComponent} from '@/app/views/stats/chart/stats-chart-screen.component';
import {State} from "@/app/shared/state/state";
import {StatsTableScreenComponent} from '@/app/views/stats/table/stats-table-screen.component';

import {DEFAULT_ACTIVE_MENU_ITEM_ID, MENU_ITEMS, MENU_ITEMS_IDS, MENU_LOGO_ITEM} from './app.const';

@Component({
    selector: 'qoli-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
    private _showScore$ = new Subject();
    private showScore$$ = this._showScore$.asObservable();

    protected readonly MENU_ITEMS: Array<MenuItem> = MENU_ITEMS;
    protected readonly MENU_ITEMS_IDS = MENU_ITEMS_IDS;
    protected readonly MENU_LOGO_ITEM = MENU_LOGO_ITEM;
    protected activeMenuItemId: string = DEFAULT_ACTIVE_MENU_ITEM_ID;
    protected showScore: boolean = true;

    constructor(
        protected fetcherState: FetcherState,
        private filterService: FilterService,
        private state: State,
        private translate: TranslateService
    ) {
        translate.addLangs(['en-US']);
        translate.setDefaultLang('en-US');
        translate.use('en-US');

        this.showScore$$.subscribe(showScore => {
            this.showScore = showScore as boolean;
        });
    }

    readonly dialog = inject(MatDialog);

    @ViewChild('drawer') drawerInstance: MatDrawer | undefined;

    ngOnDestroy(): void {
        this._showScore$.unsubscribe();
        this.fetcherState.unsubscribe();
    }

    onMenuItemClick(event: Event, menuItem: MenuItem): void {
        const {id} = menuItem;
        if (id === this.MENU_ITEMS_IDS.LOGO) {
            return;
        }

        switch (id) {
            case this.MENU_ITEMS_IDS.ABOUT:
                this.onOpenScreen(id, AboutScreenComponent);
                return;
            case this.MENU_ITEMS_IDS.FILTER:
                this.onToggleSidebar(event);
                return;
            case this.MENU_ITEMS_IDS.STATS_CHART:
                this.onOpenScreen(id, StatsChartScreenComponent);
                return;
            case this.MENU_ITEMS_IDS.STATS_TABLE:
                this.onOpenScreen(id, StatsTableScreenComponent);
                return;
            default:
                this.onActiveButtonChange(id);
                return;
        }
    }

    onOpenScreen(buttonId: string, Component: ComponentType<AboutScreenComponent | StatsChartScreenComponent | StatsTableScreenComponent>) {
        const dialogRef = this.dialog.open(Component, {
            panelClass: ['custom-modal', 'full-screen']
        });

        this.state.setStatsAnalysisType(buttonId);
        this.onActiveButtonChange(buttonId);

        dialogRef.afterClosed().subscribe(result => {
            // Workaround to sync "Year of Analysis" with "Start Year" to
            const startYear = this.filterService.filter.form.get('startYear')?.value;
            this.filterService.filter.form.get('startYear')?.setValue(startYear);

            this.state.resetStatsAnalysisType();
            this.onActiveButtonResets();
        });
    }


    onActiveButtonChange(itemId: string): void {
        this.activeMenuItemId = itemId;
    }

    onActiveButtonResets(): void {
        this.activeMenuItemId = DEFAULT_ACTIVE_MENU_ITEM_ID;
    }

    onSidebarClose(): void {
        this.onActiveButtonResets();
        this.filterService.onReset();
    }

    onToggleSidebar(event: Event) {
        if (!this.drawerInstance?.opened) {
            this.onActiveButtonChange(this.MENU_ITEMS_IDS.FILTER);
        }

        this.drawerInstance?.toggle();
    }

    onToggleScore = (showScore?: boolean) => {
        const newShowScore = showScore || !this.showScore;
        this._showScore$.next(newShowScore);
    }
}
