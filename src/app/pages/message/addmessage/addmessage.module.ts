import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddmessagePageRoutingModule } from './addmessage-routing.module';

import { AddmessagePage } from './addmessage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddmessagePageRoutingModule
  ],
  declarations: [AddmessagePage]
})
export class AddmessagePageModule {}
