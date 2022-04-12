import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { ToastController } from '@ionic/angular';
import { ImagemodalPage } from '../imagemodal/imagemodal.page';

@Component({
  selector: 'app-clientbookings',
  templateUrl: './clientbookings.page.html',
  styleUrls: ['./clientbookings.page.scss'],
})
export class ClientbookingsPage implements OnInit {

  db = firebase.firestore();
  storage = firebase.storage().ref();
  userID = firebase.auth().currentUser.uid;

  name;
  location;
  mycomment;
  hookid;
  id;
  money;
  date;
  type;
  status;
  results;

  bookings = [];
  bookingsNo;

  active = [];
  activeNo;

  history = [];
  historyNo;

  segmentModel = "bookings";

  constructor(
    private router: Router,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
    private toastController: ToastController,
    public alertController: AlertController,
    private modalController: ModalController,
  ) {
    this.getBookings();
    this.getActive();
    this.getHistory();
   }

  ngOnInit() {
  }

  async getBookings() {
    const loading = await this.loadingController.create({
      spinner: 'lines',
      message: 'Loading Bookings...',
      duration: 2000,
      translucent: true,
    });
    await loading.present();

    this.bookings = []

    this.db.collection('bookings').doc(this.userID).collection('mybookings')
    .onSnapshot(snap => {
      snap.forEach(element => {
        this.bookings.push(element.data());
        this.bookingsNo = this.bookings.length;

        console.log(this.bookings);
        console.log(this.bookingsNo);

        loading.dismiss();
        
      });
    })
  }

  getActive() {
    this.db.collection('bookings').doc(this.userID).collection('active')
    .onSnapshot(snap => {
      snap.forEach(element => {
        this.active.push(element.data());
        this.activeNo = this.active.length;
        console.log(this.active);
      });
    })
  }

  getHistory() {
    this.db.collection('bookings').doc(this.userID).collection('history')
    .onSnapshot(snap => {
      snap.forEach(element => {
        this.history.push(element.data());
        this.historyNo = this.history.length;
        console.log(this.history);
      });
    })
  }

  presentAlertAddCounter() {
    
  }

  openPreview(image) {
    this.modalController.create({
      component: ImagemodalPage,
      componentProps: {
        image: image
      }
    }).then(modal => modal.present());
  }

  segmentChanged(event){
    console.log(this.segmentModel);
    
    // console.log(event);
  }

  async goToProfile() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/tabs/profile').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  ionViewDidEnter() {
    this.menuCtrt.enable(false);
  }

}
