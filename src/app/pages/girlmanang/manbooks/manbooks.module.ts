import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManbooksPageRoutingModule } from './manbooks-routing.module';

import { ManbooksPage } from './manbooks.page';

import { NgCalendarModule  } from 'ionic2-calendar';
import { CalModalPageModule } from './../cal-modal/cal-modal.module';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManbooksPageRoutingModule,
    NgCalendarModule,
    CalModalPageModule,
    ReactiveFormsModule
  ],
  declarations: [ManbooksPage],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE' }
  ]
})
export class ManbooksPageModule {}
