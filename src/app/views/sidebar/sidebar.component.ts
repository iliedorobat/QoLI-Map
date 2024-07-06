import {Component, Input} from '@angular/core';
import {NgbActiveOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import noop from 'lodash-es/noop';

import {FilterComponent} from '@/app/shared/filter/filter.component';

@Component({
    selector: 'qoli-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [FilterComponent]
})
export class SidebarComponent {
    constructor(
        public activeOffcanvas: NgbActiveOffcanvas
    ) {}

    @Input() onActiveButtonResets: Function = noop;
    @Input() onToggleScore: Function = noop;

    onSidebarClose(): void {
        this.activeOffcanvas.dismiss('Cross click');
        this.onActiveButtonResets();
    }
}
