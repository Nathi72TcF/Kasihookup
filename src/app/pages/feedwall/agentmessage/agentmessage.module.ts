import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgentmessagePageRoutingModule } from './agentmessage-routing.module';

import { AgentmessagePage } from './agentmessage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgentmessagePageRoutingModule
  ],
  declarations: [AgentmessagePage]
})
export class AgentmessagePageModule {}
