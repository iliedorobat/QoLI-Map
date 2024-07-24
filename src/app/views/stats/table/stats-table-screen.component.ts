import {CommonModule} from '@angular/common';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';

import {BackendService} from '@/app/views/atlas/services/backend.service';
import {FilterComponent} from '@/app/shared/filter';
import {ITableRow} from '@/app/views/stats/table/stats-table-screen.types';
import {LifeIndexMultipleResponses} from '@/app/views/atlas/constants/response.types';
import {SidebarComponent} from '@/app/views/sidebar/sidebar.component';
import {StatsService} from '@/app/views/stats/stats.service';

import {EU28_MEMBERS} from '@/app/shared/constants/app.const';

@Component({
    selector: 'qoli-stats-table-screen',
    templateUrl: './stats-table-screen.component.html',
    standalone: true,
    styleUrls: ['../stats-screen.scss'],
    imports: [
        CommonModule,
        FilterComponent,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatDialogModule,
        MatHeaderCell,
        MatHeaderCellDef,
        MatRowDef,
        MatHeaderRow,
        MatHeaderRowDef,
        MatIcon,
        MatPaginator,
        MatRow,
        MatSort,
        MatSortHeader,
        MatTable,
        SidebarComponent
    ]
})
export class StatsTableScreenComponent implements AfterViewInit, OnInit {
    constructor(
        private backendService: BackendService,
        protected dialogRef: MatDialogRef<StatsTableScreenComponent>,
        protected statsService: StatsService
    ) {}

    @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
    @ViewChild(MatSort) sort: MatSort | undefined;

    protected dataSource: MatTableDataSource<ITableRow> = new MatTableDataSource<ITableRow>;
    protected defaultColumns: string[] = ['code', 'name'];
    protected columns: string[] = [...this.defaultColumns];
    protected periodColumns: string[] = [];

    ngAfterViewInit(): void {
        if (this.paginator && this.sort) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }

    ngOnInit(): void {
        this.backendService.lifeIndex$
            .subscribe((scores: LifeIndexMultipleResponses) => {
                const countryCodes = Object.keys(scores);
                this.updateColumns(scores);

                this.dataSource.data = countryCodes.reduce((acc: ITableRow[], code) => {
                    acc.push({
                        code,
                        name: EU28_MEMBERS[code],
                        ...scores[code]
                    });
                    return acc;
                }, []);
            });
    }

    updateColumns = (scores: LifeIndexMultipleResponses): void => {
        const countryCodes = Object.keys(scores);
        if (countryCodes.length === 0) {
            return;
        }

        const code = countryCodes[0];
        this.periodColumns = Object.keys(scores[code]);
        this.columns = [...this.defaultColumns, ...this.periodColumns];
    };
}
