import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, ActionSheetController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
@IonicPage()
@Component({
  selector: 'page-sendcoin',
  templateUrl: 'sendcoin.html',
})
export class SendcoinPage {
  public form: FormGroup;
  public person: { name: string, phone: string, userId: string};
  walletData:any;
  balancedata:any;
  walletid:any;
  balance:any;
  allWallets:any;
  recipient: string;
  qrText: string;
  coins: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public user:UserData,
    private _FB: FormBuilder,
    private rp: RestProvider,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private qrScanner: QRScanner,
    private actionSheetCtrl: ActionSheetController) {
      this.form = this._FB.group({
        'amount': ['', Validators.required],
        'pass': ['', Validators.required],
        'dest': ['', Validators.required],
        'coins': ['', Validators.required]});
      this.person = { name:"" , phone: "", userId: ""};
      
      

  }

ionViewWillEnter(){
  let paramData = this.navParams.get('data');
  let amount = paramData.amount;
  let recipient = paramData.destAddress;
  console.log("got values: " + amount + recipient);

  this.form.controls['amount'].setValue(amount);
  this.form.controls['dest'].setValue(recipient);

  this.qrText = this.navParams.get("qrText") || undefined;
  if(this.qrText){
    console.log(this.qrText);
    
  }
  else console.log("Nothing came back");
  

}

  typeAddress() {
    const alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'label',
          placeholder: 'Enter Wallet Address',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => console.log('Cancel clicked'),
        },
        {
          text: 'Next',
          handler: (data) => {
            this.form.controls['dest'].setValue(data.label);
          },
        },
      ],
    });
    alert.present();
  }
  chooseRecipient(){
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Select Recipient',
      buttons: [
        {
          text: 'Choose from contacts',
          handler: () => {
            this.presentPrompt();
          },
        },
        {
          text: 'Scan QR',
          handler: () => {
            this.scan();
          }
        },
        {
          text: 'Type address',
          handler: () => {
            this.typeAddress();
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          },
        },
      ],
    });
    actionSheet.present();
  }

  ionViewDidLoad() {
    this.user.getPhone().then((phone) => { 
      this.person.phone = phone;
    });
    this.user.getUsername().then((userName) => {
      this.person.name = userName;
    });
    this.user.getUserId().then((userId) => {
      this.person.userId = userId;
      this.getWallet();
    });
    this.getAllWallets();

    
  }
  getAllWallets(){
    this.rp.getData('wallet/getWallets/all/v1/v2').then(data=>{
        this.allWallets = data;
        this.allWallets = this.allWallets.response;
    });
  }

  getWallet(){
    this.rp.getData('wallet/' + this.person.userId).then(data => {
      this.walletData = data;
      this.walletid = this.walletData.response.walletId;
      //if(this.walletid!=undefined){
      this.rp.getData('wallet/btc/' + this.walletid).then(data1 => {
        this.balancedata = data1;
        this.balance = this.balancedata.response.balance;
        console.log(this.balance);
      });
    });
  }
  sendCoin(){
    let sendingAlert = this.alertCtrl.create({
      title: 'Initiating Transfer',
      subTitle: '<img src="assets/imgs/loading.gif"><br>Please wait.'
    });
  
    sendingAlert.present();
    let
      dest:any = this.form.controls['dest'].value,
      pass:any = this.form.controls['pass'].value,
      amount:any = parseFloat(this.form.controls['amount'].value)*100000000;
    let payLoad: any = {
      "walletId": this.walletid,
      "destAddress": dest,
      "passphrase": pass,
      "amount": amount
    };
    console.log(payLoad);
    
          if(this.balance < amount){
            sendingAlert.dismiss();
            this.presentAlert();
          }
          else{
            this.rp.addData('wallet/makeTransaction/type', payLoad).then(data => {                
                console.log(data);
                let temp:any = data;
              sendingAlert.dismiss();
                if(temp.error===undefined)
                {
                  this.successAlert(payLoad);
                }
                else{
                  this.unsuccsessAlert(temp.error);
                }
              });
          }
  }

  unsuccsessAlert(err){
    let alert = this.alertCtrl.create({
      title: 'Transaction Failed',
      subTitle: err.result.error ,
      buttons: ['Dismiss']
    });
    this.form.reset();
    alert.present();
  }
  
  successAlert(payLoad){
    let alert = this.alertCtrl.create({
      title: 'Transaction Successful',
      subTitle: 'Transfered '+ (parseFloat(payLoad.amount)/100000000) +' successfully.' ,
      buttons: ['Dismiss']
    });
    this.form.reset();
    alert.present();
  }
  sendingAlert() {
    
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Low Balance',
      subTitle: 'Please Maintain the balance for transfer',
      buttons: ['Dismiss']
    });
    alert.present();
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }
  presentPrompt() {
    const senders = this.modalCtrl.create('SenderslistPage');
    senders.present();
    senders.onDidDismiss((data) => {
      if (data !== undefined) {

        this.rp.getData('wallet/' + data.friendId).then((data) => {
          console.log(data);
          const temp: any = data;
          if (temp.error === undefined) {
            const tempWalletId = temp.response.walletId;

            this.rp.getData('wallet/btc/' + tempWalletId).then((data) => {
              const tempWalletdata: any = data;

              const addressee = tempWalletdata.response.receiveAddress.address;
              console.log(`Sending to: ${addressee}`);

              //this.gotoPage('SendcoinPage', { destAddress: addressee });
              this.setDestination(addressee);
            });

          }
        });
      }
    });
  }
  setDestination(destId){
        this.form.controls['dest'].setValue(destId);
  
      }
      test: any;
  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      this.test = _params;
      resolve();
    });
  }
tempdata: any;
scan() {
  this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted


        // start scanning
        //window.document.querySelector('ion-app').classList.add('transparentBody');
        this.showCamera();
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {

          this.qrScanner.show();
          console.log('Scanned something', text);
          if (text.length > 10)
            this.qrText = text;
          this.form.controls['dest'].setValue(this.qrText);
          //this.viewCtrl.dismiss({ destAddress: text });
          this.qrScanner.hide(); // hide camera preview
          this.hideCamera();
          scanSub.unsubscribe(); // stop scanning
        });

      } else if (status.denied) {
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
        this.qrScanner.openSettings();
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => console.log('Error is:', e));
  }
  showCam: any = false
  private showCamera() {
    this.showCam = true;
    ((<any>window).document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }
  private hideCamera() {
    console.log("hiding");
    
    this.showCam = false;
    ((<any>window).document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

}
