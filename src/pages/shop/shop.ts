import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  LoadingController,
  ViewController,
  AlertController
} from 'ionic-angular';
import {
  RestProvider
} from '../../providers/rest/rest';
import {
  User,
  UserData
} from '../../providers/user-data';


/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  public person: User = {
    userId: '',
    name: '',
    phone: '',
    pic: '',
    email: ''
  };

  productList:any;
  product: any;
  userID: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public restProvider: RestProvider,
    public user: UserData,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
    this.getData();
  }

  getData() {
    let loading = this.loadingCtrl.create({
      content: '<img src="assets/imgs/loading.gif"/> <br>  Loading Stories.. Please wait.'
    });
    loading.setSpinner("none");
    loading.present();
    this.user.getUserId().then((userName) => {
      this.userID = userName;
    this.restProvider.getData('product/user/'+ this.userID)
      .then(data => {
        this.product = data;
        this.productList = this.product.response;
        setTimeout(() => {
          loading.dismiss();
        }, 0);
      });
    });
  }

  reloadStories() { 
    this.user.getUserId().then((userName) => {
      this.userID = userName;
      this.restProvider.getData('product/user/'+ this.userID)
      .then(data => {
        this.product = data;
        this.productList = this.product.response;      
        console.log(this.productList); 
      });
    });
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.reloadStories();
      refresher.complete();
    }, 2000);
  }

  presentCreateModal() {

    
    let createModal = this.modalCtrl.create("CreateshopPage");
    createModal.present();
    createModal.onDidDismiss(data => {
      this.reloadStories();    

  });
  }

  presentCreateModal1(id:any) {

    console.log(id);
    let createModal = this.modalCtrl.create("EditproductPage",{iddata: id});
    createModal.present();
    createModal.onDidDismiss(data => {
    this.reloadStories();    

  });
  }


}
