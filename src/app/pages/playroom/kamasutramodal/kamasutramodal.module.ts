import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KamasutramodalPageRoutingModule } from './kamasutramodal-routing.module';

import { KamasutramodalPage } from './kamasutramodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KamasutramodalPageRoutingModule
  ],
  declarations: [KamasutramodalPage]
})
export class KamasutramodalPageModule {}
