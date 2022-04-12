import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NgCalendarModule  } from 'ionic2-calendar';
import { CalbookPageRoutingModule } from './calbook-routing.module';
import { CalModalPageModule } from './../../girlmanang/cal-modal/cal-modal.module';

import { CalbookPage } from './calbook.page';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalbookPageRoutingModule,
    ReactiveFormsModule,
    NgCalendarModule,
    CalModalPageModule
  ],
  declarations: [CalbookPage],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE' }
  ]
})
export class CalbookPageModule {}
