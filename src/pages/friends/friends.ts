import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  usersResponse: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
    
  }

  ionViewDidLoad() {
    this.chatpages = 'chats';
    this.getUsers();
    
  }
  searchuser(searchbar) {
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }

    this.filteredusers = this.filteredusers.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }
  showOptions(){
    this.showOptionsToggle = !this.showOptionsToggle;
  }

  gotoPage(page){
    this.navCtrl.push(page);
  }
  swipeEvent(event){
    if(event.direction === 2)
      this.chatpages = 'friends';
    else this.chatpages = 'chats';
  }
  getUsers() {
    this.restProvider.getData('users')
      .then(data => {
        this.users = data;
        this.userResponse = this.users.response;
      });

  }
  
  
}
