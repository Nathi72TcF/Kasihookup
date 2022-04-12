import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakertPageRoutingModule } from './makert-routing.module';

import { MakertPage } from './makert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakertPageRoutingModule
  ],
  declarations: [MakertPage]
})
export class MakertPageModule {}
