import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HookpartymanPageRoutingModule } from './hookpartyman-routing.module';

import { HookpartymanPage } from './hookpartyman.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HookpartymanPageRoutingModule
  ],
  declarations: [HookpartymanPage]
})
export class HookpartymanPageModule {}
