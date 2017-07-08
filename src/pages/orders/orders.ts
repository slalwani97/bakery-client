import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Data} from "../../providers/data";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { OrderDetailsPage } from "../order-details/order-details"


/**
 * Generated class for the OrdersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  orders = [];
  loggedIn: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public data: Data,
              public authServcie: AuthServiceProvider
              ) {
                this.orders = this.data.orders;
                if(this.authServcie.auth.isAuthenticated()) {
                 this.loggedIn = this.authServcie.auth.isAuthenticated();
                }
  }

  goToDetails(order) {
    this.navCtrl.push(OrderDetailsPage, {
      order: order
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

}
