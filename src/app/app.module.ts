import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { Product } from '../components/product/product';

//pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CheckoutPage } from '../pages/checkout/checkout';
import {NoInternet} from "../pages/no-internet/no-internet";
import { Cart } from '../popovers/cart';
import { ProductDetails } from '../pages/product-details/product-details';
import { Offers } from '../pages/offers/offers';

//Providers
import { Data } from '../providers/data';
import { Helpers } from '../providers/helpers';
import { CartProvider } from '../providers/cart-provider';
import { Toast } from '../providers/toast';

//Cordova plugins
import { Network } from '@ionic-native/network';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { Storage } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';

export function provideStorage() {
  return new Storage({
    name: 'cartStorage',
    storeName: 'items',
    driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
  });// optional config);
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CheckoutPage,
    NoInternet,
    Cart,
    ProductDetails,
    Offers,
    Product
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CheckoutPage,
    NoInternet,
    Cart,
    ProductDetails,
    Offers
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    Data,
    Helpers,
    File,
    Transfer,
    CartProvider,
    Toast,
    SQLite,
    { provide: Storage, useFactory: provideStorage },
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
