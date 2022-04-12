import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewhookpartyPageRoutingModule } from './viewhookparty-routing.module';

import { ViewhookpartyPage } from './viewhookparty.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewhookpartyPageRoutingModule
  ],
  declarations: [ViewhookpartyPage]
})
export class ViewhookpartyPageModule {}
