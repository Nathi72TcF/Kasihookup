import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HookchartPage } from './hookchart.page';

const routes: Routes = [
  {
    path: '',
    component: HookchartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HookchartPageRoutingModule {}
