import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

type Invitation = {
  id: string,
  contactName: string,
  contactPhoto: string | SafeUrl,
  phoneNumber: string,
  status?: string,
  date?: string,
};

@Component({
  selector: 'friendsInvite',
  templateUrl: 'friendsInvite.html',
})
export class FriendsInvitePage {
  private invitations: Invitation[];
  private invitationsFiltered: Invitation[];
  private searchString: '';

  constructor(
    public navCtrl: NavController,
    private sanitizer: DomSanitizer,
    private contactsProvider: Contacts,
  ) { }

  ngAfterContentInit() {
    this.loadContacts();
  }

  private filterInvitations() {
    this.invitationsFiltered = [...this.invitations];

    if (this.searchString) {
      this.invitationsFiltered = this.invitationsFiltered.filter(invitation =>
        invitation.contactName.toLowerCase().includes(this.searchString.toLowerCase()),
      );
    }
  }

  private async loadContacts() {
    const contacts = await this.contactsProvider.find(['name']);
    this.invitations = contacts.map((contact) => {
      const phoneNumber = contact.phoneNumbers ? contact.phoneNumbers[0].value : '';
      const contactPhoto = contact.photos ? contact.photos[0].value : '';

      return {
        id: contact.id,
        contactName: contact.displayName,
        contactPhoto: contactPhoto ? this.sanitizer.bypassSecurityTrustUrl(contactPhoto) : '',
        phoneNumber,
      };
    });
    this.filterInvitations();
  }

  public goToProfile(phoneContactId: string) {
    console.log('phoneContactId', phoneContactId);
    this.navCtrl.push('PhoneContactPage', { phoneContactId });
  }
}
