import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedwallPage } from './feedwall.page';

const routes: Routes = [
  {
    path: '',
    component: FeedwallPage
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'agentmessage',
    loadChildren: () => import('./agentmessage/agentmessage.module').then( m => m.AgentmessagePageModule)
  },
  {
    path: 'viewprofile/:id',
    loadChildren: () => import('./viewprofile/viewprofile.module').then( m => m.ViewprofilePageModule)
  },
  {
    path: 'feedchat/:id',
    loadChildren: () => import('./feedchat/feedchat.module').then( m => m.FeedchatPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedwallPageRoutingModule {}
