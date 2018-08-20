import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '../../../node_modules/@ionic-native/qr-scanner';

/**
 * Generated class for the QrscannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qrscanner',
  templateUrl: 'qrscanner.html',
})
export class QrscannerPage {
  qrText: string;
  callback:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private qrScanner: QRScanner,
    public viewCtrl: ViewController) {
    this.callback = this.navParams.get('callback');
    this.qrText = this.navParams.get('data') || [];
  }
  ionViewWillEnter() {
  }

  ionViewDidLoad() {

 

      // Optionally request the permission early
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
              
              //this.viewCtrl.dismiss({ destAddress: text });
              this.qrScanner.hide(); // hide camera preview
              this.hideCamera();
              scanSub.unsubscribe(); // stop scanning
              this.exit();
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
  private showCamera() {
    ((<any>window).document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }
  private hideCamera() {
    ((<any>window).document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }
  exit() {
    //window.document.querySelector('ion-app').classList.remove('transparentBody')
    this.callback(this.qrText).then(() => { this.navCtrl.pop() });
  }
}
