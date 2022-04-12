import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { KasiService } from './../../../service/kasi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, ModalController, AlertController } from '@ionic/angular';
import { ImagemodalPage } from '../../imagemodal/imagemodal.page';
import { AddmessagePage } from '../../message/addmessage/addmessage.page';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.page.html',
  styleUrls: ['./viewprofile.page.scss'],
})
export class ViewprofilePage implements OnInit {

  db = firebase.firestore();
  storage = firebase.storage().ref();

  id: any;

  userProfile: any = [];
  userProfileNo;
  Profiles = [];
  Pictures = [];
  kamaHeart = [];
  kamaDone = [];
  kamaFavorate = [];
  kamaHappy = [];
  kamaSad = [];

  constructor(
    private modalController: ModalController,
    public activatedRoute: ActivatedRoute,
    public kasiservice: KasiService,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.id);

    this.getUser(this.id);
    this.getProfile(this.id);
    this.getPictures(this.id);

    this.getHeartkama(this.id);
    this.getDonekama(this.id);
    this.getFavoratekama(this.id);
    this.getHappykama(this.id);
    this.getSadkama(this.id);
   }

  ngOnInit() {
  }

  addmessage(id) {
    // console.log('im clicked');

    this.modalController.create({
      component: AddmessagePage,
      componentProps: {
        id: id
      }
    }).then(modal => modal.present())
  }

  getUser(id) {
    this.db.collection('users').doc(id).onSnapshot(Snapshop => {
      this.userProfile = [];
     
      this.userProfile.push(Snapshop.data())
      // console.log(this.userProfile);
   });

  // this.userProfile = [];
  //  this.kasiservice.getUsers(id).subscribe(data => {
  //   // console.log(data);
  //   this.userProfile = data;
  //   console.log(this.userProfile);
  //   // this.userProfileNo = data.length;
  // })
  }

  getProfile(id) {
    this.db.collection('profiles').doc(id).onSnapshot(Snapshop => {
      this.Profiles = [];
     
      this.Profiles.push(Snapshop.data())
      // console.log(this.Profiles);
   });
  }

  getPictures(id) {
    this.db.collection('usermedia').doc(id).collection('mypiccs')
    .onSnapshot(Snapshot => {
      this.Pictures = [];
      Snapshot.forEach(element => {
        this.Pictures.push(element.data());
        // console.log(this.Pictures);
      })
    })
  }

  getHeartkama(id) {
    this.db.collection('profiles').doc(id).collection('kamaheart').onSnapshot(Snapshop => {
      this.kamaHeart = [];

      Snapshop.forEach(element => {
        this.kamaHeart.push(element.data())
        // console.log(this.kamaHeart);
      })
   });
  }

  getDonekama(id) {
    this.db.collection('profiles').doc(id).collection('kamadone').onSnapshot(Snapshop => {
      this.kamaDone = [];

      Snapshop.forEach(element => {
        this.kamaDone.push(element.data())
        // console.log(this.kamaDone);
      })
   });
  }

  getFavoratekama(id) {
    this.db.collection('profiles').doc(id).collection('kamafavorate').onSnapshot(Snapshop => {
      this.kamaFavorate = [];

      Snapshop.forEach(element => {
        this.kamaFavorate.push(element.data())
        // console.log(this.kamaFavorate);
      })
   });
  }

  getHappykama(id) {
    this.db.collection('profiles').doc(id).collection('kamahappy').onSnapshot(Snapshop => {
      this.kamaHappy = [];

      Snapshop.forEach(element => {
        this.kamaHappy.push(element.data())
        // console.log(this.kamaHappy);
      })
   });
  }

  getSadkama(id) {
    this.db.collection('profiles').doc(id).collection('kamasad').onSnapshot(Snapshop => {
      this.kamaSad = [];

      Snapshop.forEach(element => {
        this.kamaSad.push(element.data())
        // console.log(this.kamaSad);
      })
   });
  }

  openPreview(image) {
    this.modalController.create({
      component: ImagemodalPage,
      componentProps: {
        image: image
      }
    }).then(modal => modal.present());
  }

}
