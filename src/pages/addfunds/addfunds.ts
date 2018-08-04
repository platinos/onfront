import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the AddfundsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addfunds',
  templateUrl: 'addfunds.html',
})
export class AddfundsPage {

  address: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public rp: RestProvider
  ) {
    this.address = navParams.get('data');
    this.address = this.address.myaddress;
    console.log(this.address);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddfundsPage');
  }
  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Request Test Coins',
      inputs: [
        {
          name: 'amount',
          placeholder: 'Enter amount < 1 tbtc'
        }
      ],
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
            //to call api
            this.rp.addData('wallet/addcoinstowallet', {
              "myaddress": this.address,
              "amount": parseFloat(data.amount)*100000000
            }).then(data => {
              console.log(data);
              this.successAlert();
              
            })


          }
        }
      ]
    });
    alert.present();
  }
  successAlert() {
    let alert = this.alertCtrl.create({
      title: 'Transaction Successful',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
