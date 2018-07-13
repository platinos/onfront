import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CreatepostPage } from '../createpost/createpost';
import { RestProvider } from '../../providers/rest/rest';



@IonicPage()
@Component({
  selector: 'page-stories',
  templateUrl: 'stories.html',
})
export class StoriesPage {

  contentList: any;
  contents: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public restProvider: RestProvider) {
  }

  ionViewDidLoad() {
    this.getUsers();
  }
  presentCreateModal() {
    let createModal = this.modalCtrl.create(CreatepostPage);
    createModal.present();
  }

  getUsers() {
    this.restProvider.getData('content')
      .then(data => {
        this.contents = data;
        this.contentList = this.contents.response;
        console.log(this.contentList);
        

      });
  }
}
