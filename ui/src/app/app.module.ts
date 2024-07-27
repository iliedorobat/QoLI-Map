import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {NgModule} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

import {provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule, TranslatePipe} from '@ngx-translate/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AtlasComponent} from './views/atlas/atlas.component';
import {BaseFilter} from '@/app/shared/filter';
import {SidebarComponent} from '@/app/views/sidebar/sidebar.component';

// AoT requires an exported function for factories: https://github.com/ngx-translate/core
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        TranslateModule.forRoot({
            defaultLanguage: 'en-US',
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
        MatDialogModule,
        MatDrawer,
        MatDrawerContent,
        MatDrawerContainer,
        SidebarComponent,
    ],
    exports: [TranslateModule],
    providers: [
        BaseFilter,
        provideAnimationsAsync(),
        provideCharts(withDefaultRegisterables()),
        provideHttpClient(withInterceptorsFromDi()),
        TranslatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
