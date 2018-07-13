import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { LandingPage } from "../pages/landing/landing";
import * as firebase from 'firebase';
import { UserData } from '../providers/user-data';



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

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }

  
}

