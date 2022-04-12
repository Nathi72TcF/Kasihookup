import { Component, OnInit, ViewChild } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { MenuController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { ImagemodalPage } from '../imagemodal/imagemodal.page';
import { KasiService } from '../../service/kasi.service';
import { IonInfiniteScroll } from '@ionic/angular';
import * as moment from 'moment';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { HookpostPage } from './hookpost/hookpost.page';

@Component({
  selector: 'app-hookups',
  templateUrl: './hookups.page.html',
  styleUrls: ['./hookups.page.scss'],
})
export class HookupsPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  db = firebase.firestore();
  storage = firebase.storage().ref();
  userID = firebase.auth().currentUser.uid;

  posts = [];

  page = 0;
  likes = [];
  likesNo;

  userimage;

  likeNo;
  liked;

  postID: string;
  postReference: AngularFirestoreDocument;
  sub;

  heartType: string = "heart-outline";

  // twingz
  datezz;
  dummy: any = [ "dummy1", "dummy2", "dummy3", "dummy4", "dummy5"];

  isimgLoaded: boolean = false;
  imagePost = [];
  imagePostNo;

  constructor(
    public kasiservice: KasiService,
    private menu: MenuController,
    private modalController: ModalController,
    public Alert: AlertController,
    private router: Router,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
    private afs: AngularFirestore
  ) {
    this.getHookups();
   }

  ngOnInit() {
  }

  getHookups() {
    this.db.collection('hookupparty').orderBy('date', 'desc').onSnapshot(Snapshop => {
      this.posts = [];
     
      Snapshop.forEach(element => {
        this.posts.push(element.data());
        // console.log(this.posts);

        this.imagePost.push(element.data().image)
        this.imagePostNo = this.imagePost.length;

        // console.log(this.imagePost);
        // console.log(this.imagePostNo);

        // this.datezz = moment(element.data().date).endOf('day').fromNow();
      })
   });
   
  }

  loadMore(event) {
    setTimeout(() => {
      // console.log('Timeout Done');
      event.target.complete();

      if (this.posts.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
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

  ionViewDidEnter() {
    this.menu.enable(false);
  }

}
