import { Component, OnInit, ViewChild } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { MenuController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { ImagemodalPage } from '../imagemodal/imagemodal.page';
import { KasiService } from '../../service/kasi.service';
import { IonInfiniteScroll, Platform } from '@ionic/angular';
import * as moment from 'moment';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.page.html',
  styleUrls: ['./uploads.page.scss'],
})
export class UploadsPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  db = firebase.firestore();
  storage = firebase.storage().ref();
  userID = firebase.auth().currentUser.uid;

  posts = [];
  searchResults = [];

  girls = [];
  searchResultgirls = [];
  girlsNo;

  page = 0;
  likes = 0;

  HookupNo;

  likeNo;
  liked;

  noOfItem = 1

  profile = {
    sentimage: '',
    sentname: null,
    sentsurname: null,
    senttcfid: null,
    senttcfcoin: null,
    recimage: '',
    recname: null,
    recsurname: null,
    rectcfid: null,
    rectcfcoin: null,
    recid: null
  }

  // segmentModel = "verified";
  segmentModel = "nonverified";

  // twingz
  datezz;
  dummy: any = [ "dummy1", "dummy2", "dummy3", "dummy4", "dummy5"];

  isimgLoaded: boolean = false;

  constructor(
    public kasiservice: KasiService,
    private menu: MenuController,
    private modalController: ModalController,
    public Alert: AlertController,
    private router: Router,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
    private afs: AngularFirestore,
    private platform: Platform,
  ) {
    this.getPosts();
    this.getHoohups();
    this.myUserData();
   }

  ngOnInit() {
  }

  async getPosts() {
    const loading = await this.loadingController.create({
      spinner: 'lines',
      message: 'Loading Hookups...',
      duration: 2000,
      translucent: true,
    });
    await loading.present();

    this.db.collection('hookups').onSnapshot(Snapshop => {
      this.posts = [];
     
      Snapshop.forEach(element => {
        this.posts.push(element.data());
        this.HookupNo = this.posts.length;

        // console.log(this.HookupNo);
        // console.log(this.posts);

        loading.dismiss();
      })
   });
  }

  async getHoohups() {
    const loading = await this.loadingController.create({
      spinner: 'lines',
      message: 'Loading Hookups...',
      duration: 2000,
      translucent: true,
    });
    await loading.present();

    this.db.collection('hookupgirls').onSnapshot(Snapshop => {
      this.girls = [];
     
      Snapshop.forEach(element => {
        this.girls.push(element.data());
        this.girlsNo = this.girls.length;

        // console.log(this.girls);
        // console.log(this.girlsNo);

        loading.dismiss();
      })
   });
  }

  myUserData() {
    this.db.collection('users').doc(this.userID)
    .onSnapshot(snapshot => {
      this.profile.sentimage = snapshot.data().image;
      this.profile.sentname = snapshot.data().name;
      this.profile.sentsurname = snapshot.data().surname;
    })
  }

  getItems(ev: any) {
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
      
      
      let arr = this.posts.filter(item => String(item.location).indexOf(val) >= 0)
      // console.log(arr);

      this.searchResults = arr;
      this.HookupNo = this.searchResults.length;
      
      // console.log('Results = ',this.searchResults);

    } else if (val == "") {
      this.searchResults = [];
      this.HookupNo = this.searchResults.length;

    }

    // console.log(this.HookupNo);
    // console.log(this.posts);
    // console.log(this.searchResults);
    
  }

  getlocations(ev: any) {
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
      
      
      let arr = this.girls.filter(item => String(item.location).indexOf(val) >= 0)
      // console.log(arr);

      this.searchResultgirls = arr;
      this.HookupNo = this.searchResultgirls.length;
      
      // console.log('Results = ',this.searchResultgirls);

    } else if (val == "") {
      this.searchResultgirls = [];
      this.HookupNo = this.searchResultgirls.length;
    }

    // console.log(this.HookupNo);
    // console.log(this.posts);
    // console.log(this.searchResults);
    
  }

  async Refresh() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/tabs/uploads').then(async () => {
          await loading.dismiss();
          this.liked = 0;
        });
      });
    });
  }

  loadMore(event) {
    setTimeout(() => {
      // console.log('Timeout Done');
      event.target.complete();

      if (this.searchResults.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  loadMoregirls(event) {
    setTimeout(() => {
      // console.log('Timeout Done');
      event.target.complete();

      if (this.searchResultgirls.length === 1000) {
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
