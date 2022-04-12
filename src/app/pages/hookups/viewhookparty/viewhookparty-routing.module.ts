import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewhookpartyPage } from './viewhookparty.page';

const routes: Routes = [
  {
    path: '',
    component: ViewhookpartyPage
  },
  {
    path: 'partyusers',
    loadChildren: () => import('./partyusers/partyusers.module').then( m => m.PartyusersPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewhookpartyPageRoutingModule {}
