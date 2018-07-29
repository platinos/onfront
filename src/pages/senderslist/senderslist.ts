import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the SenderslistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-senderslist',
  templateUrl: 'senderslist.html',
})
export class SenderslistPage {
  userResponse: [string];
  users: any;
  usersResponse: any;
  constructor(public navCtrl: NavController, 
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public restProvider: RestProvider) {
  }

  ionViewDidLoad() {
    this.getUsers();
  }
  gotoPage(page, data) {
    this.dismiss(data);
    
  }
  getUsers() {
    this.restProvider.getData('users')
      .then(data => {
        this.users = data;
        this.userResponse = this.users.response;
        console.log(data);

      });

  }
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}
