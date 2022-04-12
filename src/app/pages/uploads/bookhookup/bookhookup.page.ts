import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { MenuController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImagemodalPage } from '../../imagemodal/imagemodal.page';
import { KasiService } from '../../../service/kasi.service';
import { Platform } from '@ionic/angular';
import * as moment from 'moment';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { IonRadioGroup } from '@ionic/angular';

@Component({
  selector: 'app-bookhookup',
  templateUrl: './bookhookup.page.html',
  styleUrls: ['./bookhookup.page.scss'],
})
export class BookhookupPage implements OnInit {

  @ViewChild('radioGroup') radioGroup: IonRadioGroup

  db = firebase.firestore();
  storage = firebase.storage().ref();
  userID = firebase.auth().currentUser.uid;

  girls = [];
  searchResultgirls = [];
  girlsNo;

  id: any;
  time: any;

  hookprofile = {
    image: '',
    name: null,
    location: null,
    contact: null,
    host: null,
    content: null,
    hook30mn: null,
    hook1hr: null,
    hook2hr: null,
    hooknight: null,
    like: null,
    comments: null
    };

    image;
    imagePost = [];
    imagePostNo;

    resultsID;

  dummy: any = [ "dummy1", "dummy2", "dummy3", "dummy4", "dummy5"];

  isimgLoaded: boolean = false;

  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup:any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem:any;

  radio_list = [
    {
      id: '1',
      name: '30min',
      value: '30min',
      text: '30 Min',
      disabled: false,
      checked: false,
      color: 'primary'
    }, {
      id: '2',
      name: '1hr',
      value: '1hr',
      text: '1 Hour',
      disabled: false,
      checked: false,
      color: 'primary'
    }, {
      id: '3',
      name: '2hr',
      value: '2hr',
      text: '2 Hours',
      disabled: false,
      checked: false,
      color: 'primary'
    },
    {
      id: '4',
      name: 'night',
      value: 'night',
      text: 'Whole Night',
      disabled: false,
      checked: false,
      color: 'primary'
    }
  ];

  selectTime;
  zaka;
  Total;
  comment;

  clientName;
  clientSurname;
  clientImage;

  confirmpassword;
  ErrorMessage;

  // manage wallete
  myCoin;
  sentCoin;
  senttcfcoin;
  hookcoin;

