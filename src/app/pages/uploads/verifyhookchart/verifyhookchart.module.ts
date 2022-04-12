import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyhookchartPageRoutingModule } from './verifyhookchart-routing.module';

import { VerifyhookchartPage } from './verifyhookchart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyhookchartPageRoutingModule
  ],
  declarations: [VerifyhookchartPage]
})
export class VerifyhookchartPageModule {}
