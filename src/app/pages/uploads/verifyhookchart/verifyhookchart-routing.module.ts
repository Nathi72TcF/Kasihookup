import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyhookchartPage } from './verifyhookchart.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyhookchartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyhookchartPageRoutingModule {}
