import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { KuenstlerPage } from '../pages/kuenstler/kuenstler';
import { ProgrammPage } from '../pages/programm/programm';
import { FaqPage } from '../pages/faq/faq';
import { NewsPage } from '../pages/news/news';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OrderByPipe } from '../pipes/order-by/order-by';
import { FormatTimeHhmmPipe } from '../pipes/format-time-hhmm/format-time-hhmm';
import { FormatOfNewsDatePipe } from '../pipes/format-of-news-date/format-of-news-date';
import { OpenFlairActServiceProvider } from '../providers/open-flair-act-service/open-flair-act-service';
import { OpenFlairNewsServiceProvider } from '../providers/open-flair-news-service/open-flair-news-service';
import { OpenFlairFaqServiceProvider } from '../providers/open-flair-faq-service/open-flair-faq-service';

@NgModule({
  declarations: [
    MyApp,
    FaqPage,
    ProgrammPage,
    KuenstlerPage,
    NewsPage,
    TabsPage,
    OrderByPipe,
    FormatOfNewsDatePipe,
    FormatTimeHhmmPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FaqPage,
    ProgrammPage,
    KuenstlerPage,
    NewsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OpenFlairActServiceProvider,
    OpenFlairNewsServiceProvider,
    OpenFlairFaqServiceProvider
  ]
})
export class AppModule {}
