import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatagentmessagePage } from './chatagentmessage.page';

const routes: Routes = [
  {
    path: '',
    component: ChatagentmessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatagentmessagePageRoutingModule {}
