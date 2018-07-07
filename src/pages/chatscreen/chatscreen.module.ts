import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatscreenPage } from './chatscreen';

@NgModule({
  declarations: [
    ChatscreenPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatscreenPage),
  ],
})
export class ChatscreenPageModule {}
