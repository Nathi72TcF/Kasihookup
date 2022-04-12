import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddagentmessagePage } from './addagentmessage.page';

const routes: Routes = [
  {
    path: '',
    component: AddagentmessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddagentmessagePageRoutingModule {}
