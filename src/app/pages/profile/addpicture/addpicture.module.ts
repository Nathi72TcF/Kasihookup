import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddpicturePageRoutingModule } from './addpicture-routing.module';

import { AddpicturePage } from './addpicture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddpicturePageRoutingModule
  ],
  declarations: [AddpicturePage]
})
export class AddpicturePageModule {}
