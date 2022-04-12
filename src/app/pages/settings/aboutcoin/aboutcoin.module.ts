import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutcoinPageRoutingModule } from './aboutcoin-routing.module';

import { AboutcoinPage } from './aboutcoin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutcoinPageRoutingModule
  ],
  declarations: [AboutcoinPage]
})
export class AboutcoinPageModule {}
