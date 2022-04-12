import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartyusersPageRoutingModule } from './partyusers-routing.module';

import { PartyusersPage } from './partyusers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartyusersPageRoutingModule
  ],
  declarations: [PartyusersPage]
})
export class PartyusersPageModule {}
