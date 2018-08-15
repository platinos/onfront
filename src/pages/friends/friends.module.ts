import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendsPage } from './friends';
import { FriendsInvitePage } from './friendsInvite/friendsInvite';

@NgModule({
  declarations: [
    FriendsPage,
    FriendsInvitePage,
  ],
  imports: [
    IonicPageModule.forChild(FriendsPage),
  ],
})
export class FriendsPageModule {}
