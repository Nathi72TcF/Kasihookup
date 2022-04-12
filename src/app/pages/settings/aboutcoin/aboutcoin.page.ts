import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-aboutcoin',
  templateUrl: './aboutcoin.page.html',
  styleUrls: ['./aboutcoin.page.scss'],
})
export class AboutcoinPage implements OnInit {

  constructor(
    private router: Router,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
  ) { }

  ngOnInit() {
  }

  async goToSettings() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/settings').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

}
