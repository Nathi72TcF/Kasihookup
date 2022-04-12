import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HookchatPageRoutingModule } from './hookchat-routing.module';

import { HookchatPage } from './hookchat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HookchatPageRoutingModule
  ],
  declarations: [HookchatPage]
})
export class HookchatPageModule {}
