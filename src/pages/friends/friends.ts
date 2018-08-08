import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  temparr = [];
  filteredusers = [];
  showOptionsToggle = false;
  chatpages = '' ;
  userResponse: [string];
  users: any;
  // usersResponse: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider,
    public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    this.chatpages = 'chats';
    this.getUsers();
  }

  searchUser(searchbar) {
    this.filteredusers = this.temparr;
    const q = searchbar.target.value;
    if (q.trim() === '') return;

    this.filteredusers = this.filteredusers.filter(
      v => v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1,
    );
  }

  showOptions(){
    this.showOptionsToggle = !this.showOptionsToggle;
  }

  gotoPage(page, data) {
    this.navCtrl.push(page, data);
  }

  swipeEvent(event) {
    this.chatpages = event.direction === 2 ? 'friends' : 'chats';
  }

  getUsers() {
    this.restProvider.getData('users')
      .then((data) => {
        this.users = data;
        this.userResponse = this.users.response;
        console.log(data);
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
        { text: 'Cancel' },
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
        this.ionViewDidLoad();
        refresher.complete();
      },
      2000);
  }
}
