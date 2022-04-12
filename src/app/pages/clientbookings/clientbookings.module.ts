import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientbookingsPageRoutingModule } from './clientbookings-routing.module';

import { ClientbookingsPage } from './clientbookings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientbookingsPageRoutingModule
  ],
  declarations: [ClientbookingsPage]
})
export class ClientbookingsPageModule {}
