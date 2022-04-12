import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HookbookingsPage } from './hookbookings.page';

const routes: Routes = [
  {
    path: '',
    component: HookbookingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HookbookingsPageRoutingModule {}
