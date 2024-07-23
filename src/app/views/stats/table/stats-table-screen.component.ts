import {CommonModule} from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';

import {BackendService} from '@/app/views/atlas/services/backend.service';
import {Filter, FilterComponent} from '@/app/shared/filter';
import {SidebarComponent} from '@/app/views/sidebar/sidebar.component';

@Component({
    selector: 'qoli-stats-table-screen',
    templateUrl: './stats-table-screen.component.html',
    standalone: true,
    styleUrls: ['../stats-screen.scss'],
    imports: [CommonModule, FilterComponent, MatDialogModule, MatIcon, SidebarComponent]
})
export class StatsTableScreenComponent {
    constructor(
        protected dialogRef: MatDialogRef<StatsTableScreenComponent>
    ) {}

    // TODO: add tables
}
