import { Injectable } from '@angular/core';
import { Events, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';

export type User = {
  userId: string,
  name: string,
  phone: string,
  pic?: string,
};

@Injectable()
export class UserData {
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public events: Events,
    public storage: Storage,
    public app: App,

  ) {}

  login(user: User): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUser(user);
    this.events.publish('user:login');
  }

  signup(user: User): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUser(user);
    this.events.publish('user:signup');
  }

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.storage.remove('phone');
    this.events.publish('user:logout');
  }

  setUser(user: User): void {
    this.storage.set('userId', user.userId);
    this.storage.set('username', user.name);
    this.storage.set('phone', user.phone);
    this.storage.set('pic', user.pic);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  getUserId(): Promise<string> {
    return this.storage.get('userId').then((value) => {
      return value;
    });
  }

  getPhone(): Promise<string> {
    return this.storage.get('phone').then((value) => {
      return value;
    });
  }

  getPic(): Promise<string> {
    return this.storage.get('pic').then((value) => {
      return value;
    });
  }

  getUser(): Promise<User> {
    return Promise.all([
      this.getUserId(),
      this.getUsername(),
      this.getPhone(),
      this.getPic(),
    ]).then(([userId, name, phone, pic]) => ({ userId, name, phone, pic }));
  }

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }
}
