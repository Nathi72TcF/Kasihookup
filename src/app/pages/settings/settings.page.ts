import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Platform, MenuController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  settings: any[] = [
    // { id: 'notifications', icon: 'notifications-outline', link: 'notifications' },
    { id: 'account', icon: 'person-outline', link: 'account' },
    { id: 'appearance', icon: 'color-palette-outline', link: 'appearance' },
    // { id: 'general', icon: 'settings-outline', link: 'general' },
    // { id: 'security', icon: 'lock-closed-outline', link: 'security' },
    // { id: 'privacy', icon: 'hand-left-outline', link: 'privacy' },
    // { id: 'blocked', icon: 'people-outline', link: 'blocked' },
    { id: 'balance', icon: 'wallet-outline', link: 'balance' },
    // { id: 'subscriptions', icon: 'card-outline', link: 'subscriptions' },
    { id: 'about coin', icon: 'help-circle-outline', link: 'aboutcoin' },
    { id: 'about', icon: 'help-circle-outline', link: 'about' }
  ];

  constructor(
    private router: Router,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
  ) { }

  ngOnInit() {
  }

  Logout() {
    firebase.auth().signOut().then((res) => {
        // console.log(res);
        this.goToLogout();
    });
  }

  async goToLogout() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/login').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  async goToProfile() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/tabs/profile').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

}
