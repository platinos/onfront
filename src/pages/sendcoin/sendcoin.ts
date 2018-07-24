import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


/**
 * Generated class for the SendcoinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public user:UserData,
    private _FB: FormBuilder,
    private rp: RestProvider,
    private alertCtrl: AlertController) {
      this.form = this._FB.group({
        'amount': ['', Validators.required],
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
    });

  }
  sendCoin(){
    let
      dest: any = this.form.controls['dest'].value,
      amount: any = this.form.controls['amount'].value;
      
    this.rp.getData('wallet/' + this.person.userId).then(data => {     
      this.walletData = data;
      this.walletid=this.walletData.response.walletId;
      //if(this.walletid!=undefined){
        this.rp.getData('wallet/tbtc/' + this.walletid).then(data1 =>{
          this.balancedata=data1;
          this.balance=this.balancedata.response.balance;
          console.log(this.balance)
          // if(this.balance<1){
          //   this.presentAlert()
          // }
          // else{
            this.rp.addData('wallet/makeTransaction/type', {
              "walletId": this.walletid,
              "destAddress": dest,          
              "amount": data}).then(data => {                
                console.log(data);
              })
          //}
          });
      //}
     
    });
    
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Low Balance',
      subTitle: 'Please Maintainthe balance for transfer',
      buttons: ['Dismiss']
    });
    alert.present();
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

}
