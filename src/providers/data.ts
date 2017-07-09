import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Transfer, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';


@Injectable()
export class Data {
  api: string = 'http://localhost:8090/';
  products;
  orders;
  loggedIn:boolean = false;
  date: Date;
  
  constructor(
    public http: Http,
    private transfer: Transfer,
    private file: File
    ) {
    this.http = http;
  }
  
  getProducts(){
    //const fileTransfer: TransferObject = this.transfer.create();
    if (this.products) {
      return Promise.resolve(this.products);
    }

    return new Promise(resolve => {
      this.http.get(this.api + "products")
        .map(res => res.json())
        .subscribe(data => {
          this.products = data;
          /**for(let p of data){
            fileTransfer.download(this.api + "products" + "/" + p.thumbnail, this.file.dataDirectory + p.thumbnail).then((entry) => {
            console.log('download complete: ' + entry.toURL());
          }, (error) => {
            console.error(error);
          });
          }
          */ 
          resolve(this.products);
        });
    });
  }

  getProductById(id){
    //console.log("by id from data provider " + id);
    for(let p of this.products){
      if(p.id == id)
        return p;
    }
    return null;
  }

  getOrders(userId) {
    if (this.orders) {
      return Promise.resolve(this.orders);
    }
    return new Promise(resolve => {
      this.http.get(this.api + "orders/" + userId)
        .map(res => res.json())
        .subscribe(data => {
          if(data == null) {
            this.orders = [];
          }
          else {
            this.orders = data;
          }
          resolve(this.orders);
        });
    });

  }
}
