import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import {
  RestProvider
} from '../../providers/rest/rest';
import {
  Contacts,
  Contact
} from '@ionic-native/contacts';
import { DomSanitizer } from '../../../node_modules/@angular/platform-browser';
//import { Diagnostic } from '@ionic-native/diagnostic';


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
  allContacts: any

  showOptionsToggle = false;
  chatpages = '';
  userResponse: [string];
  users: any;
  usersResponse: any;
  usersList: User[];
  usersListFiltered: User[];
  isSearchToggled = false;
  searchString: '';
  contactList = [];

  constructor(
    private contacts: Contacts,
    public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider,
    //private _DIAGNOSTIC  : Diagnostic,
    private sanitizer: DomSanitizer
  ) {


  }
  getContacts(): void {
    
    //this._DIAGNOSTIC.isContactsAuthorized()
      //.then((isAuthorised : any) =>
      //{

    this.contacts.find(
      ["displayName", "phoneNumbers", "photos"],
      { multiple: true, hasPhoneNumber: true }
    ).then((contacts) => {
      for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].displayName !== null) {
          var contact = {};
          contact["name"] = contacts[i].displayName;
          contact["number"] = contacts[i].phoneNumbers[0].value;
          if (contacts[i].photos != null) {
            console.log(contacts[i].photos);
            contact["image"] = this.sanitizer.bypassSecurityTrustUrl(contacts[i].photos[0].value);
            console.log(contact);
          } else {
            contact["image"] = "assets/imgs/user.png";
          }
          this.contactList.push(contact);
        }
      }
    });
    console.log(this.contactList);
 
  
  }


  ionViewDidLoad() {
    this.chatpages = 'chats';
    this.getUsers();
    this.getContacts();

  }
  toggleSearch() {
    this.isSearchToggled = !this.isSearchToggled;
  }

  showOptions() {
    this.showOptionsToggle = !this.showOptionsToggle;
  }

  gotoPage(page, data) {
    this.navCtrl.push(page, data);
  }
  swipeEvent(event) {
    if (event.direction === 2)
      this.chatpages = 'friends';
    else this.chatpages = 'chats';
  }
  getUsers() {
    this.restProvider.getData('users')
      .then(({
        response
      }) => {
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
  showAddFriendPrompt() {

  }

}
