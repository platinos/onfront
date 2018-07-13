import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
/**
 * Generated class for the ChatscreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatscreen',
  templateUrl: 'chatscreen.html',
})
export class ChatscreenPage {

  ref;
  name;
  newmessage;
  messagesList;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ref = firebase.database().ref('messages');
  }

  ionViewWillEnter() {
    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.transform = 'translateY(56px)';
      });
    } // end if
  }

  ionViewDidLeave() {
    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.transform = 'translateY(0)';
      });
    } // end if
  }
  ionViewDidLoad(){
    //reading data from firebase
    this.ref.on('value', data => {
      let tmp = [];
      data.forEach(data => {
        tmp.push({
          key: data.key,
          name: data.val().name,
          message: data.val().message
        })
      });
      this.messagesList = tmp;
    });
  }
  send() {
    // add new data to firebase
    this.ref.push({
      name: "Anu Bhardwaj",
      message: this.newmessage
    });
  }

  


}
