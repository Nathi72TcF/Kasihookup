import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddfettishPage } from './addfettish.page';

const routes: Routes = [
  {
    path: '',
    component: AddfettishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddfettishPageRoutingModule {}
