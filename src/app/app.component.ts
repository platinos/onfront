import { Component, ViewChild } from '@angular/core';
import { Platform, Events, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { LandingPage } from "../pages/landing/landing";
import * as firebase from 'firebase';
import { FCM } from '@ionic-native/fcm';



const config = {
  apiKey: "AIzaSyB1vM874WUL05RPjgZyddkrL102K4AdIRU",
  authDomain: "uplifted-sol-213610.firebaseapp.com",
  databaseURL: "https://uplifted-sol-213610.firebaseio.com",
  projectId: "uplifted-sol-213610",
  storageBucket: "uplifted-sol-213610.appspot.com",
  messagingSenderId: "837548497206"
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
    public events: Events,
    public fcm: FCM) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

        //Notifications
        fcm.subscribeToTopic('all');
        fcm.getToken().then(token => {
          console.log(token);
        })
        fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            console.log("Received in background");
          } else {
            console.log("Received in foreground");
          };
        })
        fcm.onTokenRefresh().subscribe(token => {
          console.log(token);
        });
        
      




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
      this.nav.setRoot('TabsPage');
    });

    this.events.subscribe('user:logout', () => {
      //this.enableMenu(false);
      this.nav.setRoot('StartingPage');
      //this.app.getRootNav().setRoot(LoginPage);
    });
  }

  
}

