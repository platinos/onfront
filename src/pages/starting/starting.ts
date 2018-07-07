import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-starting',
  templateUrl: 'starting.html',
})
export class StartingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  loadHomePage(){
    this.navCtrl.setRoot('TabsPage');
  }
}
