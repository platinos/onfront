import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UserData } from '../../providers/user-data';
import { FormBuilder, FormGroup, Validators} from '../../../node_modules/@angular/forms';


@IonicPage()
@Component({
  selector: 'page-recievecoin',
  templateUrl: 'recievecoin.html',
})
export class RecievecoinPage {
  walletid: any;
  walletData: any;
  qrImage: any;
  receiveAddress:any;
  public form: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public user: UserData,
    private alertCtrl: AlertController,
    private rp: RestProvider,
    private _FB: FormBuilder,
    private modalCtrl: ModalController) {

    this.walletid = this.navParams.get('data');
    this.qrImage =  'assets/imgs/loading.gif';
    console.log(this.walletid);
    console.log(this.qrImage);
    this.form = this._FB.group({
      'amount': ['', Validators.required]});
  }
  ionViewDidLoad() {
    this.getWallet();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  getWallet() {
    this.rp.getData('wallet/btc/' + this.walletid).then(data => {
      this.walletData = data;
      this.walletData = this.walletData.response;
      this.receiveAddress = this.walletData.receiveAddress.address;
      //console.log("address:  "+this.receiveAddress);
      
      this.qrImage = 'https://api.qrserver.com/v1/create-qr-code/?data=' + this.receiveAddress;
     //console.log(this.walletData);
    });
  }

  requestPayment(){
    let amount: any = this.form.controls['amount'].value;
    if(amount !== '')
      this.presentModal();
        //console.log(amount + address);
        
  }

  presentModal(){
    let senders = this.modalCtrl.create('SenderslistPage');
    senders.present();
    senders.onDidDismiss(data=>{
      if(data !== undefined){
        data = { "friendId": data.friendId, 'message': "Hey! Send " + this.form.controls['amount'].value+" bitcoins to my wallet.", "amount": this.form.controls['amount'].value, "address": this.receiveAddress}
          this.navCtrl.push('ChatscreenPage', data);
      }
       
        
    });
  }
}
