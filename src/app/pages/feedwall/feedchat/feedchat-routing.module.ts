import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedchatPage } from './feedchat.page';

const routes: Routes = [
  {
    path: '',
    component: FeedchatPage
  },
  {
    path: 'viewprofile',
    loadChildren: () => import('./viewprofile/viewprofile.module').then( m => m.ViewprofilePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedchatPageRoutingModule {}
