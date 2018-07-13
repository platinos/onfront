import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
      this.http.post(this.apiUrl +endpoint, data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  putData(endpoint, data) {
    
    
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + endpoint, data)
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

}
