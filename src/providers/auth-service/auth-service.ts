import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Auth, User } from '@ionic/cloud-angular';


@Injectable()
export class AuthServiceProvider {
  checkSignUp: boolean = true;
  checkAddress: boolean = false;
  checkHome: boolean = false;
  refresh: boolean = true;
  constructor(public http: Http,
              public auth: Auth,
              public user: User,
             ) {
    if(this.auth.isAuthenticated()) {
      this.user.load();
    }
   this.checkSignUp = true;
  }

  setDetails(data) {
    this.user.set('phoneNumber', data.phoneNumber );
    this.user.set('addr1', data.addr1 );
    this.user.set('addr2', data.addr2 );
    this.user.set('city', data.city );
    this.user.set('postalCode', data.postalCode);
    this.user.save();
  }

  changeDetails(data) {
    this.user.set('addr1', data.addr1);
    this.user.set('addr2', data.addr2);
    this.user.save();
  }

}
