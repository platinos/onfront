import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@Component({
  selector: 'header-menu',
  templateUrl: 'header-menu.html'
})
export class HeaderMenuComponent {

  text: string;

  constructor(private auth: AuthenticationProvider, public navCtrl: NavController) {
    console.log('Hello HeaderMenuComponent Component');
    this.text = 'Hello World';
  }
  logout() {
    this.auth.logout();
    this.navCtrl.setRoot('StartingPage');
  }

}
