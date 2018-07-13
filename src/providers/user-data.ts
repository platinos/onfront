import { Injectable } from '@angular/core';
import { Events, App} from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public events: Events,
    public storage: Storage,
    public app: App,
    
  ) {}


  login(userData: any): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(userData.username, userData.phone, userData.pic);
    this.events.publish('user:login');
  };

  signup(username: string, phone: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username, phone, '');
    this.events.publish('user:signup');
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.storage.remove('phone');
    this.events.publish('user:logout');
  };

  setUsername(username: string, phone: string, pic: string): void {
    this.storage.set('username', username);
    this.storage.set('phone', phone);
    this.storage.set('pic', pic);
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };
  getPhone(): Promise<string> {
    return this.storage.get('phone').then((value) => {
      return value;
    });
  };
  getPic(): Promise<string> {
    return this.storage.get('pic').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
