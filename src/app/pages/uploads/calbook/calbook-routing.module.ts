import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalbookPage } from './calbook.page';

const routes: Routes = [
  {
    path: '',
    component: CalbookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalbookPageRoutingModule {}
