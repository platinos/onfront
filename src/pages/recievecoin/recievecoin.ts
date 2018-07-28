import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UserData } from '../../providers/user-data';

/**
 * Generated class for the RecievecoinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recievecoin',
  templateUrl: 'recievecoin.html',
})
export class RecievecoinPage {
  walletid: any;
  walletData: any;
  qrImage: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public user: UserData,
    private alertCtrl: AlertController,
    private rp: RestProvider) {

    this.walletid = this.navParams.get('data');
    this.qrImage =  'https://api.qrserver.com/v1/create-qr-code/?data=' + this.walletid;
    console.log(this.walletid);
    console.log(this.qrImage);
    
    
  }


  ionViewDidLoad() {

    this.getWallet();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  getWallet() {
    this.rp.getData('wallet/tbtc/' + this.walletid).then(data => {
      this.walletData = data;
     console.log(this.walletData);
    });
  }

}
