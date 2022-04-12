import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagePage } from './message.page';

const routes: Routes = [
  {
    path: '',
    component: MessagePage
  },
  {
    path: 'chatmessage/:id',
    loadChildren: () => import('./chatmessage/chatmessage.module').then( m => m.ChatmessagePageModule)
  },
  {
    path: 'addmessage',
    loadChildren: () => import('./addmessage/addmessage.module').then( m => m.AddmessagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagePageRoutingModule {}
