import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedwallPageRoutingModule } from './feedwall-routing.module';

import { FeedwallPage } from './feedwall.page';
// import { PostPage } from './post/post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // PostPage,
    FeedwallPageRoutingModule
  ],
  declarations: [FeedwallPage]
})
export class FeedwallPageModule {}
