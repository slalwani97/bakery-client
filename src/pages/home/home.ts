import { Component } from '@angular/core';
import { ViewController,PopoverController, NavController, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

//pages
import { ProductDetails } from '../product-details/product-details';
import { Cart } from '../../popovers/cart';
import { Login } from '../login/login';


//providers
import {Data} from "../../providers/data";
import {Helpers} from "../../providers/helpers";
import {NoInternet} from "../no-internet/no-internet";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import {CartProvider} from "../../providers/cart-provider";

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  nothing:boolean = false;
  searchTerm:string = '';
  filtredProducts = [];
  products = [];
  login: boolean;
  currentUserName: string;
  hideLogout: boolean = false;
  constructor(
    public popoverCtrl: PopoverController,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public data: Data,
    public helpers: Helpers,
    public network: Network,
    public authServcie: AuthServiceProvider,
    public cartProvider: CartProvider,
    public loadingCtrl: LoadingController
    ) {
      this.login = this.authServcie.auth.isAuthenticated();
      this.currentUserName = this.authServcie.user.details.name;
      let loading = this.loadingCtrl.create({
      content: 'Please wait...'
      });
      loading.present();
      this.data.getProducts()
      .then(prods => {
      this.products = prods;
      });
      loading.dismiss();
  }

  ionViewDidLoad(){
    this.network.onDisconnect().subscribe(() => {
    this.navCtrl.push(NoInternet);
    });
  }

  ionViewWillEnter() {
    if(this.authServcie.checkHome) {
      this.authServcie.checkHome = false;
      this.navCtrl.setRoot(HomePage);
    }
  }

  cartPopover(cartEvent){
    let popover = this.popoverCtrl.create(Cart);
    popover.present({
      ev: cartEvent
    });
    /**if(!this.cartProvider.prodsInCart.length) {
        setTimeout(function () {
        popover.dismiss();
      }, 1500);
    }*/
  }

  goToProductDetails(product){
    this.navCtrl.push(
      ProductDetails,{
        product : product
      }
    );
  }

  setFiltredProducts() {
      this.filtredProducts = this.searchTerm ? this.helpers.filterProducts(this.searchTerm, this.products) : [];
      this.nothing = this.helpers.filterProducts(this.searchTerm, this.products).length ? false : true;
      //console.log(this.filtredProducts);
  }

  clearFiltredProducts(){
    // console.log('cleared');
    this.filtredProducts = [];
  }

  /**public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
*/

   openHomePage() {
    this.navCtrl.setRoot(HomePage);
   }

   openOrders() {

   }

  openLoginPage() {
    this.navCtrl.setRoot(Login);
  }

  openAboutPage() {
    
  }

  logout() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();
    this.authServcie.auth.logout();
    this.authServcie.checkSignUp = true;
    this.navCtrl.setRoot(HomePage);
  }

}
