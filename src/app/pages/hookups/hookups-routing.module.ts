import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HookupsPage } from './hookups.page';

const routes: Routes = [
  {
    path: '',
    component: HookupsPage
  },
  {
    path: 'hookchat/:id',
    loadChildren: () => import('./hookchat/hookchat.module').then( m => m.HookchatPageModule)
  },
  {
    path: 'hookpost',
    loadChildren: () => import('./hookpost/hookpost.module').then( m => m.HookpostPageModule)
  },
  {
    path: 'viewhookparty',
    loadChildren: () => import('./viewhookparty/viewhookparty.module').then( m => m.ViewhookpartyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HookupsPageRoutingModule {}
