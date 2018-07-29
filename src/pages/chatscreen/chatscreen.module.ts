import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatscreenPage } from './chatscreen';
import { SafePipe } from "../../pipes/safe/safe";

@NgModule({
  declarations: [
    ChatscreenPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatscreenPage),
    
  ],
})
export class ChatscreenPageModule {}
