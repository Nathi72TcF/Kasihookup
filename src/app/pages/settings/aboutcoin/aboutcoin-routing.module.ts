import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutcoinPage } from './aboutcoin.page';

const routes: Routes = [
  {
    path: '',
    component: AboutcoinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutcoinPageRoutingModule {}
