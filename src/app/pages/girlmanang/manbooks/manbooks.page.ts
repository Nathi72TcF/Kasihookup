import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

import { CalendarComponent } from 'ionic2-calendar';
import { ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { CalModalPageModule } from './../cal-modal/cal-modal.module';
import { NgCalendarModule  } from 'ionic2-calendar';

// frealy jolly image upload
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-manbooks',
  templateUrl: './manbooks.page.html',
  styleUrls: ['./manbooks.page.scss'],
})
export class ManbooksPage implements OnInit {

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  db = firebase.firestore();
  storage = firebase.storage().ref();
  userid = firebase.auth().currentUser.uid;

  selectedDate = new Date();

  eventSource = [];
  viewTitle: string;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
 
  // selectedDate: Date;

  // //////////////

  period;
  times: any;
  timeArray: any;

  Start;
  End;

  RegisterForm: FormGroup;

  msg;

  constructor(
    private menu: MenuController,
    public formGroup: FormBuilder,
    public Alert: AlertController,
    private loadingCtrl: LoadingController,

    // frealy jolly image uploadge,
    private database: AngularFirestore,

    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private modalCtrl: ModalController
  ) {
    this.database.collection('bookedhooks').doc(this.userid).collection('freetime')
    .snapshotChanges().subscribe(colSnap => {
      this.eventSource = [];

      colSnap.forEach(snap => {
        let event:any = snap.payload.doc.data();
        event.id = snap.payload.doc.id;
        event.startTime = event.startTime.toDate();
        event.endTime = event.endTime.toDate();
        console.log(event);
        this.eventSource.push(event);
      });
    })

    this.RegisterForm = formGroup.group({
      msg : ['', [Validators.required]],
    });

    this.times = 0;
   }

  ngOnInit() {
  }

  onTimeSelected(ev) {
    console.log('Selected time' + ev.selectedTime + ', has Events:' +
    (ev.events !== undefined && ev.events.lenght !== 0) + ', disabled: ' + ev.disabled);
    this.selectedDate = ev.selectedTime
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
    console.log(this.period);
  }

  StartdateSelected(event) {
    // console.log(event.detail.value);
    this.timeArray.push({
      time: event.detail.value,
      taken: false,
    });
    console.log(this.timeArray);
    this.Start = event.detail.value;
    console.log(this.Start);
  }

  EnddateSelected(event) {
    // console.log(event.detail.value);
    this.timeArray.push({
      time: event.detail.value,
      taken: false,
    });
    console.log(this.timeArray);
    this.End = event.detail.value;
    console.log(this.End);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

}
