import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppofflinePage } from './appoffline.page';

const routes: Routes = [
  {
    path: '',
    component: AppofflinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppofflinePageRoutingModule {}
