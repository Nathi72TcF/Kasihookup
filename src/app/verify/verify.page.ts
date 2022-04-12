import { Component, OnInit } from '@angular/core';
import { KasiService } from './../service/kasi.service';
import firebase from 'firebase/compat/app';
import { AlertController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {

  hasVerifiedEmail = true;

  constructor(
    private kasi: KasiService,
    private router: Router,
    public loadingController: LoadingController,
    public menuCtrl: MenuController,
  ) {
    this.hasVerifiedEmail = firebase.auth().currentUser.emailVerified
          //  this.router.navigateByUrl('/home');

          if (this.hasVerifiedEmail == true) {
            this.goToLogin();
            console.log('Acoount Verified?', this.hasVerifiedEmail);
          }
   }

  ngOnInit() {
  }

  async goToLogin() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrl.close().then(() => {
        this.router.navigateByUrl('/tabs/feedwall').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  sendVerification() {
    firebase.auth().currentUser.sendEmailVerification();
    this.goToVerify();
  }

  async goToVerify() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrl.close().then(() => {
        this.router.navigateByUrl('/login').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  logout() {
    this.kasi.logout()
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }

}
