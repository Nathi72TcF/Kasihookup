import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingchatPage } from './bookingchat.page';

const routes: Routes = [
  {
    path: '',
    component: BookingchatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingchatPageRoutingModule {}
