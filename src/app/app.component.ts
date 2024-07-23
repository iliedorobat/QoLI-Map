import {Component, inject, OnDestroy, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatDrawer} from '@angular/material/sidenav';
import {TranslateService} from '@ngx-translate/core';

import {Subject} from 'rxjs';

import {AboutScreenComponent} from '@/app/views/about/about-screen.component';
import {BackendService} from '@/app/views/atlas/services/backend.service';
import {Filter} from '@/app/shared/filter';
import {MenuItem} from '@/app/app.types';
import {StatsScreenComponent} from '@/app/views/stats/stats-screen.component';

import {DEFAULT_ACTIVE_MENU_ITEM_ID, MENU_ITEMS, MENU_ITEMS_IDS} from './app.const';

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
    protected activeMenuItemId: string = DEFAULT_ACTIVE_MENU_ITEM_ID;
    protected showScore: boolean = true;

    constructor(
        private backendService: BackendService,
        private filter: Filter,
        private translate: TranslateService
    ) {
        translate.addLangs(['en-US']);
        translate.setDefaultLang('en-US');
        translate.use('en-US');

        backendService.lifeIndexSubscription(this.filter);

        this.showScore$$.subscribe(showScore => {
            this.showScore = showScore as boolean;
        });
    }

    readonly dialog = inject(MatDialog);

    @ViewChild('drawer') drawerInstance: MatDrawer | undefined;

    ngOnDestroy(): void {
        this._showScore$.unsubscribe();
        this.backendService.unsubscribe();
    }

    onMenuItemClick(event: Event, menuItem: MenuItem): void {
        const {id} = menuItem;
        if (id === this.MENU_ITEMS_IDS.LOGO) {
            return;
        }

        switch (id) {
            case this.MENU_ITEMS_IDS.ABOUT:
                this.onOpenAbout(event, id);
                return;
            case this.MENU_ITEMS_IDS.FILTER:
                this.onToggleSidebar(event);
                return;
            case this.MENU_ITEMS_IDS.STATS:
                this.onOpenStats(event, id);
                return;
            default:
                this.onActiveButtonChange(id);
                return;
        }
    }

    onOpenAbout(event: Event, buttonId: string) {
        const dialogRef = this.dialog.open(AboutScreenComponent, {
            panelClass: ['custom-modal', 'full-screen']
        });
        this.onActiveButtonChange(buttonId);

        dialogRef.afterClosed().subscribe(result => {
            this.onActiveButtonResets();
        });
    }

    onOpenStats(event: Event, buttonId: string) {
        const dialogRef = this.dialog.open(StatsScreenComponent, {
            panelClass: ['custom-modal', 'full-screen']
        });
        this.onActiveButtonChange(buttonId);

        dialogRef.afterClosed().subscribe(result => {
            this.onActiveButtonResets();
        });
    }

    onActiveButtonChange(itemId: string): void {
        this.activeMenuItemId = itemId;
    }

    onActiveButtonResets(): void {
        this.activeMenuItemId = DEFAULT_ACTIVE_MENU_ITEM_ID;
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
