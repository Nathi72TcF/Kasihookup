import { ApplicationRef, Component, OnInit } from '@angular/core';
import { ConnectivityService } from './service/connectivity.service';

import { Platform, MenuController, LoadingController } from '@ionic/angular';
import { KasiService } from './service/kasi.service';
import firebase from 'firebase/compat/app';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  UserClient = [];
  userdata = [];

  userId;

  position;

  // user infor
  name;
  surname;
  contact;
  email;
  image;

  hasVerifiedEmail = true;

  userProfile = [];

  public selectedIndex = 0;
  public appPages = [];

  constructor(
    public kasi: KasiService,
    private platform: Platform,
    public afAuth: AngularFireAuth,
    public router: Router,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
    public connectivityProvider: ConnectivityService,
    private update: SwUpdate,
  ) {
    this.initializeApp();
    // this.getAuth();

    this.connectivityProvider.appIsOnline$.subscribe(online => {
      console.log('is app online?',online);
      
      if (online) {
        // call functions
        this.getAuth();
        this.updateClient();
      } else {
        // app is off line
        this.offlinepage();
      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(-1, () => {
        const url = this.router.url;
  
        if (url === '/tabs/not-home') {
          this.router.navigate(['/tabs/feedwall'])
        } else if (url === '/tabs/home') {
          navigator['app'].exitApp();
        }
      })
    });
  }

  ngOnInit() {
  }

  updateClient() {
    if (!this.update.isEnabled) {
      console.log('App Update is not available');
      return;
    }

    this.update.available.subscribe((event) => {
      console.log('current update', event.current, 'available update', event.available);
      if (confirm('New Update Available please comfirm')) {
        this.update.activateUpdate().then(() => location.reload());
      }
    })

    this.update.activated.subscribe((event) => {
      console.log('Current App', event.previous, 'Available App', event.current);
    })
  }

  async offlinepage() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/appoffline').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  callSideMenuSettings(position) {
    console.log('Side Menu triggerd');

    this.position = position;

        if (this.position == "admin") {
          this.appPages = [];
          this.appPages.push(
            {
              title: 'Settings',
              url: '/settings',
              icon: 'cog'
            },
            {
              title: 'Profile',
              url: '/account',
              icon: 'people'
            },
            {
              title: 'Hookups',
              url: '/makert',
              icon: 'cog'
            },
            {
              title: 'Users',
              url: '/users',
              icon: 'people'
            },
            {
              title: 'Agent Messages',
              url: '/agentmessage',
              icon: 'mic'
            },
            {
              title: 'Hookup Parties',
              url: '/hookups',
              icon: 'wine'
            },
            {
              title: 'Hookup Parties Manang',
              url: '/hookpost',
              icon: 'cog'
            },
            // {
            //   title: 'Manange Hook Up',
            //   url: '/girlmanang',
            //   icon: 'calendar'
            // },
            {
              title: 'My Bookings',
              url: '/clientbookings',
              icon: 'clipboard'
            },
          ) 
        } else if (this.position == "client") {
          this.appPages = [];
          this.appPages.push(
            {
              title: 'Settings',
              url: '/settings',
              icon: 'cog'
            },
            {
              title: 'Profile',
              url: '/account',
              icon: 'people'
            },
            {
              title: 'Hookup Parties',
              url: '/hookups',
              icon: 'wine'
            },
            {
              title: 'My Bookings',
              url: '/clientbookings',
              icon: 'clipboard'
            },
          ) 
        } else if (this.position == "hookup") {
          this.appPages = [];
          this.appPages.push(
            {
              title: 'Settings',
              url: '/settings',
              icon: 'cog'
            },
            {
              title: 'Profile',
              url: '/account',
              icon: 'people'
            },
            {
              title: 'Hookup Parties',
              url: '/hookups',
              icon: 'wine'
            },
            {
              title: 'Manange Hook Up',
              url: '/girlmanang',
              icon: 'calendar'
            },
            {
              title: 'Bookings',
              url: '/hookbookings',
              icon: 'clipboard'
            },
          ) 
        }
  }

  getAuth() {
    console.log('Get Auth triggerd');
    // call functions
    this.afAuth.onAuthStateChanged((user) => {
      this.userId = user.uid;
      // console.log(this.userId);

      this.kasi.getUsers(this.userId).subscribe(snap => {
        // console.log(snap);
        this.userProfile.push(snap);
        // console.log(this.userzzz);
      })

      setTimeout(() => {
        for (let key in this.userProfile) {
          this.name = this.userProfile[key].name;
          this.surname = this.userProfile[key].surname;
          this.position = this.userProfile[key].position;
          this.image = this.userProfile[key].image;
        }
        // console.log('Name', this.name);
        // console.log('Surname', this.surname);
        // console.log('Position', this.position);
        // console.log('Image', this.image);
        this.routeToPage(this.position)
        this.callSideMenuSettings(this.position);
      }, 1000);
      // console.log(this.userzzz);

      this.hasVerifiedEmail = user.emailVerified;
      // this.checkIfVerified(this.hasVerifiedEmail)
      console.log('Email Verified?', this.hasVerifiedEmail);
      
    });
  }

  routeToPage(position) {
    this.hasVerifiedEmail = firebase.auth().currentUser.emailVerified
    //  this.router.navigateByUrl('/home');

    if (this.hasVerifiedEmail == true) {
      this.goToVerify();
      console.log(this.hasVerifiedEmail);
    } else if (this.hasVerifiedEmail == false) {
      this.goToCheckVerify();
      console.log(this.hasVerifiedEmail);
    } else {
      this.goToLogout();
    }
  }

  async goToVerify() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/tabs/feedwall').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  async goToCheckVerify() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/verify').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  Logout() {
    firebase.auth().signOut().then((res) => {
        console.log(res);
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

  /**
  * Navigate to settings page
  */
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
