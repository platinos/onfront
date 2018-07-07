import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CreatepostPage } from '../createpost/createpost';



/**
 * Generated class for the StoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stories',
  templateUrl: 'stories.html',
})
export class StoriesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoriesPage');
  }
  presentCreateModal() {
    let createModal = this.modalCtrl.create(CreatepostPage);
    createModal.present();
  }

}
