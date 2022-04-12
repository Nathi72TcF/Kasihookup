import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, LoadingController, ModalController, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { element } from 'protractor';
import { SendcoinPage } from './sendcoin/sendcoin.page';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {

  @ViewChild(IonSlides) slider: IonSlides;

  storage = firebase.storage().ref();
  db = firebase.firestore();

  userprofile = [];
  userwallet = [];
  coinOut = [];
  coinIn = [];

  id = firebase.auth().currentUser.uid;

  profile = {
    image: '',
    username: null,
    surnamez: null,
    position: null,
    contact: null,
    gender: null,
    location: null,
    startsign: null,
    year: null,
    tcfID: null,
    tcfCoin: null,
    userid: firebase.auth().currentUser.uid,
    email: firebase.auth().currentUser.email
      };

  Coin = {
    date: null,
    coin: null,
    coinStatus: null,
    sentID: null,
    sentName: null,
    sentSurname: null,
    sentImage: null,
    recID: null,
    recName: null,
    recSurname: null,
    recImage: null,
  }

  segment = 0;

  constructor(
    private router: Router,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
    private modalController: ModalController,
  ) {
    this.getuser();
    this.getWallete();
    this.getCoinOut();
    this.getCoinIn();
   }

  ngOnInit() {
  }

  payOtherUser() {
    console.log('im clicked');
    
    this.modalController.create({
      component: SendcoinPage,
      cssClass: 'my-custom-class'
    }).then(modal => modal.present());
  }

  getuser() {
    this.db.collection('users').doc(this.profile.userid).onSnapshot(snapshot => {
      // console.log(snapshot)

      this.profile.username = snapshot.data().name;
      this.profile.surnamez = snapshot.data().surname;
      this.profile.contact = snapshot.data().contact;
      this.profile.email = snapshot.data().email;
      this.profile.image = snapshot.data().image;
      this.profile.position = snapshot.data().position;
      this.profile.gender = snapshot.data().gender;
      this.profile.location = snapshot.data().location;
      this.profile.startsign = snapshot.data().startsign;
      this.profile.year = snapshot.data().year;

      // console.log(this.profile.username);
      // console.log(this.profile.surnamez);
      // console.log(this.profile.contact);
      // console.log(this.profile.email);
      // console.log(this.profile.image);
      // console.log(this.profile.position);
      // console.log(this.profile.gender);
      // console.log(this.profile.location);
      // console.log(this.profile.startsign);
      // console.log(this.profile.year);
      
    })
  }

  getWallete() {
    this.db.collection('tcfwallet').doc(this.profile.userid).onSnapshot(snapshot => {
      this.userwallet = [];

      this.profile.tcfID = snapshot.data().tcfid;
      this.profile.tcfCoin = snapshot.data().tcfcoin;

      // console.log(this.profile.tcfID);
      // console.log(this.profile.tcfCoin);
      
      this.userwallet.push(snapshot.data());
      // console.log(this.userwallet);
      
    })
  }

  getCoinOut() {
    this.db.collection('tcfwallet').doc(this.profile.userid).collection('sentcoin')
    .onSnapshot(snapshot => {
      this.coinOut = [];
      
      snapshot.forEach(element => {
        this.coinOut.push(element.data());
        // console.log(this.coinOut);
      })
    })
  }

  getCoinIn() {
    this.db.collection('tcfwallet').doc(this.profile.userid).collection('reccoin')
    .onSnapshot(snapshot => {
      this.coinIn = [];
      
      snapshot.forEach(element => {
        this.coinIn.push(element.data());
        // console.log(this.coinIn);
      })
    })
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
