import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  temparr = [];
  
  showOptionsToggle = false;
  chatpages = '' ;
  userResponse: [string];
  users: any;
  usersResponse: any;
  usersList: User[];
  usersListFiltered: User[];
  isSearchToggled = false;
  searchString: '';
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
    
  }

  ionViewDidLoad() {
    this.chatpages = 'chats';
    this.getUsers();
    
  }
  toggleSearch() {
    this.isSearchToggled = !this.isSearchToggled;
  }
 
  showOptions(){
    this.showOptionsToggle = !this.showOptionsToggle;
  }

  gotoPage(page, data){
    this.navCtrl.push(page, data);
  }
  swipeEvent(event){
    if(event.direction === 2)
      this.chatpages = 'friends';
    else this.chatpages = 'chats';
  }
  getUsers() {
    this.restProvider.getData('users')
      .then(({ response }) => {
        this.usersList = response;
        this.filterData();
        this.userResponse = response;
      });
    

  }
  doRefresh(refresher) {
    setTimeout(() => {
      this.ionViewDidLoad();
      refresher.complete();
    }, 2000);
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
  showAddFriendPrompt(){
    
  }

}
