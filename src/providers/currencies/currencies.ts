import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import querystring from "querystring";

@Injectable()
export class CurrenciesProvider {
  apiUrl = 'https://min-api.cryptocompare.com/data/';

  constructor(public http: HttpClient) {}

  request(endpoint: String, data: Object = {}) {
    const stringifiedData = querystring.stringify(data);
    return new Promise((resolve, reject) => this.http.get(
      `${this.apiUrl}${endpoint}?${stringifiedData}`,
      data,
    ).subscribe(
      res => resolve(res),
      err => reject(err)));
  }

  getHistory(currencyName: string, byHour: boolean, limit: number, aggregate: number) {
    return this.request(byHour ? 'histohour' : 'histoday', {
      limit,
      aggregate,
      fsym: currencyName,
      tsym: 'USD',
      e: 'CCCAGG',
    }).then((response: {Data: Object[]}) => {
      console.log('response', response);
      return response.Data;
    });
  }
}
