import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddfettishPageRoutingModule } from './addfettish-routing.module';

import { AddfettishPage } from './addfettish.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddfettishPageRoutingModule
  ],
  declarations: [AddfettishPage]
})
export class AddfettishPageModule {}
