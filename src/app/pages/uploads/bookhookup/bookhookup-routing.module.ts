import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookhookupPage } from './bookhookup.page';

const routes: Routes = [
  {
    path: '',
    component: BookhookupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookhookupPageRoutingModule {}
