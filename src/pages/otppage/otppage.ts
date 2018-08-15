import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';


@IonicPage()
@Component({
  selector: 'page-otppage',
  templateUrl: 'otppage.html',
})
export class OtppagePage {
  flag=0;
  OTP:number;
  phoneNumber;
  dummyData:any;
  replyMsg: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rp: RestProvider) {
    this.phoneNumber = this.navParams.get("phoneNo");
    this.GenOTP();
    
  }

  ionViewDidLoad() {
   
    // if(this.phoneNumber !== undefined) this.GenOTP();
   
  }
  

  GenOTP(): void {
    if(undefined !== this.phoneNumber){
    this.rp.sendOtp(this.phoneNumber).then(data=>{
      console.log(data);
      this.dummyData = data;
      if (this.dummyData.type === "success"){
        // this.replyMsg =   "OTP Sent to "+ this.phoneNumber;
        this.flag = 1;
      }
      else{
        this.replyMsg = "An error occured. Please try again later."
      }
    }).catch(err=>{
      console.log(err); 
    });
   }
   else{
     console.log("phone no not set.");
     
   }
}
  verOTP(): void {
  let
   otp: any = this.OTP;
   if(otp){
console.log("verifying");

     if (undefined !== this.phoneNumber) {
    this.rp.verifyOtp( this.phoneNumber, otp).then(data=>{
      console.log(data);
      //Check if success.
      let verificationResult:any = data;
      verificationResult = verificationResult.type;
      if (verificationResult ==="success")
        this.navCtrl.push("CreateprofilePage", { 'phoneNo': this.phoneNumber});
      else
        this.replyMsg = "Incorrect OTP. Try Again."
    }).catch(err=>{
      console.log(err);
    });
    
     } 
     else {
       console.log("phone no not set.");
       //this.replyMsg = "Incorrect OTP. Try Again."

     }
  }
}

}
