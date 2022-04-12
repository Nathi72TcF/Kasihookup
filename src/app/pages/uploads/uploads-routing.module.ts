import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadsPage } from './uploads.page';

const routes: Routes = [
  {
    path: '',
    component: UploadsPage
  },
  {
    path: 'bookhookup',
    loadChildren: () => import('./bookhookup/bookhookup.module').then( m => m.BookhookupPageModule)
  },
  {
    path: 'calbook/:id',
    loadChildren: () => import('./calbook/calbook.module').then( m => m.CalbookPageModule)
  },
  {
    path: 'hookchart/:id',
    loadChildren: () => import('./hookchart/hookchart.module').then( m => m.HookchartPageModule)
  },
  {
    path: 'verifyhookchart/:id',
    loadChildren: () => import('./verifyhookchart/verifyhookchart.module').then( m => m.VerifyhookchartPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadsPageRoutingModule {}
