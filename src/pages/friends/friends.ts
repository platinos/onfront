import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

type User = {
  name: string,
};

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  chatpages = '' ;
  usersList: User[];
  usersListFiltered: User[];
  isSearchToggled = false;
  searchString: '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider,
    public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    this.chatpages = 'chats';
    this.getUsers();
  }

  filterData() {
    this.usersListFiltered = [...this.usersList];
    console.log(this.usersListFiltered);

    if (this.searchString) {
      this.usersListFiltered = this.usersListFiltered.filter(user =>
        user.name.toLowerCase().includes(this.searchString.toLowerCase()),
      );
    }
  }

  toggleSearch() {
    this.isSearchToggled = !this.isSearchToggled;
  }

  gotoPage(page, data) {
    this.navCtrl.push(page, data);
  }

  swipeEvent(event) {
    this.chatpages = event.direction === 2 ? 'friends' : 'chats';
  }

  getUsers() {
    this.restProvider.getData('users')
      .then(({ response }) => {
        this.usersList = response;
        this.filterData();
      });
  }

  showAddFriendPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Invite friend',
      inputs: [
        {
          name: 'userName',
          placeholder: 'Nickname or email',
        },
      ],
      buttons: [
        'Cancel',
        {
          text: 'Invite',
          handler: ({ userName }) => this.addFriend(userName),
        },
      ],
    });
    prompt.present();
  }

  addFriend(userName: String) {
    this.restProvider.addData('users', { userName });
  }

  doRefresh(refresher) {
    setTimeout(
      () => {
        this.getUsers();
        refresher.complete();
      },
      2000);
  }
}
