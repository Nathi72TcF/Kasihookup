import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookhookupPageRoutingModule } from './bookhookup-routing.module';

import { BookhookupPage } from './bookhookup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BookhookupPageRoutingModule
  ],
  declarations: [BookhookupPage]
})
export class BookhookupPageModule {}
