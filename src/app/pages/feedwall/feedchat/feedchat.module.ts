import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedchatPageRoutingModule } from './feedchat-routing.module';

import { FeedchatPage } from './feedchat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedchatPageRoutingModule
  ],
  declarations: [FeedchatPage]
})
export class FeedchatPageModule {}
