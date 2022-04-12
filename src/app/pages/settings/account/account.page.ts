import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  storage = firebase.storage().ref();
  db = firebase.firestore();

  userprofile = [];

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
  
  // progress bar
  progressbar: number;
  uploadingprogress = 0;

  constructor(
    private router: Router,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
    private toastController: ToastController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
  }

}
