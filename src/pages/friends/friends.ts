import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.chatpages = 'chats';
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
}
