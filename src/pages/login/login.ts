import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
//import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public form: FormGroup;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _FB: FormBuilder,
  private auth: AuthenticationProvider) {
    this.form = this._FB.group({
      'phoneNo': ['', Validators.required],
      'password': ['', Validators.required]

    });
  }
  logIn(): void {
    let
      phoneNo: any = this.form.controls['phoneNo'].value,
      password: any = this.form.controls['password'].value;
    
    this.auth.login(phoneNo, password);
    
  }

  ionViewDidLoad() {
  }
  gotoLogin() {
    this.navCtrl.push('SignupPage');
  }

}
