import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase'; 

/**
 * Generated class for the OtppagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otppage',
  templateUrl: 'otppage.html',
})
export class OtppagePage {
  public flag=0;
  public OTP=0;
  public phoneNumber;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.phoneNumber = this.navParams.get("phoneNo");
    console.log(this.phoneNumber);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtppagePage');
    
  }
  

  GenOTP(): void {
    firebase.auth().settings.appVerificationDisabledForTesting = true;
    (<any>window).recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible'
      // 'callback': function(response) {
      //   // reCAPTCHA solved, allow signInWithPhoneNumber.
      //   onSignInSubmit();
      //this.signInWithPhoneNumber();
      }
    );
    var phoneNumber = "+917797012105";  
    var appVerifier = (<any>window).recaptchaVerifier;
    console.log("hello" + this.phoneNumber);
firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      console.log(confirmationResult);
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      confirmationResult.confirm("123456");
      (<any>window).confirmationResult = confirmationResult;
    }).catch(function (error) {
      console.log(error);
      // Error; SMS not sent
      // ...
    });
  this.flag=1;
  }
  verOTP(): void {
  let
   otp: any= this.OTP;
   if(otp){
    this.navCtrl.push("RegisterPage");
   }
  }
}
