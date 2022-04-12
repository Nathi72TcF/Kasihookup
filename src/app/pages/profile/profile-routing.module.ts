import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'addpicture',
    loadChildren: () => import('./addpicture/addpicture.module').then( m => m.AddpicturePageModule)
  },
  {
    path: 'addfettish',
    loadChildren: () => import('./addfettish/addfettish.module').then( m => m.AddfettishPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
