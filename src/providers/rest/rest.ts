import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import querystring from 'querystring';

@Injectable()
export class RestProvider {
  apiUrl = 'http://35.194.226.60:3002/api/v1/';

  constructor(public http: HttpClient) {}

  request(method: String, endpoint: String, data: Object = {}) {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      this.http[method](this.apiUrl + endpoint, data).subscribe(
        res => resolve(res),
        err => reject(err));
    });
  }

  getData(endpoint: String, data: Object = {}) {
    const stringifiedData = querystring.stringify(data);
    return this.request('get', `${endpoint}?${stringifiedData}`);
  }

  addData(endpoint: String, data: Object = {}) {
    return this.request('post', endpoint, data);
  }

  putData(endpoint: String, data: Object = {}) {
    return this.request('post', endpoint, data);
  }

  deleteData(endpoint: String, data: Object = {}) {
    return this.request('post', endpoint, data);
  }
}
