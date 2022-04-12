import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HookchatPage } from './hookchat.page';

const routes: Routes = [
  {
    path: '',
    component: HookchatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HookchatPageRoutingModule {}
