import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { UserData } from '../../providers/user-data';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-sendcoin',
  templateUrl: 'sendcoin.html',
})
export class SendcoinPage {
  public form: FormGroup;
  public person: { name: string, phone: string, userId: string};
  walletData: any;
  balancedata: any;
  walletid: any;
  balance: any;
  allWallets: any;

  recipient: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public user:UserData,
    private _FB: FormBuilder,
    private rp: RestProvider,
    private alertCtrl: AlertController,
    private qrScanner: QRScanner,
  ) {
    this.form = this._FB.group({
      amount: ['', Validators.required],
      pass: ['', Validators.required],
      dest: ['', Validators.required],
    });
    this.person = { name: '' , phone: '', userId: '' };

    const paramData = this.navParams.get('data');
    const amount = paramData.amount;
    const recipient = paramData.destAddress;
    console.log('got values: ' + amount + recipient);

    this.form.controls['amount'].setValue(amount);
    this.form.controls['dest'].setValue(recipient);
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

  getAllWallets() {
    this.rp.getData('wallet/getWallets/all/v1/v2').then((data) => {
      this.allWallets = data;
      this.allWallets = this.allWallets.response;
    });
  }

  getWallet(){
    this.rp.getData('wallet/' + this.person.userId).then((data) => {
      this.walletData = data;
      this.walletid = this.walletData.response.walletId;
      // if(this.walletid!=undefined){
      this.rp.getData('wallet/tbtc/' + this.walletid).then((data1) => {
        this.balancedata = data1;
        this.balance = this.balancedata.response.balance;
        console.log(this.balance);
      });
    });
  }

  sendCoin() {
    const sendingAlert = this.alertCtrl.create({
      title: 'Initiating Transfer',
      subTitle: '<img src="assets/imgs/loading.gif" /><br />Please wait.',
    });

    sendingAlert.present();
    const dest:any = this.form.controls['dest'].value;
    const pass:any = this.form.controls['pass'].value;
    const amount:any = parseFloat(this.form.controls['amount'].value) * 100000000;
    const payLoad: any = {
      amount,
      walletId: this.walletid,
      destAddress: dest,
      passphrase: pass,
    };
    console.log(payLoad);

    if (this.balance < amount) {
      sendingAlert.dismiss();
      this.presentAlert();
    } else {
      this.rp.addData('wallet/makeTransaction/type', payLoad).then((data) => {
        console.log(data);
        const temp: any = data;
        sendingAlert.dismiss();
        if (temp.error === undefined) {
          this.successAlert(payLoad);
        } else {
          this.unsuccsessAlert(temp.error);
        }
      });
    }
  }

  unsuccsessAlert(err){
    const alert = this.alertCtrl.create({
      title: 'Transaction Failed',
      subTitle: err.result.error ,
      buttons: ['Dismiss'],
    });
    this.form.reset();
    alert.present();
  }

  successAlert(payLoad) {
    const alert = this.alertCtrl.create({
      title: 'Transaction Successful',
      subTitle: 'Transfered ' + (parseFloat(payLoad.amount) / 100000000) + ' successfully.',
      buttons: ['Dismiss'],
    });
    this.form.reset();
    alert.present();
  }
  sendingAlert() {

  }

  presentAlert() {
    const alert = this.alertCtrl.create({
      title: 'Low Balance',
      subTitle: 'Please Maintain the balance for transfer',
      buttons: ['Dismiss'],
    });
    alert.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  presentPrompt() {
    const alert = this.alertCtrl.create({
      title: 'choose a recipient',

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => console.log('Cancel clicked')
        },
        {
          text: 'Next',
          handler: (data) => {
            console.log(data);
            this.setDestination(data);
          },
        },
      ],
    });
    this.allWallets.forEach((item, index) => {
      alert.addInput({ type: 'radio', label: item.userId.name, value: item.addresses[0].address });
    });

    alert.present();
  }

  setDestination(destId) {
    this.form.controls['dest'].setValue(destId);
  }

  scanQR() {
    const appBody = window.document.querySelector('ion-app');

    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          const scanSub = this.qrScanner.scan().subscribe((text: string) => {
            this.recipient = text;
            appBody.classList.remove('transparent-body');
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

          this.qrScanner.resumePreview();

          appBody.classList.add('transparent-body');
          this.qrScanner.show();

        } else if (status.denied) {
          alert('denied');
        } else {
          alert('else');
        }
      })
      .catch((e: any) => {
        alert('Error is' + e);
      });
  }
}
