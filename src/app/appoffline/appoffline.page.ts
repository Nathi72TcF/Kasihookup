import { Component, OnInit } from '@angular/core';
import { ConnectivityService } from './../service/connectivity.service';
import { Router } from '@angular/router';
import { MenuController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-appoffline',
  templateUrl: './appoffline.page.html',
  styleUrls: ['./appoffline.page.scss'],
})
export class AppofflinePage implements OnInit {

  constructor(
    private router: Router,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
    public connectivityProvider: ConnectivityService,
    public Alert: AlertController,
  ) { }

  ngOnInit() {
  }

  async chechNetwork() {
    this.connectivityProvider.appIsOnline$.subscribe(online => {
      console.log('Reload app online?',online);
      
      if (online) {
        this.HomePage();
      } else {
        // app is off line
        this.connectionError();
      }
    })
  }

  async HomePage() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/tabs/feedwall').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  async connectionError() {
    const alert = await this.Alert.create({
      cssClass: 'alertHeader',
      header: 'Connection Error!',
      message: '<span class="alertss">Connection Error. Please Check your Network / Data and try again.</span>',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'alert',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }

  ionViewDidEnter() {
    this.menuCtrt.enable(false);
  }

}
