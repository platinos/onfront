import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { CallNumber } from '@ionic-native/call-number';
import { UserData, User } from '../../providers/user-data';

type Contact = {
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
  private contactId: string;
  private user: User;
  private contact: Contact;
  private stories: any;
  private isFriend: boolean;
  private isFriendRequested: boolean;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private callNumber: CallNumber,
    private userProvider: UserData,
    private restProvider: RestProvider,
  ) { }

  ionViewDidLoad() {
    this.contactId = this.navParams.get('userId');

    this.getData();
  }

  async getData() {
    this.user = await this.userProvider.getUser();

    const profile = await this.restProvider.getData(`profile/${this.user.userId}`);
    this.isFriend = false;
    this.isFriendRequested = false;

    this.restProvider.getData(`profile/${this.contactId}`)
      .then(({ response: { user: { name, phone, _id: userId }, status, wallets } }) =>
        this.contact = { name, phone, userId, status, wallets });

    this.restProvider.addData(`content/user/${this.contactId}`, { page: 0 })
      .then(({ response }) => this.stories = response[0].contents);
  }

  presentPostModal(postId) {
    this.navCtrl.push('PostsPage', { postId });
  }

  call() {
    const { phone } = this.contact;
    this.callNumber.callNumber(phone, true);
  }

  chat() {
    const { userId } = this.contact;
    this.navCtrl.push('ChatscreenPage', { friendId: userId });
  }

  sendMoney() {
    console.log('SEND MONEY');
  }

  requestMoney() {
    console.log('SEND MONEY');
  }

  addToFriends() {
    console.log('addToFriends', this);
    // this.restProvider.addData(`profile/addrequest/${this.user.userId}/${this.contact.userId}`, {});
    this.restProvider.addData(`profile/addrequest/${this.user.userId}/${this.contact.userId}`, {});
  }

  removeFromFriends() {
    console.log('remove from friends', this);
  }
}
