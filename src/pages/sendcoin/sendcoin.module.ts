import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendcoinPage } from './sendcoin';

@NgModule({
  declarations: [
    SendcoinPage,
  ],
  imports: [
    IonicPageModule.forChild(SendcoinPage),
  ],
})
export class SendcoinPageModule {}
