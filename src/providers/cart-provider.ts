import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

//providers
import {Data} from "./data";
import {Toast} from "./toast";

@Injectable()
export class CartProvider {
  prodsInCart = [];
  flag: number = 1;

  constructor(
      public http: Http,
      public storage: Storage,
      public data: Data,
      public toast: Toast
  ) {
    console.log('Hello CartProvider Provider');
    this.http = http;
  }

  addItem(id, qty){
    console.log(id + " " + qty + " cart provider");
    this.flag = 1;
    for(let i=0;i<this.prodsInCart.length;i++) {
      if(this.prodsInCart[i].id == id){
        this.flag = 0;
        break;
      }
    }
  //  console.log(this.prodsInCart.length)
  //  console.log(this.flag);
    if(this.flag) {
    this.prodsInCart.push({
      id: id,
      qty: qty
    });
    this.toast.productAdded();
  }
  else
  {
    this.toast.productPresent();
  }
  
  }

  getItems(){
    let items=[];
    for(let i=1; i<=this.prodsInCart.length; i++){
      this.storage.get(i.toString()).then((val) => {
        items.push(val);
      });
    }
    console.log(items);
    return items;
  }

  removeItem(id){
    let index = -1;
    for(let i=0; i<this.prodsInCart.length; i++){
      index = this.prodsInCart.indexOf(id);
    }
  }

}
