import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { element } from 'protractor';

@Component({
  selector: 'app-addfettish',
  templateUrl: './addfettish.page.html',
  styleUrls: ['./addfettish.page.scss'],
})
export class AddfettishPage implements OnInit {

  db = firebase.firestore();
  storage = firebase.storage().ref();

  kamasutralist = [];
  fettish = [];

  picname;
  image;

  constructor(
    private menu: MenuController,
    private modalController: ModalController,
  ) {
    this.getFettish();
   }

  ngOnInit() {
  }

  getFettish() {
    this.db.collection('fettish').onSnapshot(snapshot => {
      snapshot.forEach(element => {
        this.kamasutralist.push(element.data());
        // console.log(this.kamasutralist);
      })
    })
  }

  clickSelectedBox(checkbox) {
    // console.log(checkbox);
    const foundAt = this.fettish.indexOf(checkbox);
    // console.log(foundAt);
    if (foundAt >= 0) {
      this.fettish.splice(foundAt, 1);
    } else {
      this.fettish.push(checkbox);
    }
    // console.log(this.fettish);
  }

  updateKamasutra() {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid)
    .update({fettish: this.fettish});
    // console.log('Kamasutra Saved');

    this.dismiss()
  }

  dismiss() {
    this.modalController.dismiss();
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

}
