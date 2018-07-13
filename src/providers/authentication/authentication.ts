import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {RestProvider} from '../rest/rest'
import { UserData } from "../user-data";

@Injectable()
export class AuthenticationProvider {

  dataList: any; 
  dataResponse:any;
  constructor(public http: HttpClient, public rs: RestProvider, public user: UserData) {
   
  }

  login(uname, pass){
    this.rs.addData("users/login", { 'uname': uname, 'password': pass }).then(data => {
    });
  }
  signup(uname, pass){
    this.rs.addData("users/signup", { 'phone': uname, 'password': pass }).then(data => {
      this.dataList = data;
      this.dataResponse = this.dataList.response;
      this.user.signup(this.dataResponse[0]._id, this.dataResponse[0].phone);
    });
  }
  logout(){
    this.user.logout();
  }




}
