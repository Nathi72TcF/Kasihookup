import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayroomPageRoutingModule } from './playroom-routing.module';

import { PlayroomPage } from './playroom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayroomPageRoutingModule
  ],
  declarations: [PlayroomPage]
})
export class PlayroomPageModule {}
