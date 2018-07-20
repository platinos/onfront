import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { AuthenticationProvider } from "../../providers/authentication/authentication";


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public form: FormGroup;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private _FB: FormBuilder,
    public auth: AuthenticationProvider) {
    this.form = this._FB.group({
      'name': ['', Validators.required],
      'phoneNo': ['', Validators.required],
      'confirmpassword': ['', Validators.required],
      'password': ['', Validators.required],

    });
  }
  logIn(): void {
    let
      name: any = this.form.controls['name'].value,
      phoneNo: any = this.form.controls['phoneNo'].value,
      password: any = this.form.controls['password'].value,
      confirmpassword: any = this.form.controls['confirmpassword'].value;
      if(password === confirmpassword){
        this.auth.signup(name,phoneNo, password);
      }
  }

  ionViewDidLoad() {console.log('ionViewDidLoad SignupPage');
  }
  gotoLogin(){
    this.navCtrl.push('LoginPage');
  }
}
