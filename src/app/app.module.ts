import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from './app.login.component';
import { MainPage } from './app.main.component';
import { KiiService } from './kii.service';

@NgModule({
    declarations: [
        MyApp,
        LoginPage,
        MainPage,
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        LoginPage,
        MainPage,
    ],
    providers: [{
        provide: ErrorHandler, useClass: IonicErrorHandler},
        KiiService,
    ]
})
export class AppModule {}
