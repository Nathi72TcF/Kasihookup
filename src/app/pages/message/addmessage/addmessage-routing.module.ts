import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddmessagePage } from './addmessage.page';

const routes: Routes = [
  {
    path: '',
    component: AddmessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddmessagePageRoutingModule {}
