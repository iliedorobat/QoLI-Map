import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import noop from 'lodash-es/noop';

@Component({
    selector: 'qoli-about-screen',
    templateUrl: './about-screen.component.html',
    standalone: true,
    styleUrls: ['./about-screen.component.scss'],
    imports: [CommonModule]
})
export class AboutScreenComponent {
    constructor(
        private activeModal: NgbActiveModal
    ) {}

    @Input() onActiveButtonResets: Function = noop;

    onViewClose = () => {
        this.activeModal.close();
        this.onActiveButtonResets();
    };
}
