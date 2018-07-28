import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



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
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public user:UserData,
    private _FB: FormBuilder,
    private rp: RestProvider,
    private alertCtrl: AlertController) {
      this.form = this._FB.group({
        'amount': ['', Validators.required],
        'pass': ['', Validators.required],
        'dest': ['', Validators.required]});
      this.person = { name:"" , phone: "", userId: ""};
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
      this.rp.getData('wallet/tbtc/' + this.walletid).then(data1 => {
        this.balancedata = data1;
        this.balance = this.balancedata.response.balance;
        console.log(this.balance);
      });
    });
  }
  sendCoin(){
    let
      dest: any = this.form.controls['dest'].value,
      pass: any = this.form.controls['pass'].value,
      amount: any = parseInt(this.form.controls['amount'].value);
    let payLoad: any = {
      "walletId": this.walletid,
      "destAddress": dest,
      "passphrase": pass,
      "amount": amount
    };
    console.log(payLoad);
    
          if(this.balance < amount){
            this.presentAlert();
          }
          else{
            this.rp.addData('wallet/makeTransaction/type', payLoad).then(data => {                
                console.log(data);
                let temp:any = data;
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
      subTitle: 'Transfered '+payLoad.amount +' successfully.' ,
      buttons: ['Dismiss']
    });
    this.form.reset();
    alert.present();
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
    let alert = this.alertCtrl.create({
      title: 'choose a recipient',
    
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Next',
          handler: data => {
            console.log(data);
            this.setDestination(data);
          }
        }
      ]
    });
    this.allWallets.forEach((item, index) => {
      alert.addInput({ type: 'radio', label: item.userId.name, value: item.addresses[0].address });
      
    });
    

    alert.present();
  }
  setDestination(destId){
        this.form.controls['dest'].setValue(destId);
  }
}
