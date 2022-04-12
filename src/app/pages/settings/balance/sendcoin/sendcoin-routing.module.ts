import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendcoinPage } from './sendcoin.page';

const routes: Routes = [
  {
    path: '',
    component: SendcoinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendcoinPageRoutingModule {}
