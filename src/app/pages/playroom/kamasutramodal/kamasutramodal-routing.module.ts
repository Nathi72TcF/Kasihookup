import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KamasutramodalPage } from './kamasutramodal.page';

const routes: Routes = [
  {
    path: '',
    component: KamasutramodalPage
  },
  {
    path: 'kamachat',
    loadChildren: () => import('./kamachat/kamachat.module').then( m => m.KamachatPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KamasutramodalPageRoutingModule {}
