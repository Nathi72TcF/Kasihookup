import { Component, OnInit } from '@angular/core';
import { NgCalendarModule  } from 'ionic2-calendar';
import { CalendarComponent } from 'ionic2-calendar';
import { ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';

import firebase from 'firebase/compat/app';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { CalModalPageModule } from './../../girlmanang/cal-modal/cal-modal.module';

// frealy jolly image upload
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BookhookupPage } from '../bookhookup/bookhookup.page';

@Component({
  selector: 'app-calbook',
  templateUrl: './calbook.page.html',
  styleUrls: ['./calbook.page.scss'],
})
export class CalbookPage implements OnInit {

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  db = firebase.firestore();
  storage = firebase.storage().ref();
  userid = firebase.auth().currentUser.uid;

  id;

  hookprofile = {
    image: '',
    id: null,
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

    imagePost = [];
    imagePostNo;

  selectedDate = new Date();

  eventSource = [];
  viewTitle: string;

  events = [];
  component = [];
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  nothing = '';
 
  // selectedDate: Date;

  // //////////////

  period;
  times: any;
  timeArray: any;

  Start;
  End;

  msg;

  bookTime;

  constructor(
    private menu: MenuController,
    public Alert: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,

    // frealy jolly image uploadge,
    private database: AngularFirestore,

    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private modalCtrl: ModalController,
    public activatedRoute: ActivatedRoute,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.id);
    
    this.getHookbooking(this.id)
    this.getHoohups(this.id);

    this.times = 0;
   }

  ngOnInit() {
  }

  getHookbooking(id) {
    this.database.collection('bookedhooks').doc(id).collection('freetime')
    .snapshotChanges().subscribe(colSnap => {
      this.eventSource = [];

      colSnap.forEach(snap => {
        let event:any = snap.payload.doc.data();
        event.id = snap.payload.doc.id;
        event.startTime = event.startTime.toDate();
        event.endTime = event.endTime.toDate();
        // console.log(event);
        this.eventSource.push(event);
      });
    })
  }

  getHoohups(id) {
    this.db.collection('hookupgirls').doc(id).onSnapshot(element => {
      this.hookprofile.id = element.data().id;
        this.hookprofile.name = element.data().name;
        this.hookprofile.location = element.data().location;
        this.hookprofile.contact = element.data().contact;
        this.hookprofile.host = element.data().host;
        this.hookprofile.content = element.data().content;
        this.hookprofile.hook30mn = element.data().hook30mn;
        this.hookprofile.hook1hr = element.data().hook1hr;
        this.hookprofile.hook2hr = element.data().hook2hr;
        this.hookprofile.hooknight = element.data().hooknight;
        this.hookprofile.like = element.data().like;
        this.hookprofile.comments = element.data().comments;
        this.imagePost.push(element.data().image)

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
        // console.log(this.imagePostNo);

        // console.log(this.girls);
        // console.log(this.girlsNo);

        // this.datezz = moment(element.data().date).endOf('day').fromNow();
      })
  }

  openBooking(id) {
    this.modalCtrl.create({
      component: BookhookupPage,
      componentProps: {
        id: id,
        time: this.bookTime
      }
    }).then(modal => modal.present());
  }

  onTimeSelected(ev) {
    this.events = []
    this.component = []
    // console.log('Selected time' + ev.selectedTime + ', has Events:' +
    // (ev.events !== undefined && ev.events.lenght !== 0) + ', disabled: ' + ev.disabled);
    this.selectedDate = ev.selectedTime
    // console.log(ev.events);
    this.events.push(ev.events);
    // console.log(this.selectedDate);  undefined 0833941402
    this.bookTime = ev.selectedTime;
    // console.log(this.events);

    if (ev.events[0][0] == ev.events[0][0]) {
      this.component.push('aweza');
    }
    // console.log("Answer", this.component);
  }

  async openCalModal() {
    const modal = await this.modalCtrl.create({
      component: CalModalPageModule,
      cssClass: 'cal-modal',
      backdropDismiss: false
    });
   
    await modal.present();
   
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        let event = result.data.event;
        if (event.allDay) {
          let start = event.startTime;
          event.startTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate()
            )
          );
          event.endTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate() + 1
            )
          );
        }
        this.eventSource.push(result.data.event);
        this.myCal.loadEvents();
      }
    });
  }

  // Change current month/week/day
  next() {
    this.myCal.slideNext();
  }
 
  back() {
    this.myCal.slidePrev();
  }
 
  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
    // console.log(this.viewTitle);
  }
 
  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
 
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK'],
    });
    alert.present();
  }
 
  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + startDay
          )
        );
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + endDay
          )
        );
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true,
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + startDay,
          0,
          date.getMinutes() + startMinute
        );

        endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + endDay,
          0,
          date.getMinutes() + endMinute
        );

        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false,
        });
      }
    }
    this.eventSource = events;
  }
 
  removeEvents() {
    this.eventSource = [];
  }

  addNewEvent() {
    let start = this.selectedDate;
    let end = this.selectedDate;
    end.setMinutes(end.getMinutes() + 60);

    if (this.period == 1) {
      let event = {
        title: this.msg,
        startTime: this.Start,
        endTime: this.End,
        allDay: false,
      };
      this.database.collection('bookedhooks').doc(this.userid).collection('freetime').add(event);
    } else if (this.period == 2) {
      let event = {
        title: this.msg,
        startTime: start,
        endTime: end,
        allDay: true,
      };
      this.database.collection('bookedhooks').doc(this.userid).collection('freetime').add(event);
    }

  }

  StartTimes(event) {
    this.period = +event.detail.value;
    this.times = Array<number>(+event.detail.value);
    this.timeArray = Array<Date>();
    // console.log(this.period);
  }

  StartdateSelected(event) {
    // console.log(event.detail.value);
    this.timeArray.push({
      time: event.detail.value,
      taken: false,
    });
    // console.log(this.timeArray);
    this.Start = event.detail.value;
    // console.log(this.Start);
  }

  EnddateSelected(event) {
    // console.log(event.detail.value);
    this.timeArray.push({
      time: event.detail.value,
      taken: false,
    });
    // console.log(this.timeArray);
    this.End = event.detail.value;
    // console.log(this.End);
  }

  async goToHookups() {
    const loading = await this.loadingCtrl.create();
    await loading.present().then(() => {
      this.menu.close().then(() => {
        this.router.navigateByUrl('/tabs/uploads').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

}
