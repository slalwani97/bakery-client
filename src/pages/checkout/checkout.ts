import { OnInit, Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the CheckoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
 // myForm: FormGroup;
  details = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder) {
     /* this.myForm = formBuilder.group({
      addr1: ['', Validators.required],
      phone: ['', Validators.compose([Validators.pattern('[0-9]{10}'), Validators.required])],
      addr2: [''],
      city: [''],
      postalCode: ['']
       }); 
   */}

 /* ngOnInit(): any {
    this.myForm = this.formBuilder.group({
      addr1: ['', Validators.required],
      phone: ['', Validators.compose([Validators.pattern('[0-9]{10}'), Validators.required])],
       });
  } */

 /* isValid(field: string) {
    let formField = this.myForm.find(field);
    return formField.valid || formField.pristine;
  } */

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  cartPopover(e) {

  }

  showAllCategories() {

  }

  logForm() {
    console.log(this.details);
  }

}
