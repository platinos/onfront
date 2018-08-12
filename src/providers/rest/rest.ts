import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Accept': 'application/json',
    'content-type': 'application/json'
  })
};

@Injectable()
export class RestProvider {
  apiUrl = 'http://35.194.226.60:3002/api/v1/';
  constructor(public http: HttpClient) {

  }
  getData(endpoint) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + endpoint).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  addData(endpoint, data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + endpoint, data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  putData(endpoint, data) {


    return new Promise((resolve, reject) => {
      this.http.put(this.apiUrl + endpoint, data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }
  deleteData(endpoint, data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + endpoint, data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  sendOtp(phoneNo) {
    let authKey = "147351AegMLMB0q58e0e449";
    let msg = "Hey! Your OTP is 1234";
    let otp = 1234;
    let url = "http://control.msg91.com/api/sendotp.php?authkey=" + authKey + "&mobile=" + phoneNo + "&message=" + msg + "&otp=" + otp + "&sender=ELZIRE";

    return new Promise((resolve, reject) => {
      this.http.post(url, {}, httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  verifyOtp(phoneNo, otp) {
    let authKey = "147351AegMLMB0q58e0e449";
    let url = "http://control.msg91.com/api/verifyRequestOTP.php?authkey=" + authKey + "&mobile=" + phoneNo + "&otp=" + otp;

    return new Promise((resolve, reject) => {
      this.http.post(url, {}, httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