  RegisterForm: FormGroup;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    public kasiservice: KasiService,
    private menu: MenuController,
    public Alert: AlertController,
    private router: Router,
    public formGroup: FormBuilder,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
    private afs: AngularFirestore,
    private platform: Platform,
  ) {
    this.RegisterForm = formGroup.group({
      comment : ['', [Validators.required]],
    });

    this.getCurrentUser();
    this.myUserWallet();
    this.myHookWallet();
   }

  ngOnInit() {
    this.id = this.navParams.get('id');
    this.time = this.navParams.get('time');
    console.log(this.time);

    this.getHoohups(this.id);
  }

  async getHoohups(id) {
    const loading = await this.loadingController.create({
      spinner: 'lines',
      message: 'Loading Booking...',
      duration: 2000,
      translucent: true,
    });
    await loading.present();

    this.db.collection('hookupgirls').doc(id).onSnapshot(Snapshop => {
      this.girls = [];

      this.girls.push(Snapshop.data());

        // console.log(this.girls);

        this.hookprofile.name = Snapshop.data().name;
        this.hookprofile.location = Snapshop.data().location;
        this.hookprofile.contact = Snapshop.data().contact;
        this.hookprofile.host = Snapshop.data().host;
        this.hookprofile.content = Snapshop.data().content;
        this.hookprofile.hook30mn = Snapshop.data().hook30mn;
        this.hookprofile.hook1hr = Snapshop.data().hook1hr;
        this.hookprofile.hook2hr = Snapshop.data().hook2hr;
        this.hookprofile.hooknight = Snapshop.data().hooknight;
        this.hookprofile.like = Snapshop.data().like;
        this.hookprofile.comments = Snapshop.data().comments;
        this.imagePost.push(Snapshop.data())

        // this.image = this.imagePost;

        this.imagePostNo = this.imagePost.length;

        // console.log(this.hookprofile.name);
        // console.log(this.hookprofile.location);
        // console.log(this.hookprofile.contact);
        // console.log(this.hookprofile.host);
        // console.log(this.hookprofile.content);
        // console.log(this.hookprofile.hook30mn);
        // console.log(this.hookprofile.hook1hr);
        // console.log(this.hookprofile.hook2hr);
        // console.log(this.hookprofile.hooknight);
        // console.log(this.hookprofile.like);
        // console.log(this.hookprofile.comments);
        // console.log(this.imagePost);
        // console.log(this.image);

        loading.dismiss();

   });
  }

  // ////////////////////////////////////////////////////////////

  // Bookings

  book() {
    this.db.collection('bookings').doc(this.id).collection('newbookings').add({
      clientname: this.clientName,
      clientsurname: this.clientSurname,
      clientid: this.userID,
      clientcomment: this.comment,
      money: this.zaka,
      date: moment(this.time).format('MMMM Do YYYY'),
      type: this.selectTime,
      status: 'New',
      results: 'waiting for reply'
    }).then(res => {
      this.db.collection('bookings').doc(this.id).collection('newbookings').doc(res.id)
      .update({
        id: res.id
      })
      this.resultsID = res.id;
      this.bookhistory();
    })
  }

  bookhistory() {
    this.db.collection('bookings').doc(this.userID).collection('mybookings').doc(this.resultsID).set({
      name: this.hookprofile.name,
      location: this.hookprofile.location,
      mycomment: this.comment,
      hookid: this.id,
      id: this.resultsID,
      money: this.zaka,
      date: moment(this.time).format('MMMM Do YYYY'),
      type: this.selectTime,
      status: 'New',
      results: 'waiting for reply'
    }).then(res => {
      this.ErrorMessage = 'New Booking Sent. Wait for the hookup to Accept your booking, Check My Bookings to view Bookings.';
      this.presentAlert(this.ErrorMessage);
      this.close();
    })
  }

  getCurrentUser() {
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).onSnapshot(snapshot => {
      // console.log(snapshot);

      this.clientName = snapshot.data().name;
      this.clientSurname = snapshot.data().surname;
      this.clientImage = snapshot.data().image;
    })
  }

  booking() {
    if (this.selectTime == '') {
      this.ErrorMessage = 'Choose Hook Up Time.';
      this.presentAlert(this.ErrorMessage);
    } else {
      if (this.senttcfcoin < this.zaka) {
        this.ErrorMessage = 'You dont have enough coins for this hookup. Please reload or Contact Agent to Reload.';
        this.presentAlert(this.ErrorMessage);
      } else if (this.senttcfcoin > this.zaka) {
        this.CalculateCoin();
      }
    }
  }

  CalculateCoin() {
    this.myCoin = this.senttcfcoin - this.zaka;
    // console.log(this.myCoin);

    this.updateMyCoin();
  }

  updateMyCoin() {
    this.db.collection('tcfwallet').doc(this.userID)
    .update({
      tcfcoin: this.myCoin
    })
    // console.log('updated');
    this.book();
    this.calculatehookzaka()
  }

  calculatehookzaka() {
    this.sentCoin = this.hookcoin + this.zaka;
    this.uphookwallete()
  }

  uphookwallete() {
    this.db.collection('tcfwallet').doc(this.id)
    .update({
      tcfcoin: this.sentCoin
    })
  }

  myUserWallet() {
    this.db.collection('tcfwallet').doc(this.userID)
    .onSnapshot(snapshot => {
      this.senttcfcoin = snapshot.data().tcfcoin;

      // console.log(this.senttcfcoin);
      
    })
  }

  myHookWallet() {
    this.db.collection('tcfwallet').doc(this.id)
    .onSnapshot(snapshot => {
      this.hookcoin = snapshot.data().tcfcoin;

      // console.log(this.hookcoin);
      
    })
  }

  // ////////////////////////////////////////

  radioGroupChange(event) {
    // console.log("radioGroupChange",event.detail);
    this.selectedRadioGroup = event.detail;

    this.selectTime = event.detail.value;

    if (this.selectTime == '30min') {
      this.zaka = this.hookprofile.hook30mn;
      this.Total = this.zaka / 10
    } else if (this.selectTime == '1hr') {
      this.zaka = this.hookprofile.hook1hr;
      this.Total = this.zaka / 10
    } else if (this.selectTime == '2hr') {
      this.zaka = this.hookprofile.hook2hr;
      this.Total = this.zaka / 10
    } else if (this.selectTime == 'night') {
      this.zaka = this.hookprofile.hooknight;
      this.Total = this.zaka / 10
    }

    // console.log(this.selectTime);
    // console.log("Coin", this.zaka);
    // console.log("Zaka R", this.Total);
    
  }

  radioFocus() {
    // console.log("radioFocus");
  }
  radioSelect(event) {
    // console.log("radioSelect",event.detail);
    this.selectedRadioItem = event.detail;
  }
  radioBlur() {
    // console.log("radioBlur");
  }

  selectTwo(){
    this.radioGroup.value = 'radio_2'
  }

  // ///////////////////////////////////////

  async presentAlert(data) {
    const alert = await this.Alert.create({
      header: 'Eish!!!',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }

  openPreview(image) {
    this.modalController.create({
      component: ImagemodalPage,
      componentProps: {
        image: image
      }
    }).then(modal => modal.present());
  }

  close() {
    this.modalController.dismiss();
  }

}
