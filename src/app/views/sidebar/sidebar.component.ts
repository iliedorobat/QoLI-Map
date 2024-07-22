import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';

import noop from 'lodash-es/noop';

import {FilterComponent} from '@/app/shared/filter';

@Component({
    selector: 'qoli-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [FilterComponent]
})
export class SidebarComponent {
    constructor(
        private elementRef: ElementRef
    ) {}

    @Input() onToggleScore: Function = noop;
    @Output() closeSidebar = new EventEmitter();

    onCloseSidebar(event: Event): void {
        this.closeSidebar.emit(event);
    }
}
