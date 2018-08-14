import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

type Invitation = {
  contactName: string,
  contactPhoto: string | SafeUrl,
  phoneNumber: string,
  status?: string,
  date?: string,
};

@IonicPage()
@Component({
  selector: 'page-friendsInvite',
  templateUrl: 'friendsInvite.html',
})
export class FriendsInvitePage {
  invitations: Invitation[];
  invitationsFiltered: Invitation[];
  searchString: '';

  constructor(
    private sanitizer: DomSanitizer,
    private contactsProvider: Contacts,
  ) { }

  ionViewDidLoad() {
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
        contactName: contact.displayName,
        contactPhoto: contactPhoto ? this.sanitizer.bypassSecurityTrustUrl(contactPhoto) : '',
        phoneNumber,
      };
    });
    this.filterInvitations();
  }

  public sendInvitation(phoneNumber) {
    console.log('SEND INVITATION', phoneNumber);
  }
}
