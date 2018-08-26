import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Content, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { UserData } from '../../providers/user-data';
import { RestProvider } from '../../providers/rest/rest';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageuploaderProvider } from '../../providers/imageuploader/imageuploader';

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
  amount: any;
  chatImage: any;
  type= "text";
  recieverImage:any;

  @ViewChild(Content) contentArea: Content;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserData,
    public restProvider: RestProvider,
    private sanitizer: DomSanitizer,
    private _IMG: ImageuploaderProvider) {
    this.reciever = this.navParams.get('friendId');
    this.newmessage = this.navParams.get('message');
    this.amount = this.navParams.get('amount');

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
            this.recieverImage = this.temp.response[0].ImageUrl;
            this.ref1 = firebase.database().ref(this.sender + '-' + this.reciever);
            this.ref2 = firebase.database().ref(this.reciever + '-' + this.sender);
            this.ready = true;
            console.log(this.sender + '-' + this.reciever);
            
            this.ref1.on('value', data => {
              let tmp = [];
              //console.log(data.val());
              
              data.forEach(data => {
                tmp.push({
                  key: data.key,
                  text: data.val().text,
                  reciever: data.val().reciever,
                  sender: data.val().sender,
                  from: data.val().from,
                  to: data.val().to,
                  created: data.val().created,
                  type: data.val().type,
                  imageUrl: data.val().imageUrl || undefined,
                  amount: data.val().amount
                })
              });
              this.messagesList = tmp;
              setTimeout(() => { 
                try {
                  this.contentArea.scrollToBottom();
                }
                catch (err)
              {
                console.log(err);
                
              }
                
                 }, 200);
              
            });
          });
      });

    });
    
  
  }
  send() {
    // add new data to firebase
    if (this.newmessage == "Hey! Send "+this.amount+" bitcoins to my wallet."){
    this.ref1.push(
      { sender: this.senderName, text: this.newmessage, type: "transfer", amount: this.amount, from: this.sender, created: new Date().toDateString() }
      );
    this.ref2.push(
      { sender: this.senderName, text: this.newmessage, type: "transfer", amount: this.amount, from: this.sender, created: new Date().toDateString() }
    );
  }
  else if(this.type === "image"){

      this.uploadImage(this.chatImage).then((snapshot: any) => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          let uploadedImage: any = downloadURL;
          console.log(uploadedImage);
          this.ref1.push(
            { sender: this.senderName, text: this.newmessage, type: "image", imageUrl: downloadURL, from: this.sender, created: new Date().toDateString() }
          );
          this.ref2.push(
            { sender: this.senderName, text: this.newmessage, type: "image", imageUrl: downloadURL, from: this.sender, created: new Date().toDateString() }
          );
          this.type = "text";
          this.chatImage = undefined;
        });
      });

      
  }
  else {
      this.ref1.push(
        { sender: this.senderName, text: this.newmessage, from: this.sender, created: new Date().toDateString() }
      );
      this.ref2.push(
        { sender: this.senderName, text: this.newmessage, from: this.sender, created: new Date().toDateString() }
      );
    }
    this.newmessage = "";
    //this.contentArea.scrollToBottom();
  }
  openPage(page, data){
    console.log("clicked this with data "+data);
    
    this.navCtrl.push(page, {'userId': data});
  }
  attach(){
    this.selectImage();
    this.type="image";
    
  }

  uploadImage(imageString): Promise<any> {
    let image: string = 'chat-' + new Date().getTime() + '.jpg',
      storageRef: any,
      parseUpload: any;

    return new Promise((resolve, reject) => {
      storageRef = firebase.storage().ref('chats/' + image);
      parseUpload = storageRef.putString(imageString, 'data_url');
      parseUpload.on('state_changed', (_snapshot) => {
        // console.log('snapshot progess ');
        // console.log(_snapshot);
      },
        (_err) => {
          reject(_err);
        },
        (success) => {
          resolve(parseUpload.snapshot);
        });
    });
  }

  selectImage(){
     this._IMG.selectImage()
      .then((data) => {
        this.chatImage = data;
      });

  }

  payAmount(amount){
    
    this.restProvider.getData('wallet/' + this.reciever).then(data => {
      console.log(data);
      let temp:any = data;
      if (temp.error === undefined) {
        let tempWalletId = temp.response.walletId;
        //console.log("Found wallet" + tempWalletId);
        
        this.restProvider.getData('wallet/tbtc/' + tempWalletId).then(data => {
          let tempWalletdata: any = data;
         
          let addressee = tempWalletdata.response.receiveAddress.address;
          //console.log("Found address " + addressee);
          console.log("Sending amount: " + amount + " to " + addressee);
          this.navCtrl.push('SendcoinPage', {'data': { 'amount': amount, 'destAddress':addressee }});

        });
      }

    });

    
    
    
    
  }
  


}
