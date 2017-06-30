import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Login } from '../login/login';
import { CartProvider } from '../../providers/cart-provider';
import { HomePage } from '../home/home';
import {Toast} from "../../providers/toast";
import { ChangeAddressPage } from '../change-address/change-address';

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
addr1: string;
addr2: string;
city: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public authService: AuthServiceProvider,
              public cartProvider: CartProvider,
              public toast: Toast) {
                this.addr1 = this.authService.user.get('addr1','');
                this.addr2 = this.authService.user.get('addr2','');
                this.city = this.authService.user.get('city','');
                if(!this.authService.auth.isAuthenticated()) {
                  this.toast.presentLoading();
                  this.navCtrl.push(Login);
                }
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
  }

  ionViewWillEnter() {
    this.addr1 = this.authService.user.get('addr1','');
    this.addr2 = this.authService.user.get('addr2','');
    this.city = this.authService.user.get('city','');
  } 

    ionViewWillLeave() {
      if(this.authService.refresh) {
         if(this.authService.checkAddress) {
           this.authService.checkAddress = false;
           this.navCtrl.setRoot(HomePage);
         }   
      }
    }

  changeAddress() {
    this.authService.refresh = false;
    this.navCtrl.push(ChangeAddressPage);
  }

  onCartClick() {
    if(this.authService.auth.isAuthenticated()) {
    this.cartProvider.saveOrder();
    this.toast.orderConfirmed();
    this.cartProvider.prodsInCart = [];
    this.authService.checkAddress = false;
    this.authService.checkHome = false;
    this.navCtrl.setRoot(HomePage);
    }
    else {
    this.toast.errorMessage('Please login to confirm');
    }
    
  }

  goToSignUp() {
    console.log('SignUp Page..');
  }

}
