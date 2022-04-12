import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HookupsPageRoutingModule } from './hookups-routing.module';

import { HookupsPage } from './hookups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HookupsPageRoutingModule
  ],
  declarations: [HookupsPage]
})
export class HookupsPageModule {}
