import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartyusersPage } from './partyusers.page';

const routes: Routes = [
  {
    path: '',
    component: PartyusersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartyusersPageRoutingModule {}
