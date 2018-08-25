import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {RestProvider} from '../rest/rest'
import { UserData } from "../user-data";
import { LoadingController } from 'ionic-angular';
import { ProfileProvider } from "../profileProvider";

@Injectable()
export class AuthenticationProvider {

  dataList: any;
  dataResponse:any;
  dataError:any;
  profileData: any;
  constructor(public http: HttpClient, 
    public rs: RestProvider, 
    public user: UserData, 
    public loadingCtrl: LoadingController,
    public profile: ProfileProvider) {

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
        this.rs.getData('profile/' + this.dataResponse._id).then(data => {
            let profileDataResponse:any;
            profileDataResponse = data;
            profileDataResponse = profileDataResponse.response;
          let profileData: {
            address: string,
            status: string,
            about: string,
            dob: string,
              }
          profileData.about = profileDataResponse.about;
          profileData.address = profileDataResponse.address;
          profileData.dob = profileDataResponse.dob;
          profileData.status = profileDataResponse.status;
          this.profile.setProfile(profileData);
          this.user.login({ name: this.dataResponse.name, userId: this.dataResponse._id, phone: this.dataResponse.phone, pic: this.dataResponse.ImageUrl, email: this.dataResponse.email });

        });
        
      }
      else{
        loading.setContent("Could not log in. check your credentials");
        setTimeout(() => {
          loading.dismiss();
        }, 2000);

      }
    });

  }
  signup(name, uname, pass, ImageUrl, email){
      let loading = this.loadingCtrl.create({
        content: 'Creating your account... Please wait.'
      });

      loading.present();

      this.rs.addData("users/signup", { 'name':name ,'phone': uname, 'password': pass, "email":email, "ImageUrl":ImageUrl }).then(data => {
        this.dataList = data;
        this.dataError = this.dataList.error;
        if (this.dataError === undefined || this.dataError === null) {
          this.dataResponse = this.dataList.response;

          this.user.signup({
            name: this.dataResponse[0].name,
            userId: this.dataResponse[0]._id,
            phone: this.dataResponse[0].phone,
            email: this.dataResponse[0].email,
            });
        }
      });
      loading.dismiss();



  }
  logout(){
    
    this.user.logout();
  }




}
