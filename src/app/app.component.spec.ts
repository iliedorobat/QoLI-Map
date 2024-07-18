import {MatCheckboxModule} from '@angular/material/checkbox';
import {TestBed} from '@angular/core/testing';

import {TranslateModule} from '@ngx-translate/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from '@/app/app-routing.module';
import {AtlasComponent} from '@/app/views/atlas/atlas.component';

// describe('AppComponent', () => {
//     beforeEach(async () => {
//         await TestBed.configureTestingModule({
//             imports: [
//                 TranslateModule.forRoot(),
//
//                 AppRoutingModule,
//                 AtlasComponent,
//                 MatCheckboxModule
//             ],
//             declarations: [
//                 AppComponent
//             ],
//         }).compileComponents();
//     });
//
//     it('should create the app', () => {
//         const fixture = TestBed.createComponent(AppComponent);
//         const app = fixture.componentInstance;
//         expect(app).toBeTruthy();
//     });
//
//     it('should render logo', () => {
//         const fixture = TestBed.createComponent(AppComponent);
//         fixture.detectChanges();
//         const compiled = fixture.nativeElement as HTMLElement;
//         expect(compiled.querySelector('#logo-button')?.textContent).toContain('Quality of Life');
//     });
// });
