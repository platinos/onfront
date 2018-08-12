import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { AuthenticationProvider } from "../../providers/authentication/authentication";
import { RestProvider } from '../../providers/rest/rest';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public form: FormGroup;
  public form2: FormGroup;
  public flag=0;
  validate = false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private _FB: FormBuilder,
    public restProvider: RestProvider,

    public auth: AuthenticationProvider) {
    this.form = this._FB.group({
      // 'name': ['', Validators.required],
      'phoneNo': ['', Validators.required],
      // 'confirmpassword': ['', Validators.required],
      // 'password': ['', Validators.required],

    });
    this.form2 = this._FB.group({
      // 'name': ['', Validators.required],
      'phoneNo': ['', Validators.required],
      // 'confirmpassword': ['', Validators.required],
      'password': ['', Validators.required],

    });
  }
  logIn(): void {
    let
      phoneNo: any = this.form2.controls['phoneNo'].value,
      password: any = this.form2.controls['password'].value;

    this.auth.login(phoneNo, password);

  }
  
  logIn2(): void {
    let
      // name: any = this.form.controls['name'].value,
      phoneNo: any = this.form.controls['phoneNo'].value
      
      // password: any = this.form.controls['password'].value,
      // confirmpassword: any = this.form.controls['confirmpassword'].value;
      // if(password === confirmpassword){
      //   this.auth.signup(name,phoneNo, password);
      // }
  }
  /* gotoPage(page, data:any = null) {
    if(data===null)
    this.navCtrl.push(page);
    else{
      console.log(data);
      
      this.navCtrl.push(page, {'data': data});
    }
  } */
  isregistered(): void {
    let
      No: any = this.form.controls['phoneNo'].value;
      this.restProvider.getData('users/phone/'+ No)
      .then(data => {
        var x:any = data;
         this.validate  = x.registered;
         console.log(this.validate);
         if(this.validate)
    {
      this.flag =1;
      console.log(this.validate);
    }
    else
    {
      this.navCtrl.push("OtppagePage", {'phoneNo' : No});
      
    }
      });
    


  }

  ionViewDidLoad() {console.log('ionViewDidLoad SignupPage');
  }
  gotoLogin(){
    this.navCtrl.push('LoginPage');
  }
}
