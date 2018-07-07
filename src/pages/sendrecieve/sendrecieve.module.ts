import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendrecievePage } from './sendrecieve';

@NgModule({
  declarations: [
    SendrecievePage,
  ],
  imports: [
    IonicPageModule.forChild(SendrecievePage),
  ],
})
export class SendrecievePageModule {}
