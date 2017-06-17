import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';

import { CheckoutPage } from '../pages/checkout/checkout';

//providers
import {CartProvider} from "../providers/cart-provider";
import {Data} from "../providers/data";

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
        public data: Data
    ) {
        this.idsQtis = this.cartProvider.prodsInCart;
        if(this.idsQtis.length){
            for(let i=0; i<this.idsQtis.length; i++){
                this.products.push(this.data.getProductById(this.idsQtis[i].id));
                this.products[i].quantity = this.idsQtis[i].qty;
                this.total += (this.products[i].productRate - 0) * (this.products[i].quantity - 0);
            }
        } else {
            console.log('items is empty');
        }
        console.log(this.products);
    }

    increaseItem(i){
        this.cartProvider.prodsInCart[i].qty++;
        this.products[i].quantity++;
        this.total += this.products[i].productRate; 
    }

    decreaseItem(i){
        if(this.products[i].quantity > 1){
            this.cartProvider.prodsInCart[i].qty--;
            this.products[i].quantity --;
            this.total -= this.products[i].productRate;
        }
    }

    removeItem(i){
        this.cartProvider.prodsInCart.splice(i, 1);
        this.products.splice(i, 1);
    }

    close(){
        this.viewCtrl.dismiss();
    }

    goToCheckout(){
        this.navCtrl.push(CheckoutPage);
    }
}
