import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentmessagePage } from './agentmessage.page';

const routes: Routes = [
  {
    path: '',
    component: AgentmessagePage
  },
  {
    path: 'addagentmessage',
    loadChildren: () => import('./addagentmessage/addagentmessage.module').then( m => m.AddagentmessagePageModule)
  },
  {
    path: 'chatagentmessage',
    loadChildren: () => import('./chatagentmessage/chatagentmessage.module').then( m => m.ChatagentmessagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentmessagePageRoutingModule {}
