import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'feedwall',
        loadChildren: () => import('./../feedwall/feedwall.module').then( m => m.FeedwallPageModule)
      },
      {
        path: 'message',
        loadChildren: () => import('./../message/message.module').then( m => m.MessagePageModule)
      },
      {
        path: 'playroom',
        loadChildren: () => import('./../playroom/playroom.module').then( m => m.PlayroomPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'uploads',
        loadChildren: () => import('./../uploads/uploads.module').then( m => m.UploadsPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/feedwall',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
