import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { User, UserData } from '../../providers/user-data';


@Component({
  selector: 'header-menu',
  templateUrl: 'header-menu.html'
})
export class HeaderMenuComponent {

  text: string;
  public person: User = { userId: '', name: '', phone: '', pic: '', email: '' };

  loggedInPages = [
                    {'icon':"folder", 'title':"Funds", 'page':"ProfilePage" },
                    {'icon':"folder", 'title':"Funds", 'page':"ProfilePage" },
                    {'icon':"folder", 'title':"Funds", 'page':"ProfilePage" },
                    {'icon':"folder", 'title':"Funds", 'page':"ProfilePage" },
                    {'icon':"folder", 'title':"Funds", 'page':"ProfilePage" },
                    {'icon':"folder", 'title':"Funds", 'page':"ProfilePage" },
                  ]; 

  constructor(private auth: AuthenticationProvider, public user: UserData,) {
    this.loadProfile();
  }
  logout() {
    this.auth.logout();
  }
  async loadProfile() {
    this.person = await this.user.getUser();
    console.log(this.person);
    
  }

}
