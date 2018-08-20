import { Component, ViewChild } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ActionSheetController,
  Platform,
  ModalController, 
  PopoverController} from 'ionic-angular';
import { User, UserData } from '../../providers/user-data';
import { RestProvider } from '../../providers/rest/rest';
import { AnimationService, AnimationBuilder } from 'css-animator';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChild('myElement') myElem;
  private animator: AnimationBuilder;
  public person: User = { userId: '', name: '' , phone: '', pic: '', email: '' };
  profilePages = 'trends';

  userHasWallet = false;
  walletData:any;
  walletCoins = [
    { name: 'Bitcoin', value: 0, icon: 'bitcoin.png' },
    { name: 'Ether', value: 0, icon: 'ether.png' },
    { name: 'Angur', value: 0, icon: 'angur.png' },
    { name: 'Dash', value: 0, icon: 'dash.png' },
  ];
  balancedata: any;
  walletid: any;
  balance: any;
  showDetails = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public user:UserData,
    private alertCtrl: AlertController,
    private rp: RestProvider,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public modalCtrl: ModalController,
    public animationService: AnimationService,
    public popoverCtrl: PopoverController
  ) {
    this.profilePages = 'wallet';
    this.animator = animationService.builder();
    
   // this.userHasWalletInSystem();
  }
  showDisclaimer(){
    let disclaimer = this.alertCtrl.create({
      title: 'Disclaimer',
      subTitle: 'Thanks for choosing SHEQ!<br>\
     We are now in Beta, which means we do not gurantee all the security and functionality within the app.<br>\
     We advise you that using this app should be done for testing purpose only.<br>\
     <b>You assume the full responsibility for all risks concerning your data and funds.</b>',
      buttons: ['I Agree']
    });
    disclaimer.present();
  }
  async ionViewWillEnter() {
    this.person = await this.user.getUser();
    console.log(this.person);
    this.userHasWalletInSystem();
    
    
  }
  ionViewDidLoad(){
    this.showDisclaimer();
  }
 
  checkProfilePage(pageName) {
    return !this.userHasWallet;
  }

  changeProfilePage(pageName) {
    this.profilePages = pageName;
  }

  gotoPage(page: string, data: any = null) {
    if (data === null) {
      this.navCtrl.push(page);
    } else {
      console.log(data);
      this.navCtrl.push(page, { data });
    }
  }

  hasWallet() {
    return this.userHasWallet;
  }

  getWallet() {
    this.rp.getData('wallet/tbtc/' + this.walletid).then((data) => {
      this.balancedata = data;
      this.balance = parseInt(this.balancedata.response.spendableBalance, 0) / 100000000;
      console.log(this.balance);
      console.log(this.balancedata);
      this.walletCoins[0].value = this.balance;
    });
  }

  userHasWalletInSystem(){
    this.rp.getData('wallet/' + this.person.userId).then((data) => {
      console.log(data);
      this.walletData = data;
      console.log(this.walletData.error);
      if (this.walletData.error === undefined) {
        this.walletid = this.walletData.response.walletId;
        this.userHasWallet = true;
        this.getWallet();
        //this.animator.setType('bounce').show(this.myElem.nativeElement);
      }
    });
  }

  createWallet(){
    this.presentPrompt();
    // let x:any
    // this.presentPopover(x);
    console.log('Wallet Created!');
  }

  presentPrompt() {
    const alert = this.alertCtrl.create({
      title: 'Setup Wallet Passcode',
      inputs: [
        {
          name: 'label',
          placeholder: 'Enter a friendly Wallet Name',
        },
        {
          name: 'password',
          placeholder: 'Choose a Passphrase',
          type: 'password',
        },
      ],
      buttons: [
        {
          text: 'Maybe Later',
          role: 'cancel',
          handler: data => console.log('Cancel clicked'),
        },
        {
          text: 'Next',
          handler: (data) => {
            // to call api
            this.rp.addData('wallet/' + this.person.userId, {
              coin: 'tbtc',
              label: data.label,
              password: data.password,
            }).then((data) => {
              this.userHasWallet = true;
              console.log(data);
              this.ionViewWillEnter();
            });
          },
        },
      ],
    });
    alert.present();
  }

  doRefresh(refresher) {
    setTimeout(
      () => {
        this.ionViewWillEnter();
        refresher.complete();
      },
      2000);
  }

  paymentmethodPrompt() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Payment Mode',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Send to Wallet',
          icon: !this.platform.is('ios') ? 'at' : null,
          handler: () => {
            this.gotoPage('SendcoinPage', 'walletid');
            // console.log('Archive clicked');
          },
        },
        {
          text: 'Add Funds',
          icon: !this.platform.is('ios') ? 'qr-scanner' : null,
          handler: () => {
            //console.log('Archive clicked');
            this.gotoPage('AddfundsPage', { 'myaddress': this.balancedata.response.receiveAddress.address })
          }
         },
        // {
        //   text: 'Select from contacts',
        //   // icon: 'contacts',
        //   icon: !this.platform.is('ios') ? 'contacts' : null,
        //   handler: () => {
        //     const senders = this.modalCtrl.create('SenderslistPage');
        //     senders.present();
        //     senders.onDidDismiss((data) => {
        //       if (data !== undefined) {

        //         this.rp.getData('wallet/' + data.friendId).then((data) => {
        //           console.log(data);
        //           const temp: any = data;
        //           if (temp.error === undefined) {
        //             const tempWalletId = temp.response.walletId;

        //             this.rp.getData('wallet/tbtc/' + tempWalletId).then((data) => {
        //               const tempWalletdata: any = data;

        //               const addressee = tempWalletdata.response.receiveAddress.address;
        //               console.log(`Sending to: ${addressee}`);

        //               this.gotoPage('SendcoinPage', { destAddress: addressee });
        //             });

        //           }
        //         });
        //       }
        //     });
        //   },
        // },
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
  menuPrompt() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Lets go to',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'My Profile',
          icon: !this.platform.is('ios') ? 'contact' : null,
          handler: () => {
            this.gotoPage('MyprofilePage');
            
          },
        },
        {
          text: 'My Assets',
          icon: !this.platform.is('ios') ? 'logo-buffer' : null,
          handler: () => {
            //console.log('Archive clicked');
            this.gotoPage("MarketPage");
          }
        },
        {
          text: 'My Posts',
          icon: !this.platform.is('ios') ? 'images' : null,
          handler: () => {
            //console.log('Archive clicked');
            this.gotoPage("MypostsPage");
          }
        },
        {
          text: 'My Projects',
          icon: !this.platform.is('ios') ? 'flash' : null,
          handler: () => {
            //console.log('Archive clicked');
            this.gotoPage("ProjectPage");
          }
        },
        {
          text: 'My Shop',
          // icon: 'contacts',
          icon: !this.platform.is('ios') ? 'cart' : null,
          handler: () => {
            this.gotoPage("ShopPage");
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

  animateElem() {
    if (this.hasWallet()){
    this.animator.setType('flipInX').show(this.myElem.nativeElement);
    this.showDetails = this.showDetails === true ? false : true;
    }
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create('WalletpasscodePage');
    popover.present({
      ev: myEvent
    });
  }
}
