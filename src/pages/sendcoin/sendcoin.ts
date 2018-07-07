import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the SendcoinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sendcoin',
  templateUrl: 'sendcoin.html',
})
export class SendcoinPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }


  ionViewDidLoad() {

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
