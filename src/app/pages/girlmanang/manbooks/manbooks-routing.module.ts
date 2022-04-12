import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManbooksPage } from './manbooks.page';

const routes: Routes = [
  {
    path: '',
    component: ManbooksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManbooksPageRoutingModule {}
