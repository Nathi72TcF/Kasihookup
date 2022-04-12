import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { ToastController } from '@ionic/angular';
import { ImagemodalPage } from '../imagemodal/imagemodal.page';
import { element } from 'protractor';
import * as moment from 'moment';

@Component({
  selector: 'app-hookbookings',
  templateUrl: './hookbookings.page.html',
  styleUrls: ['./hookbookings.page.scss'],
})
export class HookbookingsPage implements OnInit {

  db = firebase.firestore();
  storage = firebase.storage().ref();
  userID = firebase.auth().currentUser.uid;

  // hook
  clientname;
  clientsurname;
  clientid;
  clientcomment;
  money;
  date;
  type;
  status;
  results;

  acceptdate;

  // client
  bookname;
  booklocation;
  bookmycomment;
  bookhookid;
  bookmoney;
  bookdate;
  booktype;
  bookstatus;
  bookresults;

  activename;
  activelocation;
  activemycomment;
  activehookid;
  activemoney;
  activedate;
  activetype;
  activestatus;
  activeresults;

  activedate2;

  bookings = [];
  bookingsNo;

  bookingsaccept = [];
  bookingsacceptNo;

  bookingshistory = [];
  bookingshistoryNo;

  segmentModel = "new";

  ErrorMessage;

  hookcoin;
  clientcoin;
  gethookcoin;
  getclientcoin;

  kasihook20coin;
  kasihooktax;

  hookcointax;
  gethookcointax;

