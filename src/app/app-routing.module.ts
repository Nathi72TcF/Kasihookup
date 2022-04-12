import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'signuphook',
    loadChildren: () => import('./signuphook/signuphook.module').then( m => m.SignuphookPageModule)
  },
  {
    path: 'verify',
    loadChildren: () => import('./verify/verify.module').then( m => m.VerifyPageModule)
  },
  {
    path: 'appoffline',
    loadChildren: () => import('./appoffline/appoffline.module').then( m => m.AppofflinePageModule)
  },
  {
    path: 'feedwall',
    loadChildren: () => import('./pages/feedwall/feedwall.module').then( m => m.FeedwallPageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./pages/message/message.module').then( m => m.MessagePageModule)
  },
  {
    path: 'makert',
    loadChildren: () => import('./pages/makert/makert.module').then( m => m.MakertPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'imagemodal',
    loadChildren: () => import('./pages/imagemodal/imagemodal.module').then( m => m.ImagemodalPageModule)
  },
  {
    path: 'playroom',
    loadChildren: () => import('./pages/playroom/playroom.module').then( m => m.PlayroomPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'uploads',
    loadChildren: () => import('./pages/uploads/uploads.module').then( m => m.UploadsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./pages/feedwall/post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'girlmanang',
    loadChildren: () => import('./pages/girlmanang/girlmanang.module').then( m => m.GirlmanangPageModule)
  },
  {
    path: 'bookingchat/:id',
    loadChildren: () => import('./pages/bookingchat/bookingchat.module').then( m => m.BookingchatPageModule)
  },
  {
    path: 'clientbookings',
    loadChildren: () => import('./pages/clientbookings/clientbookings.module').then( m => m.ClientbookingsPageModule)
  },
  {
    path: 'hookbookings',
    loadChildren: () => import('./pages/hookbookings/hookbookings.module').then( m => m.HookbookingsPageModule)
  },
  {
    path: 'hookups',
    loadChildren: () => import('./pages/hookups/hookups.module').then( m => m.HookupsPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
