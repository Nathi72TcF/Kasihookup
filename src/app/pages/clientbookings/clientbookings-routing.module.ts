import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientbookingsPage } from './clientbookings.page';

const routes: Routes = [
  {
    path: '',
    component: ClientbookingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientbookingsPageRoutingModule {}
