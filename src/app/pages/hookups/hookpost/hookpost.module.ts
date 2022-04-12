import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HookpostPageRoutingModule } from './hookpost-routing.module';

import { HookpostPage } from './hookpost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HookpostPageRoutingModule
  ],
  declarations: [HookpostPage]
})
export class HookpostPageModule {}
