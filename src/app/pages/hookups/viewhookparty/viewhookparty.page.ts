import { Component, OnInit, ViewChild } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { MenuController, ModalController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ImagemodalPage } from './../../imagemodal/imagemodal.page';
import { IonInfiniteScroll } from '@ionic/angular';
import * as moment from 'moment';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { PartyusersPage } from './partyusers/partyusers.page';

@Component({
  selector: 'app-viewhookparty',
  templateUrl: './viewhookparty.page.html',
  styleUrls: ['./viewhookparty.page.scss'],
})
export class ViewhookpartyPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  db = firebase.firestore();
  storage = firebase.storage().ref();
  userID = firebase.auth().currentUser.uid;

  hookupParties = [];

  isimgLoaded: boolean = false;

  constructor(
    private menu: MenuController,
    private modalController: ModalController,
    public Alert: AlertController,
    private router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
  ) {
    this.getHookups();
   }

  ngOnInit() {
  }

  getHookups() {
    this.db.collection('hookupparty').onSnapshot(Snapshop => {
      this.hookupParties = [];
     
      Snapshop.forEach(element => {
        this.hookupParties.push(element.data());
        console.log(this.hookupParties);

      })
   });
   
  }

  Addusers(id) {
    this.modalController.create({
      component: PartyusersPage,
      componentProps: {
        id: id
      }
    }).then(modal => modal.present());
  }

  loadMore(event) {
    setTimeout(() => {
      // console.log('Timeout Done');
      event.target.complete();

      if (this.hookupParties.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
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

  dismiss() {
    this.modalController.dismiss();
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

}
