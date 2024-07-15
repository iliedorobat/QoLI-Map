import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NgModule} from '@angular/core';

import {NgbActiveOffcanvas, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AtlasComponent} from './views/atlas/atlas.component';
import {BaseFilter} from '@/app/shared/filter';

// AoT requires an exported function for factories: https://github.com/ngx-translate/core
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),

        AppRoutingModule,
        AtlasComponent,
        BrowserModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        NgbModule,
    ],
    providers: [
        BaseFilter,
        NgbActiveOffcanvas,
        provideCharts(withDefaultRegisterables())
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
