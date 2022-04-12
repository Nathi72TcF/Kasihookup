import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddagentmessagePageRoutingModule } from './addagentmessage-routing.module';

import { AddagentmessagePage } from './addagentmessage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddagentmessagePageRoutingModule
  ],
  declarations: [AddagentmessagePage]
})
export class AddagentmessagePageModule {}
