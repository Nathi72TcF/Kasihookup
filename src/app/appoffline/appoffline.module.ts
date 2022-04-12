import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppofflinePageRoutingModule } from './appoffline-routing.module';

import { AppofflinePage } from './appoffline.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppofflinePageRoutingModule
  ],
  declarations: [AppofflinePage]
})
export class AppofflinePageModule {}
