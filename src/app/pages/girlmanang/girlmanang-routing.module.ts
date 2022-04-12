import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GirlmanangPage } from './girlmanang.page';

const routes: Routes = [
  {
    path: '',
    component: GirlmanangPage
  },
  {
    path: 'cal-modal',
    loadChildren: () => import('./cal-modal/cal-modal.module').then( m => m.CalModalPageModule)
  },
  {
    path: 'manbooks',
    loadChildren: () => import('./manbooks/manbooks.module').then( m => m.ManbooksPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GirlmanangPageRoutingModule {}
