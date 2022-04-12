import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { MenuController, ModalController, AlertController } from '@ionic/angular';
import { SubscriptionLike } from 'rxjs';
import { element } from 'protractor';
import { ImagemodalPage } from '../imagemodal/imagemodal.page';
import { AddpicturePage } from './addpicture/addpicture.page';
import { AddfettishPage } from './addfettish/addfettish.page';
import { ConnectivityService } from '../../service/connectivity.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  db = firebase.firestore();
  storage = firebase.storage().ref();

  user = {
    name: '',
    surname: '',
    image: '',
    contact: '',
    status: '',
    gender: '',
    starsign: '',
    location: '',
    year: '',
    online: false,
    isMobileOnline: true
  };

  userID = firebase.auth().currentUser.uid;

  userOnline: boolean;

  aboutme

  // Basics
  gender;
  height;
  weight;
  eyecolour;
  bodytype;
  haircolor
  bodyart;
  lookingfor;
  turnoff;

  // Personality
  status;
  ethnicity;
  living;
  drinkinghabits;
  education;
  children;
  smokinghabits;
  sexdrive;

  userProfile = [];
  Profiles = [];
  Pictures = [];

  kamaHeart = [];
  kamaDone = [];
  kamaFavorate = [];
  kamaHappy = [];
  kamaSad = [];

  private subscriptions: SubscriptionLike[] = [];

  // slides
  slideOpts = {
    slidesPerView: 3,
    freeMode: false,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

  dummy: any = [ "dummy1", "dummy2", "dummy3", "dummy4", "dummy5"];

  constructor(
    private menu: MenuController,
    private modalController: ModalController,
    public Alert: AlertController,
    public connectivityProvider: ConnectivityService
  ) {
    this.getUser();
    this.getProfile();
    this.getPictures();

    this.getHeartkama();
    this.getDonekama();
    this.getFavoratekama();
    this.getHappykama();
    this.getSadkama();
    // this.getSharekama();

    this.checkOnline();
   }

  ngOnInit() {
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getUser();
      event.target.complete();
    }, 500);
  }

  checkOnline() {
    this.connectivityProvider.appIsOnline$.subscribe(online => {
      // console.log('is app online?',online);
      
      if (online) {
        this.userOnline = true;
      } else {
        this.userOnline = false;
      }
    })
  }

  getUser() {
    this.db.collection('users').doc(firebase.auth().currentUser.uid).onSnapshot(Snapshop => {
      this.userProfile = [];
      // this.user.name = Snapshop.data().name;
      // this.user.surname = Snapshop.data().surname;
      // this.user.contact = Snapshop.data().contact;
      // this.user.image = Snapshop.data().image; 
      // this.user.location = Snapshop.data().location; 
      // this.user.year = Snapshop.data().yaer; 
      // this.user.gender = Snapshop.data().gender; 
      // this.user.starsign = Snapshop.data().startsign; 
     
      this.userProfile.push(Snapshop.data())
      // console.log(this.userProfile);
   });
  }

  getProfile() {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid).onSnapshot(Snapshop => {
      this.Profiles = [];
     
      this.Profiles.push(Snapshop.data())
      // console.log(this.Profiles);

      this.aboutme = Snapshop.data().aboutme;
      // console.log(this.aboutme);
      
   });
  }

  // about me
  saveaboutme() {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid)
    .update({ aboutme: this.aboutme })
  }

  getPictures() {
    this.db.collection('usermedia').doc(firebase.auth().currentUser.uid).collection('mypiccs')
    .onSnapshot(Snapshot => {
      this.Pictures = [];
      Snapshot.forEach(element => {
        this.Pictures.push(element.data());
        // console.log(this.Pictures);
      })
    })
  }

  async presentAlertDeletePics(id) {
    // console.log(id);
    const alert = await this.Alert.create({
      header: 'Warning!',
      message: '<strong>Are you sure you want to Delete this Pic</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yep',
          handler: () => {
            this.deletePic(id);
          }
        }
      ]
    });
    await alert.present();
  }

  deletePic(id) {
    this.db.collection('usermedia').doc(firebase.auth().currentUser.uid).collection('mypiccs').doc(id).delete();
    // console.log('Pic Deleted');
  }

  getHeartkama() {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid).collection('kamaheart').onSnapshot(Snapshop => {
      this.kamaHeart = [];

      Snapshop.forEach(element => {
        this.kamaHeart.push(element.data())
        // console.log(this.kamaHeart);
      })
   });
  }

  async presentAlertDeleteHeart(id) {
    // console.log(id);
    const alert = await this.Alert.create({
      header: 'Warning!',
      message: '<strong>Are you sure you want to Delete this Pic</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yep',
          handler: () => {
            this.deleteHeartKama(id);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteHeartKama(id) {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid).collection('kamaheart').doc(id).delete();
    // console.log('Pic Deleted');
  }

  getDonekama() {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid).collection('kamadone').onSnapshot(Snapshop => {
      this.kamaDone = [];

      Snapshop.forEach(element => {
        this.kamaDone.push(element.data())
        // console.log(this.kamaDone);
      })
   });
  }

  async presentAlertDeleteDone(id) {
    // console.log(id);
    const alert = await this.Alert.create({
      header: 'Warning!',
      message: '<strong>Are you sure you want to Delete this Pic</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yep',
          handler: () => {
            this.deleteDoneKama(id);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteDoneKama(id) {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid).collection('kamadone').doc(id).delete();
    // console.log('Pic Deleted');
  }

  getFavoratekama() {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid).collection('kamafavorate').onSnapshot(Snapshop => {
      this.kamaFavorate = [];

      Snapshop.forEach(element => {
        this.kamaFavorate.push(element.data())
        // console.log(this.kamaFavorate);
      })
   });
  }

  async presentAlertDeleteFavorate(id) {
    // console.log(id);
    const alert = await this.Alert.create({
      header: 'Warning!',
      message: '<strong>Are you sure you want to Delete this Pic</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yep',
          handler: () => {
            this.deleteFavKama(id);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteFavKama(id) {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid).collection('kamafavorate').doc(id).delete();
    // console.log('Pic Deleted');
  }

  getHappykama() {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid).collection('kamahappy').onSnapshot(Snapshop => {
      this.kamaHappy = [];

      Snapshop.forEach(element => {
        this.kamaHappy.push(element.data())
        // console.log(this.kamaHappy);
      })
   });
  }

  async presentAlertDeleteHappy(id) {
    // console.log(id);
    const alert = await this.Alert.create({
      header: 'Warning!',
      message: '<strong>Are you sure you want to Delete this Pic</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yep',
          handler: () => {
            this.deleteHappyKama(id);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteHappyKama(id) {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid).collection('kamahappy').doc(id).delete();
    // console.log('Pic Deleted');
  }

  getSadkama() {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid).collection('kamasad').onSnapshot(Snapshop => {
      this.kamaSad = [];

      Snapshop.forEach(element => {
        this.kamaSad.push(element.data())
        // console.log(this.kamaSad);
      })
   });
  }

  async presentAlertDeleteSad(id) {
    // console.log(id);
    const alert = await this.Alert.create({
      header: 'Warning!',
      message: '<strong>Are you sure you want to Delete this Pic</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yep',
          handler: () => {
            this.deleteSadKama(id);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteSadKama(id) {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid).collection('kamasad').doc(id).delete();
    // console.log('Pic Deleted');
  }

  getSharekama() {
    // this.db.collection('profiles').doc(firebase.auth().currentUser.uid).collection('kamaheart')
      
  }

  openPreview(image) {
    this.modalController.create({
      component: ImagemodalPage,
      componentProps: {
        image: image
      }
    }).then(modal => modal.present());
  }

  addPictures() {
    this.modalController.create({
      component: AddpicturePage,
      componentProps: {
        userID: this.userID
      }
    }).then(modal => modal.present());
  }

  addFettish() {
    this.modalController.create({
      component: AddfettishPage,
      componentProps: {
        userID: this.userID
      }
    }).then(modal => modal.present());
  }

  // ////////////////////////////////////////////////////////////////////////////////////////////

  // basics
  setHeight(event) {
    this.height = event.detail.value;
    // console.log(this.height);

    this.updateHeight(this.height);
  }

  updateHeight(height) {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid)
    .update({ height: height });
    // console.log('Height Updates', height);
  }

  setWeight(event) {
    this.weight = event.detail.value;
    // console.log(this.weight);

    this.updateWeight(this.weight);
  }

  updateWeight(weight) {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid)
    .update({ weight: weight });
    // console.log('Weight Updates', weight);
  }

  setEyeColor(event) {
    this.eyecolour = event.detail.value;
    // console.log(this.eyecolour);

    this.updateEyeColor(this.eyecolour);
  }

  updateEyeColor(eyecolour) {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid)
    .update({ eyecolour: eyecolour });
    // console.log('Eye Colour Updates', eyecolour);
  }

  setBodyType(event) {
    this.bodytype = event.detail.value;
    // console.log(this.bodytype);

    this.updateBodyType(this.bodytype);
  }

  updateBodyType(bodytype) {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid)
    .update({ bodytype: bodytype });
    // console.log('Body Type Updates', bodytype);
  }

  setHairColor(event) {
    this.haircolor = event.detail.value;
    // console.log(this.haircolor);

    this.updateHairColor(this.haircolor);
  }

  updateHairColor(haircolor) {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid)
    .update({ haircolor: haircolor });
    // console.log('Hair Color Updates', haircolor);
  }

  setBodyArt(event) {
    this.bodyart = event.detail.value;
    // console.log(this.bodyart);

    this.updateBodyArt(this.bodyart);
  }

  updateBodyArt(bodyart) {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid)
    .update({ bodyart: bodyart });
    // console.log('Body Art Updates', bodyart);
  }

  setLookingFor(event) {
    this.lookingfor = event.detail.value;
    // console.log(this.lookingfor);

    this.updateLookingFor(this.lookingfor);
  }

  updateLookingFor(lookingfor) {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid)
    .update({ lookingfor: lookingfor });
    // console.log('Looking For Updates', lookingfor);
  }

  setTurnOff(event) {
    this.turnoff = event.detail.value;
    // console.log(this.turnoff);

    this.updateTurnOff(this.turnoff);
  }

  updateTurnOff(turnoff) {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid)
    .update({ turnoff: turnoff });
    // console.log('Turn Off Updates', turnoff);
  }

  // personality
  setStatus(event) {
    this.status = event.detail.value;
    // console.log(this.status);

    this.updateStatus(this.status);
  }

  updateStatus(status) {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid)
    .update({ status: status });
    // console.log('Status', status);
  }

  setEthnicity(event) {
    this.ethnicity = event.detail.value;
    // console.log(this.ethnicity);

    this.updateEthnicity(this.ethnicity);
  }

  updateEthnicity(ethnicity) {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid)
    .update({ ethnicity: ethnicity });
    // console.log('Ethnicity', ethnicity);
  }

  setLiving(event) {
    this.living = event.detail.value;
    // console.log(this.living);

    this.updateLiving(this.living);
  }

  updateLiving(living) {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid)
    .update({ living: living });
    // console.log('Living', living);
  }

  setDrinkingHabit(event) {
    this.drinkinghabits = event.detail.value;
    // console.log(this.drinkinghabits);

    this.updateDrinkingHabits(this.drinkinghabits);
  }

  updateDrinkingHabits(drinkinghabits) {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid)
    .update({ drinkinghabits: drinkinghabits });
    // console.log('Drinking Habits', drinkinghabits);
  }

  setEducation(event) {
    this.education = event.detail.value;
    // console.log(this.education);

    this.updateEducation(this.education);
  }

  updateEducation(education) {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid)
    .update({ education: education });
    // console.log('Education', education);
  }

  setChildren(event) {
    this.children = event.detail.value;
    // console.log(this.children);

    this.updateChildren(this.children);
  }

  updateChildren(children) {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid)
    .update({ children: children });
    // console.log('Children', children);
  }

  setSmokingHabits(event) {
    this.smokinghabits = event.detail.value;
    // console.log(this.smokinghabits);

    this.updateSmokingHabits(this.smokinghabits);
  }

  updateSmokingHabits(smokinghabits) {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid)
    .update({ smokinghabit: smokinghabits });
    // console.log('Smoking Habits', smokinghabits);
  }

  setSexDrive(event) {
    this.sexdrive = event.detail.value;
    // console.log(this.sexdrive);

    this.updateSexDrive(this.sexdrive);
  }

  updateSexDrive(sexdrive) {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid)
    .update({ sexdrive: sexdrive });
    // console.log('Sex Drive', sexdrive);
  }

  ionViewDidEnter() {
    this.menu.enable(true);
  }

  ionViewDidLeave() {
    this.menu.enable(false);
  }

}
