import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SenderslistPage } from './senderslist';

@NgModule({
  declarations: [
    SenderslistPage,
  ],
  imports: [
    IonicPageModule.forChild(SenderslistPage),
  ],
})
export class SenderslistPageModule {}
