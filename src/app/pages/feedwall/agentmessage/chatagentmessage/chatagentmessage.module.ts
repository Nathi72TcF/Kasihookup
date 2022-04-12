import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatagentmessagePageRoutingModule } from './chatagentmessage-routing.module';

import { ChatagentmessagePage } from './chatagentmessage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatagentmessagePageRoutingModule
  ],
  declarations: [ChatagentmessagePage]
})
export class ChatagentmessagePageModule {}
