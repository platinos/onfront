import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Content, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { UserData } from '../../providers/user-data';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-chatscreen',
  templateUrl: 'chatscreen.html',
})
export class ChatscreenPage {

  ref1;
  ref2;
  name;
  newmessage;
  messagesList;
  sender;
  senderName;
  reciever;
  recieverName;
  temp: any;
  ready = false;

  @ViewChild(Content) contentArea: Content;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserData,
    public restProvider: RestProvider) {
    this.reciever = this.navParams.get('friendId');
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
    
    
    console.log(this.reciever);
    
    this.user.getUserId().then((userId) => {
      this.sender = userId;
      this.user.getUsername().then((username) => {
        this.senderName = username;
        // console.log(this.sender);
        this.restProvider.getData('users/' + this.reciever)
          .then(data => {
            this.temp = data;
            this.recieverName = this.temp.response[0].name;
            this.ref1 = firebase.database().ref(this.sender + '-' + this.reciever);
            this.ref2 = firebase.database().ref(this.reciever + '-' + this.sender);
            this.ready = true;
            console.log(this.sender + '-' + this.reciever);
            
            this.ref1.on('value', data => {
              let tmp = [];
              data.forEach(data => {
                tmp.push({
                  key: data.key,
                  text: data.val().text,
                  reciever: data.val().reciever,
                  sender: data.val().sender,
                  from: data.val().from,
                  to: data.val().to,
                  created: data.val().created
                })
              });
              this.messagesList = tmp;
              setTimeout(() => { this.contentArea.scrollToBottom(); }, 200);
              
            });
          });
      });

    });
    
  
  }
  send() {
    // add new data to firebase
    this.ref1.push(
      { sender: this.senderName, text: this.newmessage, from: this.sender, created: new Date().toDateString() }
      );
    this.ref2.push(
      { sender: this.senderName, text: this.newmessage, from: this.sender, created: new Date().toDateString() }
    );
    this.newmessage = "";
    //this.contentArea.scrollToBottom();
  }

  


}
