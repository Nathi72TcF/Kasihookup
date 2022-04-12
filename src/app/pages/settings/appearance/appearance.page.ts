import { Component, OnInit } from '@angular/core';
import { ThemeService } from './../../../service/theme.service';
import { MenuController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.page.html',
  styleUrls: ['./appearance.page.scss'],
})
export class AppearancePage implements OnInit {

  constructor(
    private themeservice: ThemeService,
    private router: Router,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
  ) { }

  ngOnInit() {
  }

  toggleDarkTheme() {
    this.themeservice.toggleAppTheme();
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
