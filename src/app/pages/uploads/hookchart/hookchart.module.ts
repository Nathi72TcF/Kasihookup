import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HookchartPageRoutingModule } from './hookchart-routing.module';

import { HookchartPage } from './hookchart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HookchartPageRoutingModule
  ],
  declarations: [HookchartPage]
})
export class HookchartPageModule {}
