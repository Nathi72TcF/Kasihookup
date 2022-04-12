import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { MenuController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ImagemodalPage } from './../../../imagemodal/imagemodal.page';
import { IonInfiniteScroll } from '@ionic/angular';
import * as moment from 'moment';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { element } from 'protractor';

@Component({
  selector: 'app-partyusers',
  templateUrl: './partyusers.page.html',
  styleUrls: ['./partyusers.page.scss'],
})
export class PartyusersPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  db = firebase.firestore();
  storage = firebase.storage().ref();
  userID = firebase.auth().currentUser.uid;

  hookupParties = [];
  hookusers = [];
  hookusersNo;
  users;

  price;

  tcfcoin;
  tcfid;
  newCoin;

  id;

  isimgLoaded: boolean = false;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private menu: MenuController,
    public Alert: AlertController,
    private router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
  ) { }

  ngOnInit() {
    this.id = this.navParams.get('id');
    console.log(this.id);

    this.getHookups(this.id);
  }

  getHookups(id) {
    this.db.collection('hookupparty').doc(id).onSnapshot(Snapshop => {
      this.hookupParties = [];
     
        this.hookupParties.push(Snapshop.data());
        this.price = Snapshop.data().price;

        console.log(this.price);
        console.log(this.hookupParties);

   });

   this.db.collection('hookupparty').doc(id).collection('bookings').onSnapshot(Snapshop => {
    this.hookusers = [];
   
    Snapshop.forEach(element => {
      this.hookusers.push(element.data());
      this.hookusersNo = this.hookusers.length;
      console.log(this.hookusers);
      // console.log(element.id);
    })
  });
  }

  Addusers(idz) {
    console.log('added', idz);
    this.db.collection('hookupparty').doc(this.id).collection('bookingsGoing').doc(idz)
    .set(this.hookusers)

    this.presentToast();
    this.removeUser(idz);
  }

  removeUser(idz) {
    this.db.collection('hookupparty').doc(this.id).collection('bookings').doc(idz).delete()
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'This user is going.',
      duration: 9000,
      color: 'primary',
      position: 'bottom'
    });
    toast.present();
  }

  removeid(idz) {
    console.log('removed', idz);
    this.db.collection('hookupparty').doc(this.id).collection('bookings').doc(idz).delete()

    this.getCoins(idz);
    this.presentToast2();
  }

  getCoins(idz) {
    this.db.collection('tcfwallet').doc(idz)
    .onSnapshot(Snapshot => {
      this.tcfcoin = Snapshot.data().tcfcoin;
      this.tcfid = Snapshot.data().tcfid;
    })

    this.calculateNewCoin(idz);

  }

  calculateNewCoin(idz) {
    this.newCoin = this.tcfcoin + this.price;

    this.updatewallet(idz, this.newCoin);

  }

  updatewallet(idz, newCoin) {
    this.db.collection('tcfwallet').doc(idz)
    .update({
      id: idz,
      tcfcoin: newCoin,
      tcfid: this.tcfid
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorMessage;
      // ...resetepassword
    });
  }

  async presentToast2() {
    const toast = await this.toastController.create({
      message: 'This user is not going.',
      duration: 9000,
      color: 'primary',
      position: 'bottom'
    });
    toast.present();
  }

  loadMore(event) {
    setTimeout(() => {
      // console.log('Timeout Done');
      event.target.complete();

      if (this.hookusers.length === 1000) {
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
