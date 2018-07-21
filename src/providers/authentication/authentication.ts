import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {RestProvider} from '../rest/rest'
import { UserData } from "../user-data";
import { LoadingController } from 'ionic-angular';

@Injectable()
export class AuthenticationProvider {

  dataList: any; 
  dataResponse:any;
  dataError:any;
  constructor(public http: HttpClient, public rs: RestProvider, public user: UserData, public loadingCtrl: LoadingController) {
   
  }

  login(uname, pass){
    let loading = this.loadingCtrl.create({
      content: 'Logging you in... Please wait.'
    });

    loading.present();
    this.rs.addData("users/login", { 'uname': uname, 'password': pass }).then(data => {
      this.dataList = data;
      this.dataError = this.dataList.error;
      if (this.dataError === undefined || this.dataError === null){
      this.dataResponse = this.dataList.response;
        setTimeout(() => {
          loading.dismiss();
        }, 2000);
        this.user.login({ username: this.dataResponse[0].name, userId: this.dataResponse[0]._id, phone: this.dataResponse[0].phone });

      }
      else{
        loading.setContent("Could not log in. check your credentials");
        setTimeout(() => {
          loading.dismiss();
        }, 2000);

      }
    });
    
  }
  signup(name, uname, pass){
      let loading = this.loadingCtrl.create({
        content: 'Creating your account... Please wait.'
      });

      loading.present();

      // setTimeout(() => {
      //   loading.dismiss();
      // }, 5000);
      this.rs.addData("users/signup", { 'name':name ,'phone': uname, 'password': pass }).then(data => {
        this.dataList = data;
        this.dataError = this.dataList.error;
        if (this.dataError === undefined || this.dataError === null) {
          this.dataResponse = this.dataList.response;

          this.user.signup(this.dataResponse[0].name, this.dataResponse[0]._id, this.dataResponse[0].phone);
        }
      });
      loading.dismiss();

    
    
  }
  logout(){
    this.user.logout();
  }




}
