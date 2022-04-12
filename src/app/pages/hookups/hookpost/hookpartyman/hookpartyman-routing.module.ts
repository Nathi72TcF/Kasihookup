import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HookpartymanPage } from './hookpartyman.page';

const routes: Routes = [
  {
    path: '',
    component: HookpartymanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HookpartymanPageRoutingModule {}
