import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayroomPage } from './playroom.page';

const routes: Routes = [
  {
    path: '',
    component: PlayroomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayroomPageRoutingModule {}
