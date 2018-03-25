import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InMemoryDataService} from '../in-memory-data/in-memory-data.service';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { LogoutPage } from '../pages/logout/logout';
import { DepositPage } from '../pages/deposit/deposit';
import { BuyPage } from '../pages/buy/buy';
import { SellPage } from '../pages/sell/sell';
import { HistoryPage } from '../pages/history/history';
import { Environment } from '../common/global';
import {WebService} from '../common/webservice';
import {ReversePipe} from '../common/reverse.pipe';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AccountPage,
    LoginPage,
    RegisterPage,
    LogoutPage,
    DepositPage,
    BuyPage,
    SellPage,
    HistoryPage,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    Environment.production ? [] : HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AccountPage,
    LoginPage,
    RegisterPage,
    LogoutPage,
    DepositPage,
    BuyPage,
    SellPage,
    HistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WebService
  ]
})
export class AppModule {}
