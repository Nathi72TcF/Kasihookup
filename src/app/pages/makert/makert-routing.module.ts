import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakertPage } from './makert.page';

const routes: Routes = [
  {
    path: '',
    component: MakertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakertPageRoutingModule {}
