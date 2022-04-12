import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { element } from 'protractor';
import { MenuController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { KamasutramodalPage } from './kamasutramodal/kamasutramodal.page';

@Component({
  selector: 'app-playroom',
  templateUrl: './playroom.page.html',
  styleUrls: ['./playroom.page.scss'],
})
export class PlayroomPage implements OnInit {

  db = firebase.firestore();

  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20
  }

  Kama = [];

  dummy: any = [ "dummy1", "dummy2", "dummy3", "dummy4", "dummy5"];

  constructor(
    private router: Router,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
    private modalController: ModalController,
  ) {
    this.getKamasutra();
   }

  ngOnInit() {
  }

  async getKamasutra() {
    const loading = await this.loadingController.create({
      spinner: 'lines',
      message: 'Loading Kamasutra...',
      duration: 2000,
      translucent: true,
    });
    await loading.present();

    this.db.collection('kamasutra').onSnapshot(snapshot => {
      snapshot.forEach(element => {
        this.Kama.push(element.data());
        // console.log(this.Kama);

        loading.dismiss();
      })
    })
  }

  openPreview(image) {
    this.modalController.create({
      component: KamasutramodalPage,
      componentProps: {
        image: image
      }
    }).then(modal => modal.present());
  }

  ionViewDidEnter() {
    this.menuCtrt.enable(false);
  }

}
