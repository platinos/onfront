import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Content, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { UserData } from '../../providers/user-data';

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
  sender;
  reciever;

  @ViewChild(Content) contentArea: Content;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserData) {
    this.ref = firebase.database().ref('messages');
    this.user.getUsername().then((userId) => {
      this.sender = userId;
      console.log(this.sender);
    });

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
          text: data.val().text,
          from: data.val().from,
          to: data.val().to,
          created: data.val().created
        })
      });
      this.messagesList = tmp;
      this.contentArea.scrollToBottom();
    });
    
  }
  send() {
    // add new data to firebase
    this.ref.push(
      { text: this.newmessage, from: this.sender, to: this.reciever, created: new Date() }
      );
    this.newmessage = "";
    this.contentArea.scrollToBottom();
  }

  


}
