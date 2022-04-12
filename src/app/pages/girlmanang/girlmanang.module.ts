import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GirlmanangPageRoutingModule } from './girlmanang-routing.module';

import { GirlmanangPage } from './girlmanang.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GirlmanangPageRoutingModule
  ],
  declarations: [GirlmanangPage]
})
export class GirlmanangPageModule {}
