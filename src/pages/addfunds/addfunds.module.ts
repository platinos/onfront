import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddfundsPage } from './addfunds';

@NgModule({
  declarations: [
    AddfundsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddfundsPage),
  ],
})
export class AddfundsPageModule {}
