import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendcoinPageRoutingModule } from './sendcoin-routing.module';

import { SendcoinPage } from './sendcoin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SendcoinPageRoutingModule
  ],
  declarations: [SendcoinPage]
})
export class SendcoinPageModule {}
