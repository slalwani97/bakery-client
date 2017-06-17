import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, NavParams, ToastController } from 'ionic-angular';

//pages
import { CheckoutPage } from '../checkout/checkout';
import { Cart } from '../../popovers/cart';
//import { Category } from '../category/category';

//providers
import { CartProvider } from '../../providers/cart-provider';
import {Data} from "../../providers/data";
import {Toast} from "../../providers/toast";


/**
 * Generated class for the ProductDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetails {
  product;
  //characteristics = [];
  qty:number = 1;
 
  upQty(){
    this.qty += 1;
  }
  downQty(){
    if(this.qty > 1)
      this.qty -= 1;
  }
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public popoverCtrl: PopoverController,
      public cartProvider: CartProvider,
      public data: Data,
      public toast: Toast
   //   public toastCtrl: ToastController
  ) {
    this.product = this.navParams.get('product');
   // this.characteristics = this.product.characteristics.split(';');
   // this.characteristics.pop();
   // console.log(this.characteristics);
  }
  /*toast = this.toastCtrl.create({
      message: 'Product was added successfully',
      duration: 2000,
      position: 'middle',
      closeButtonText: 'Close'
    }
  );*/

  addToCart(id, qty){
    this.cartProvider.addItem(id, qty);
    //this.toast.present();
    console.log(id + " " + qty);
    console.log(this.cartProvider.prodsInCart);
  }

  goToCheckout(){
    this.navCtrl.push(CheckoutPage);
  }

  cartPopover(cartEvent){
    let popover = this.popoverCtrl.create(Cart);
    popover.present({
      ev: cartEvent
    });
  }

  showAllCategories(){
/**    this.navCtrl.push(Category, {
      target: 'All Categories'
    });
  */
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetails');
  }

  

}
