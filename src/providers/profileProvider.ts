import { Injectable } from '@angular/core';
import { Events, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';

export type Profile = {
  address: string,
  status: string,
  about: string,
  dob: string,
};

const profileField = 'profile';

@Injectable()
export class ProfileProvider {
  constructor(
    public events: Events,
    public storage: Storage,
    public app: App,

  ) {}

  getProfile(): Promise<Profile> {
    return this.storage.get(profileField);
  }

  setProfile(profile: Profile): Promise<void> {
    return this.storage.set(profileField, profile);
  }
}
