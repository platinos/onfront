import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { CallNumber } from '@ionic-native/call-number';

type Person = {
  name: string,
  phone: string,
  userId: string,
  status: string,
  wallets: string,
};

@IonicPage()
@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserprofilePage {
  private stories: any;
  private person: Person;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private callNumber: CallNumber,
    private rest: RestProvider,
  ) { }

  ionViewDidLoad() {
    const userId = this.navParams.get('userId');

    this.rest.getData(`profile/${userId}`)
      .then(({ response: { user: { name, phone, _id: userId }, status, wallets } }) =>
        this.person = { name, phone, userId, status, wallets });

    this.rest.addData(`content/user/${userId}`, { page: 0 })
      .then(({ response }) => this.stories = response[0].contents);
  }

  presentPostModal(postId) {
    this.navCtrl.push('PostsPage', { postId });
  }

  call() {
    const { phone } = this.person;
    this.callNumber.callNumber(phone, true);
  }

  chat() {
    const { userId } = this.person;
    this.navCtrl.push('ChatscreenPage', { friendId: userId });
  }

  sendMoney() {
    console.log('SEND MONEY');
  }

  requestMoney() {
    console.log('SEND MONEY');
  }
}
