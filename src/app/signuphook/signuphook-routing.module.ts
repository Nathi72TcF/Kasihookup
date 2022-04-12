import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignuphookPage } from './signuphook.page';

const routes: Routes = [
  {
    path: '',
    component: SignuphookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignuphookPageRoutingModule {}
