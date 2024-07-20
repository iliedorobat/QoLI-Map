import {Component} from '@angular/core';
import {Subject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal, NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';

import {AboutScreenComponent} from '@/app/views/about/about-screen.component';
import {BackendService} from '@/app/views/atlas/services/backend.service';
import {Filter} from '@/app/shared/filter';
import {MenuItem} from '@/app/app.types';
import {SidebarComponent} from '@/app/views/sidebar/sidebar.component';
import {StatsScreenComponent} from '@/app/views/stats/stats-screen.component';

import {DEFAULT_ACTIVE_MENU_ITEM_ID, MENU_ITEMS, MENU_ITEMS_IDS} from './app.const';

@Component({
    selector: 'qoli-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private _showScore$ = new Subject();
    private showScore$$ = this._showScore$.asObservable();

    protected readonly MENU_ITEMS: Array<MenuItem> = MENU_ITEMS;
    protected readonly MENU_ITEMS_IDS = MENU_ITEMS_IDS;
    protected activeMenuItemId: string = DEFAULT_ACTIVE_MENU_ITEM_ID;
    protected showScore: boolean = true;

    constructor(
        private backendService: BackendService,
        private filter: Filter,
        private modalService: NgbModal,
        private offcanvasService: NgbOffcanvas,
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
                this.onOpenSidebar(event, id);
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
        this.onActiveButtonChange(buttonId);
        const modalRef = this.modalService.open(AboutScreenComponent, {fullscreen: true});
        modalRef.componentInstance.onActiveButtonResets = this.onActiveButtonResets;
        modalRef.hidden.subscribe(value => {
            this.onActiveButtonResets();
        });
    }

    onOpenStats(event: Event, buttonId: string) {
        this.onActiveButtonChange(buttonId);
        const modalRef = this.modalService.open(StatsScreenComponent, {fullscreen: true});
        modalRef.componentInstance.onActiveButtonResets = this.onActiveButtonResets;
        modalRef.hidden.subscribe(value => {
            this.onActiveButtonResets();
        });
    }

    onOpenSidebar(event: Event, itemId: string): void {
        event.preventDefault();
        event.stopPropagation();

        this.onActiveButtonChange(itemId);

        const offcanvasRef = this.offcanvasService.open(SidebarComponent, {panelClass: 'sidebar'});
        offcanvasRef.componentInstance.name = 'Filter';
        offcanvasRef.componentInstance.onActiveButtonResets = this.onActiveButtonResets;
        offcanvasRef.componentInstance.onToggleScore = this.onToggleScore;
        offcanvasRef.hidden.subscribe(value => {
            this.onActiveButtonResets();
        });
    }

    onActiveButtonChange(itemId: string): void {
        this.activeMenuItemId = itemId;
    }

    onActiveButtonResets(): void {
        this.activeMenuItemId = DEFAULT_ACTIVE_MENU_ITEM_ID;
    }

    onToggleScore = (showScore?: boolean) => {
        const newShowScore = showScore || !this.showScore;
        this._showScore$.next(newShowScore);
    }
}
