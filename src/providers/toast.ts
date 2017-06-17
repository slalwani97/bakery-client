import { ToastController } from 'ionic-angular';
import {Injectable} from '@angular/core';

@Injectable()
export class Toast {
  constructor(public toastCtrl: ToastController) {
  }

  productAdded() {
    let toast = this.toastCtrl.create({
      message: 'Product added to Cart',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  productPresent() {
    let toast = this.toastCtrl.create({
      message: 'Product already in Cart',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
