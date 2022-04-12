import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HookbookingsPageRoutingModule } from './hookbookings-routing.module';

import { HookbookingsPage } from './hookbookings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HookbookingsPageRoutingModule
  ],
  declarations: [HookbookingsPage]
})
export class HookbookingsPageModule {}
