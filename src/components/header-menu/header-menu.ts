import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@Component({
  selector: 'header-menu',
  templateUrl: 'header-menu.html'
})
export class HeaderMenuComponent {

  text: string;

  constructor(private auth: AuthenticationProvider) {
  }
  logout() {
    this.auth.logout();
  }

}
