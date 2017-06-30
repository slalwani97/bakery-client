import { Component } from '@angular/core';
import { ViewController, NavController, LoadingController } from 'ionic-angular';

//providers
import {CartProvider} from "../providers/cart-provider";
import {Data} from "../providers/data";
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { AddressPage } from '../pages/address/address';
import {Toast} from "../providers/toast";


@Component({
    templateUrl: 'cart.html'
})
export class Cart {
    products= [];
    idsQtis;
    total:number= 0;
    constructor(
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public cartProvider: CartProvider,
        public data: Data,
        public authService: AuthServiceProvider,
        public loadingCtrl: LoadingController,
        public toast: Toast
               ) {
                  this.idsQtis = this.cartProvider.prodsInCart;
                  if(this.idsQtis.length){
                    for(let i=0; i<this.idsQtis.length; i++){
                    this.products.push(this.data.getProductById(this.idsQtis[i].productId));
                    this.total += (this.products[i].price - 0) * (this.idsQtis[i].quantityRequired - 0);
                    }
                  } else {
                     // console.log('items is empty');
                  }
    }

    increaseItem(i){
        if(this.products[i].quantity > this.cartProvider.prodsInCart[i].quantityRequired) {
            this.cartProvider.prodsInCart[i].quantityRequired++;
            this.total += this.products[i].price; 
        }
        else {
            let err = 'Only ' + this.products[i].quantity + ' left in Stock';
            this.toast.errorMessage(err);
        }
    }

    decreaseItem(i){
        if(this.cartProvider.prodsInCart[i].quantityRequired > 1) {
            this.cartProvider.prodsInCart[i].quantityRequired--;
            this.total -= this.products[i].price;
        }
    }

    removeItem(i){
         this.total -= ( this.products[i].price * this.idsQtis[i].quantityRequired );
         this.cartProvider.prodsInCart.splice(i, 1);
         this.products.splice(i, 1);
         if(!this.cartProvider.prodsInCart.length){
             let popover = this.viewCtrl;
             setTimeout(function () {
               popover.dismiss();
             }, 300); 
          } 
     }

     close() {
         this.viewCtrl.dismiss();
     }

    goToCheckout(){       
       this.navCtrl.push(AddressPage);
    }
}
