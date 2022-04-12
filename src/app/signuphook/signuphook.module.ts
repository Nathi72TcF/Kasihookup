import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignuphookPageRoutingModule } from './signuphook-routing.module';

import { SignuphookPage } from './signuphook.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SignuphookPageRoutingModule
  ],
  declarations: [SignuphookPage]
})
export class SignuphookPageModule {}
