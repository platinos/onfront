import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { RestProvider } from '../../providers/rest/rest';
import { FilePath } from '@ionic-native/file-path';
import { SocialSharing } from '@ionic-native/social-sharing';

type Person = {
  name: string,
  phone?: string,
  photo?: string,
};

@IonicPage()
@Component({
  selector: 'page-phoneContact',
  templateUrl: 'phoneContact.html',
})
export class PhoneContactPage {
  private userId: string;
  private person: Person;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private sanitizer: DomSanitizer,
    private filePath: FilePath,
    private socialSharing: SocialSharing,
    private restProvider: RestProvider,
    private contactsProvider: Contacts,
  ) { }

  ionViewDidLoad() {
    this.userId = this.navParams.get('phoneContactId');

    this.loadContact();
  }

  async loadContact() {
    const contact = (await this.contactsProvider.find(['id'], { filter: this.userId }))[0];

    let photo;
    if (contact.photos) {
      try {
        photo = await this.filePath.resolveNativePath(contact.photos[0].value);
      } catch (e) {
      }
    }

    this.person = {
      name: contact.displayName,
      phone: contact.phoneNumbers ? contact.phoneNumbers[0].value : undefined,
      photo,
    };
  }

  sanitizeImage(value) {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }

  invite() {
    this.socialSharing.share('Hey Let\'s join me on Sheq', 'SHEQ');
  }
}
