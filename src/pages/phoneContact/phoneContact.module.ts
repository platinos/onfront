import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhoneContactPage } from './phoneContact';

@NgModule({
  declarations: [
    PhoneContactPage,
  ],
  imports: [
    IonicPageModule.forChild(PhoneContactPage),
  ],
})
export class PhoneContactPageModule {}
