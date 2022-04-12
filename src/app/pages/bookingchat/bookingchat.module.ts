import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingchatPageRoutingModule } from './bookingchat-routing.module';

import { BookingchatPage } from './bookingchat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingchatPageRoutingModule
  ],
  declarations: [BookingchatPage]
})
export class BookingchatPageModule {}
