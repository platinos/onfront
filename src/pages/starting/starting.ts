import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserData } from '../../providers/user-data';


@IonicPage()
@Component({
  selector: 'page-starting',
  templateUrl: 'starting.html',
})
export class StartingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private user: UserData) {
  }

  loadHomePage(){
    this.navCtrl.setRoot('TabsPage');
  }
  authUser() {
    this.user.hasLoggedIn().then((loggedIn)=>{
      if (loggedIn)
        this.loadHomePage();
      else
        this.navCtrl.push('SignupPage');
    });
    
  }

}
