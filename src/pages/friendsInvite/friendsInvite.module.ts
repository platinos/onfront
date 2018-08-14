import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendsInvitePage } from './friendsInvite';

@NgModule({
  declarations: [
    FriendsInvitePage,
  ],
  imports: [
    IonicPageModule.forChild(FriendsInvitePage),
  ],
})
export class FriendsPageModule {}
