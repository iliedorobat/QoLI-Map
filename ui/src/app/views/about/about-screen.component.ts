import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';

@Component({
    selector: 'qoli-about-screen',
    templateUrl: './about-screen.component.html',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButton, MatIcon]
})
export class AboutScreenComponent {
    constructor(
        protected dialogRef: MatDialogRef<AboutScreenComponent>
    ) {}
}
