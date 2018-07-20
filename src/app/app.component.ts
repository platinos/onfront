import { Component, ViewChild } from '@angular/core';
import { Platform, Events, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { LandingPage } from "../pages/landing/landing";
import * as firebase from 'firebase';



const config = {
  apiKey: "AIzaSyA-Yqf-gIlNn7x_EEmumaKkRzS9dRPe0zk",
  authDomain: "platinos-d1714.firebaseapp.com",
  databaseURL: "https://platinos-d1714.firebaseio.com",
  projectId: "platinos-d1714",
  storageBucket: "platinos-d1714.appspot.com",
  messagingSenderId: "261363919704"
};



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'StartingPage';
  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public events: Events,) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
    this.listenToLoginEvents();
  }
  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
    this.nav.setRoot('TabsPage');
    });

    this.events.subscribe('user:signup', () => {
      this.nav.setRoot('OnboardPage');
    });

    this.events.subscribe('user:logout', () => {
      //this.enableMenu(false);
      this.nav.setRoot('StartingPage');
      //this.app.getRootNav().setRoot(LoginPage);
    });
  }

  
}