  constructor(
    private router: Router,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
    private toastController: ToastController,
    public alertController: AlertController,
    private modalController: ModalController,
  ) {
    this.getBookings();
    this.getBookingsAccepted();
    this.getBookingsHistory();
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

    this.db.collection('bookings').doc(this.userID).collection('newbookings')
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

  async getBookingsAccepted() {
    const loading = await this.loadingController.create({
      spinner: 'lines',
      message: 'Loading Active Bookings...',
      duration: 2000,
      translucent: true,
    });
    await loading.present();

    this.bookingsaccept = []

    this.db.collection('bookings').doc(this.userID).collection('accepted')
    .onSnapshot(snap => {
      snap.forEach(element => {
        this.bookingsaccept.push(element.data());
        this.bookingsacceptNo = this.bookingsaccept.length;

        console.log(this.bookingsaccept);
        console.log(this.bookingsacceptNo);

        loading.dismiss();
        
      });
    })
  }

  async getBookingsHistory() {
    const loading = await this.loadingController.create({
      spinner: 'lines',
      message: 'Loading Bookings History...',
      duration: 2000,
      translucent: true,
    });
    await loading.present();

    this.bookingshistory = []

    this.db.collection('bookings').doc(this.userID).collection('history')
    .onSnapshot(snap => {
      snap.forEach(element => {
        this.bookingshistory.push(element.data());
        this.bookingshistoryNo = this.bookingshistory.length;

        console.log(this.bookingshistory);
        console.log(this.bookingshistoryNo);

        loading.dismiss();
        
      });
    })
  }

  async presentAlertAddClient(id) {
    this.collectUserInfor(id);
    this.collectClientInfor(id);
    console.log(id);
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: '<strong>Are you sure you want to Accept this Hookup. Note Kasihookup takes 20% of this transaction</strong>??',
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
              this.addToAccepted(id);
              this.AcceptClient(id);
              this.goToProfile();
            }
          }
        ]
      });
      await alert.present();
  }

  addToAccepted(id) {
    this.kasihook20coin = this.money * 20 / 100;
    this.db.collection('bookings').doc(this.userID).collection('accepted').doc(id)
    .set({
        clientname: this.clientname,
        id: id,
        clientsurname: this.clientsurname,
        clientid: this.clientid,
        clientcomment: this.clientcomment,
        money: this.money,
        kasitax: this.kasihook20coin,
        opendate: this.date,
        acceptdate: moment(Date.now()).format('MMMM Do YYYY'),
        type: this.type,
        status: 'Accepted',
        results: 'Use chat to contact client',
    })

    this.deleteNew(id)

    this.ErrorMessage = 'Hookup Accepted.';
    this.presentAlert(this.ErrorMessage);
  }

  async presentAlertDeleteClient(id) {
    // console.log(id);
    this.collectUserInfor(id);
    this.collectClientInfor(id);

      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: '<strong>Are you sure you want to Remove this Hookup</strong>??',
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
              this.deleteNew(id);
              this.hookWallet();
              this.clientWallet();
            }
          }
        ]
      });
      await alert.present();
  }

  deleteNew(id) {
    this.db.collection('bookings').doc(this.userID).collection('newbookings').doc(id).delete();
  }

  hookWallet() {
    this.db.collection('tcfwallet').doc(this.bookhookid)
    .onSnapshot(snapshot => {
      this.gethookcoin = snapshot.data().tcfcoin;

      // console.log(this.gethookcoin);
      
    })
  }

  clientWallet() {
    this.db.collection('tcfwallet').doc(this.clientid)
    .onSnapshot(snapshot => {
      this.getclientcoin = snapshot.data().tcfcoin;

      // console.log(this.getclientcoin);
      this.moneycalc();
      
    })
  }

  moneycalc() {
    this.hookcoin = this.gethookcoin - this.money;
    console.log(this.hookcoin);

    this.clientcoin = this.getclientcoin - this.bookmoney;
    console.log(this.clientcoin);

    this.updateClientwallete(this.clientcoin);
    this.updateHookwallete(this.hookcoin);
    
  }

  updateClientwallete(clientcoin) {
    this.db.collection('tcfwallet').doc(this.clientid)
    .update({
      tcfcoin: clientcoin
    })
  }

  updateHookwallete(hookcoin) {
    this.db.collection('tcfwallet').doc(this.bookhookid)
    .update({
      tcfcoin: hookcoin
    })
  }

  AcceptClient(id) {
    this.db.collection('bookings').doc(this.clientid).collection('active').doc(id)
    .set({
      name: this.bookname,
      location: this.booklocation,
      mycomment: this.bookmycomment,
      hookid: this.bookhookid,
      id: id,
      money: this.bookmoney,
      date: this.bookdate,
      activedate: moment(Date.now()).format('MMMM Do YYYY'),
      type: this.booktype,
      status: 'Active',
      results: 'Use chat to contact client'
    })

    this.deleteClientBooking(id);
  }

  deleteClientBooking(id) {
    this.db.collection('bookings').doc(this.clientid).collection('mybookings').doc(id).delete()
  }

  async presentAlertDone(id) {
    console.log(id);
    this.collectInfor(id);
    this.getActive(id);

      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: '<strong>Are you sure you want to Close this Hookup</strong>??',
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
              this.closeHookup(id);
              this.closeclientbooking(id);
            }
          }
        ]
      });
      await alert.present();
  }

  closeHookup(id) {
    this.db.collection('bookings').doc(this.userID).collection('history').doc(id)
    .set({
      clientname: this.clientname,
      clientsurname: this.clientsurname,
      clientid: this.clientid,
      clientcomment: this.clientcomment,
      money: this.money,
      kasitax: this.kasihook20coin,
      date: this.date,
      type: this.type,
      status: 'Done',
      results: 'Hookup Done',
  }).then(res => {
    this.gethookwalletetax();
  })

  this.deleteActive(id);

  this.ErrorMessage = 'Hookup Done.';
    this.presentAlert(this.ErrorMessage);

  }

  gethookwalletetax() {
    this.db.collection('tcfwallet').doc(this.activehookid)
      .onSnapshot(element => {
        this.gethookcointax = element.data().tcfcoin;
        console.log(this.gethookcointax);

        this.updategethookwalletetax(this.gethookcointax)
      })
  }

  updategethookwalletetax(gethookcointax) {
    this.hookcointax = gethookcointax - this.kasihook20coin;
    this.db.collection('tcfwallet').doc(this.activehookid)
      .update({
        tcfcoin: this.hookcointax
      })
  }

  deleteActive(id) {
    this.db.collection('bookings').doc(this.userID).collection('accepted').doc(id).delete()
  }

  closeclientbooking(id) {
    this.db.collection('bookings').doc(this.clientid).collection('history').doc(id)
    .set({
      name: this.activename,
      location: this.activelocation,
      mycomment: this.activemycomment,
      hookid: this.activehookid,
      id: id,
      money: this.activemoney,
      date: this.activedate,
      activedate: this.activetype,
      closeddate: moment(Date.now()).format('MMMM Do YYYY'),
      type: this.booktype,
      status: 'Done',
      results: 'Hookup Done'
    })

    this.deleteclientbooking(id);
  }

  deleteclientbooking(id) {
    this.db.collection('bookings').doc(this.clientid).collection('active').doc(id).delete();
  }

  openPreview(image) {
    this.modalController.create({
      component: ImagemodalPage,
      componentProps: {
        image: image
      }
    }).then(modal => modal.present());
  }

  // To accept booking

  // collect new hook data (hookup)
  collectUserInfor(id) {
    this.db.collection('bookings').doc(this.userID).collection('newbookings').doc(id)
    .onSnapshot(element => {
        this.clientname = element.data().clientname;
        this.clientsurname = element.data().clientsurname;
        this.clientid = element.data().clientid;
        this.clientcomment = element.data().clientcomment;
        this.money = element.data().money;
        this.date = element.data().date;
        this.type = element.data().type;
        this.status = element.data().status;
        this.results = element.data().results;

        // console.log(this.clientname);
        // console.log(this.clientsurname);
        // console.log(this.clientid);
        // console.log(this.clientcomment);
        // console.log(this.money);
        // console.log(this.date);
        // console.log(this.type);
        // console.log(this.status);
        // console.log(this.results);
    })
  }

  // collect new booking data (client)
  collectClientInfor(id) {
    this.db.collection('bookings').doc(this.userID).collection('mybookings').doc(id)
    .onSnapshot(element => {
      this.bookname = element.data().name;
      this.booklocation = element.data().location;
      this.bookmycomment = element.data().mycomment;
      this.bookhookid = element.data().hookid;
      this.bookmoney = element.data().money;
      this.bookdate = element.data().date;
      this.booktype = element.data().type;
      this.bookstatus = element.data().status;
      this.bookresults = element.data().results;

      // console.log(this.bookname);
      // console.log(this.booklocation);
      // console.log(this.bookmycomment);
      // console.log(this.bookhookid);
      // console.log(this.bookmoney);
      // console.log(this.bookdate);
      // console.log(this.booktype);
      // console.log(this.bookstatus);
      // console.log(this.bookresults);
    })
  }

  // to history
  collectInfor(id) {
    this.db.collection('bookings').doc(this.userID).collection('accepted').doc(id)
    .onSnapshot(element => {
        this.clientname = element.data().clientname;
        this.clientsurname = element.data().clientsurname;
        this.clientid = element.data().clientid;
        this.clientcomment = element.data().clientcomment;
        this.kasihooktax = element.data().kasihook20coin;
        this.money = element.data().money;
        this.date = element.data().date;
        this.acceptdate = element.data().acceptdate;
        this.type = element.data().type;
        this.status = element.data().status;
        this.results = element.data().results;

        // console.log(this.clientname);
        // console.log(this.clientsurname);
        // console.log(this.clientid);
        // console.log(this.clientcomment);
        // console.log(this.money);
        // console.log(this.date);
        // console.log(this.type);
        // console.log(this.status);
        // console.log(this.results);

    })
  }

  getActive(id) {
    this.db.collection('bookings').doc(this.userID).collection('active')
    .onSnapshot(snap => {
      snap.forEach(element => {
        this.activename = element.data().name;
        this.activelocation = element.data().location;
        this.activemycomment = element.data().mycomment;
        this.activehookid = element.data().hookid;
        this.activemoney = element.data().money;
        this.activedate = element.data().date;
        this.activetype = element.data().type;
        this.activestatus = element.data().status;
        this.activeresults = element.data().results;
      });
    })
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

  segmentChanged(event){
    console.log(this.segmentModel);
    
    // console.log(event);
  }

  async presentAlert(data) {
    const alert = await this.alertController.create({
      header: 'Eish!!!',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }

  ionViewDidEnter() {
    this.menuCtrt.enable(false);
  }

}
