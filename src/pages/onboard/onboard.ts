import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";


@IonicPage()
@Component({
  selector: 'page-onboard',
  templateUrl: 'onboard.html',
})
export class OnboardPage {
  slides = [
    {
      title: "TRUSTED TOKENS",
      description: "Token investing with top trending asset backed tokens for a more just and sustainable world.",
      image: "http://www.sheqwallet.com/assets/img/SHEQ_about_1.png",
    },
    {
      title: "TRUSTED COMMUNITY",
      description: "Closed looped accounability of tips, transformative education, tools and more from women for women.",
      image: "http://www.sheqwallet.com/assets/img/SHEQ_about_2.png",
    },
    {
      title: "TRUSTED TRANSFERS",
      description: "Blockchain enabled smart contract based agreements to achieve more together than ever before.",
      image: "http://www.sheqwallet.com/assets/img/SHEQ_about_3.png",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    
  }

  gotoLogin() {
    this.navCtrl.setRoot('TabsPage').then(() => {
      this.storage.set('hasSeenTutorial', 'true');
    });
  }
}
