import { Component, OnInit, ViewChild } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ImagemodalPage } from '../imagemodal/imagemodal.page';
import { IonInfiniteScroll, Platform } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  db = firebase.firestore();
  storage = firebase.storage().ref();
  userid = firebase.auth().currentUser.uid;

  users = [];
  usersNo;
  searchResults = [];

  girls = [];
  girlsNo;
  girlssearchResults = [];

  males = [];
  malesNo;
  female = []
  femaleNo;
  femalesearchResults = [];

  segmentModel = "clients";

  constructor(
    private menu: MenuController,
    private modalController: ModalController,
    public Alert: AlertController,
    private router: Router,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
  ) {
    this.getUser();
    this.getHookups();
    this.getOtherData();
   }

  ngOnInit() {
  }

  async getUser() {
    const loading = await this.loadingController.create({
      spinner: 'lines',
      message: 'Loading Clients...',
      duration: 2000,
      translucent: true,
    });
    await loading.present();

    this.db.collection('users').where('position', '==', 'client').onSnapshot(snapshot => {
      this.users = [];
      // console.log(snapshot);
      
      snapshot.forEach(element => {
        this.users.push(element.data());
      })

      this.usersNo = this.users.length;
      // console.log('No of users', this.usersNo);
      // console.log('Users List', this.users);

      loading.dismiss();
    })
  }

  async getHookups() {
    const loading = await this.loadingController.create({
      spinner: 'lines',
      message: 'Loading Hookups Girls...',
      duration: 2000,
      translucent: true,
    });
    await loading.present();

    this.db.collection('users').where('position', '==', 'hookup').onSnapshot(snapshot => {
      this.girls = [];
      // console.log(snapshot);
      
      snapshot.forEach(element => {
        this.girls.push(element.data());
      })

      this.girlsNo = this.girls.length;
      // console.log('No of Hookups', this.girlsNo);
      // console.log('Hookup List', this.girls);

      loading.dismiss();
    })
  }

  async presentAlertDelete(id) {
    const alert = await this.Alert.create({
      header: 'Warning!',
      message: '<strong>Are you sure you want to Delete this Profile</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deletePics(id);
          }
        }
      ]
    });
    await alert.present();
  }

  deletePics(id) {
    // console.log('user id', id);
    this.db.collection('users').doc(id).delete();
    // console.log('delete profile done');
  }

  getOtherData() {
    this.db.collection('users').where('gender', '==', 'Male').onSnapshot(snap => {
      this.males = []
      snap.forEach(element => {
        this.males.push(element.data())
        this.malesNo = this.males.length;
      });
    })

    this.db.collection('users').where('gender', '==', 'Female').onSnapshot(snap => {
      this.female = []
      snap.forEach(element => {
        this.female.push(element.data())
        this.femaleNo = this.female.length;
      });
    })
  }

  getClients(ev: any) {
    // Reset items back to all of the items
    // set val to the value of the searchbar
    const val = ev.target.value;
    const num = Number(val)
    // if the value is an empty string don't filter the items
    // console.log(val);
    // console.log(num);
    
    if (val && val.trim() != "" && !(num == 0)) {
      // console.log(num);
      // console.log(!(num == 0));
      
      
      let arr = this.users.filter(item => String(item.username).indexOf(val) >= 0)
      // console.log(arr);

      this.searchResults = arr;
      
      // console.log('Results = ',this.searchResults);

    } else if (val == "") {
      this.searchResults = [];
      // this.searchResults.push(this.users);
    }

    // console.log(this.users);
    // console.log(this.searchResults);
    
  }

  getHookup(ev: any) {
    // Reset items back to all of the items
    // set val to the value of the searchbar
    const val = ev.target.value;
    const num = Number(val)
    // if the value is an empty string don't filter the items
    // console.log(val);
    // console.log(num);
    
    if (val && val.trim() != "" && !(num == 0)) {
      // console.log(num);
      // console.log(!(num == 0));
      
      
      let arr = this.girls.filter(item => String(item.username).indexOf(val) >= 0)
      // console.log(arr);

      this.girlssearchResults = arr;
      
      // console.log('Results = ',this.girlssearchResults);

    } else if (val == "") {
      this.girlssearchResults = [];
      // this.girlssearchResults.push(this.users);
    }

    // console.log(this.users);
    // console.log(this.girlssearchResults);
    
  }

  getFemale(ev: any) {
    // Reset items back to all of the items
    // set val to the value of the searchbar
    const val = ev.target.value;
    const num = Number(val)
    // if the value is an empty string don't filter the items
    // console.log(val);
    // console.log(num);
    
    if (val && val.trim() != "" && !(num == 0)) {
      // console.log(num);
      // console.log(!(num == 0));
      
      
      let arr = this.female.filter(item => String(item.username).indexOf(val) >= 0)
      // console.log(arr);

      this.femalesearchResults = arr;
      
      // console.log('Results = ',this.femalesearchResults);

    } else if (val == "") {
      this.femalesearchResults = [];
      // this.femalesearchResults.push(this.users);
    }

    // console.log(this.users);
    // console.log(this.femalesearchResults);
    
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

  loadMore(event) {
    setTimeout(() => {
      // console.log('Timeout Done');
      event.target.complete();

      if (this.users.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  openPreview(image) {
    this.modalController.create({
      component: ImagemodalPage,
      componentProps: {
        image: image
      }
    }).then(modal => modal.present());
  }

  segmentChanged(event){
    console.log(this.segmentModel);
    
    // console.log(event);
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

}
