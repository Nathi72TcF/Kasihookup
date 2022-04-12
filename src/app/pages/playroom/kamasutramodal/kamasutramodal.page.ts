import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import { element } from 'protractor';
import { Platform, MenuController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-kamasutramodal',
  templateUrl: './kamasutramodal.page.html',
  styleUrls: ['./kamasutramodal.page.scss'],
})
export class KamasutramodalPage implements OnInit {

  db = firebase.firestore();
  storage = firebase.storage().ref();
  userid = firebase.auth().currentUser.uid;

  image: any;
  id;

  name;
  surname;
  userimage;
  resultID;

  @ViewChild('slider', { read: ElementRef })slider: ElementRef;

  sliderOpts = {
    zoom: {
      maxRatio: 3
    }
  }

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private router: Router,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
    public Alert: AlertController,
  ) { }

  ngOnInit() {
    this.image = this.navParams.get('image');
    // console.log(this.image);

    this.getKama(this.image);
    this.getUsers()
  }

  getKama(image) {
    this.db.collection('kamasutra').where('image', '==', image)
    .onSnapshot(snapshot => {
      snapshot.forEach(element => {
        this.id = element.data().id;
        // console.log(this.id);
      })
    })
  }

  async presentAlertAddPost() {
    // console.log(id);
    const alert = await this.Alert.create({
      header: 'Alert!',
      message: '<strong>Are you sure you want to Post this Kamasutra Position to your wall</strong> ???',
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
            this.addToMyPost();
          }
        }
      ]
    });
    await alert.present();
  }

  addToMyPost() {
    this.db.collection('post').add({
      content: 'Hmmmmmmmmmmm',
      userid: this.userid,
      name: this.name,
      surname: this.surname,
      userimage: this.userimage,
      image: this.image,
      comments: 0,
      likes: 0,
      date: moment(Date.now()).format('h:mm:ss a, MMMM Do YYYY')
    }).then(result => {
      // console.log(result);
      // console.log(result.id);
      this.resultID = result.id
      // console.log(resultID);
      this.db.collection('post').doc(result.id).update({
        id: this.resultID,
      })
      this.close();
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  getUsers() {
    this.db.collection('users').doc(this.userid).onSnapshot(snapshot => {
      // console.log(snapshot);
      
      this.name = snapshot.data().name;
      this.surname = snapshot.data().surname;
      this.userimage = snapshot.data().image
    })
  }

  // addcomment() {
  //   this.modalController.create({
  //     component: KamachatPage,
  //     componentProps: {
  //       id: this.id
  //     }
  //   })
  // }

  async presentAlertAddHeart() {
    // console.log(id);
    const alert = await this.Alert.create({
      header: 'Alert!',
      message: '<strong>Are you sure you want to add this position to Liked Kamasutra Position</strong> ???',
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
            this.addHeartKama();
          }
        }
      ]
    });
    await alert.present();
  }

  addHeartKama() {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid).collection('kamaheart').doc(this.id)
    .set({
      id: this.id,
      pic: this.image
    }).then(result => {
      this.close();
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  async presentAlertAddDone() {
    // console.log(id);
    const alert = await this.Alert.create({
      header: 'Alert!',
      message: '<strong>Are you sure you want to add this position to Done Kamasutra Position</strong> ???',
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
            this.addDoneKama();
          }
        }
      ]
    });
    await alert.present();
  }

  addDoneKama() {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid).collection('kamadone').doc(this.id)
    .set({
      id: this.id,
      pic: this.image
    }).then(result => {
      this.close();
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  async presentAlertAddFavorate() {
    // console.log(id);
    const alert = await this.Alert.create({
      header: 'Alert!',
      message: '<strong>Are you sure you want to add this position to my Favorate Kamasutra Position</strong> ???',
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
            this.addFavorateKama();
          }
        }
      ]
    });
    await alert.present();
  }

  addFavorateKama() {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid).collection('kamafavorate').doc(this.id)
    .set({
      id: this.id,
      pic: this.image
    }).then(result => {
      this.close();
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  async presentAlertAddHappy() {
    // console.log(id);
    const alert = await this.Alert.create({
      header: 'Alert!',
      message: '<strong>Does this Kamasutra Position make you Happy</strong> ???',
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
            this.addHappyKama();
          }
        }
      ]
    });
    await alert.present();
  }

  addHappyKama() {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid).collection('kamahappy').doc(this.id)
    .set({
      id: this.id,
      pic: this.image
    }).then(result => {
      this.close();
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  async presentAlertAddSad() {
    // console.log(id);
    const alert = await this.Alert.create({
      header: 'Alert!',
      message: '<strong>Does this Kamasutra Position make you Sad</strong> ???',
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
            this.assSadKama();
          }
        }
      ]
    });
    await alert.present();
  }

  assSadKama() {
    this.db.collection('profiles').doc(firebase.auth().currentUser.uid).collection('kamasad').doc(this.id)
    .set({
      id: this.id,
      pic: this.image
    }).then(result => {
      this.close();
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  // async goToChat() {
  //   const loading = await this.loadingController.create();
  //   await loading.present().then(() => {
  //     this.menuCtrt.close().then(() => {
  //       this.router.navigateByUrl('../kamachat', this.id).then(async () => {
  //         await loading.dismiss();
  //       });
  //     });
  //   });
  // }

  zoom(zoomIn: boolean) {
    let zoom = this.slider.nativeElement.swiper.zoom;
    if (zoomIn) {
      zoom.in();
    } else {
      zoom.out();
    }
  }

  close() {
    this.modalController.dismiss();
  }

}
