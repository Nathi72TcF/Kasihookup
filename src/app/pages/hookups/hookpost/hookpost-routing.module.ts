import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HookpostPage } from './hookpost.page';

const routes: Routes = [
  {
    path: '',
    component: HookpostPage
  },
  {
    path: 'hookpartyman/:id',
    loadChildren: () => import('./hookpartyman/hookpartyman.module').then( m => m.HookpartymanPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HookpostPageRoutingModule {}
