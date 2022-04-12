import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

import { HookpartymanPage } from './hookpartyman/hookpartyman.page';
import { ViewhookpartyPage } from '../viewhookparty/viewhookparty.page';

@Component({
  selector: 'app-hookpost',
  templateUrl: './hookpost.page.html',
  styleUrls: ['./hookpost.page.scss'],
})
export class HookpostPage implements OnInit {

  db = firebase.firestore();
  storage = firebase.storage().ref();
  userid = firebase.auth().currentUser.uid;

  images = [];
  image;
  content;

  nameofparty;
  venue;
  province;
  nopeople;
  males;
  females;
  price;
  date;
  time;

  resultID;
  uploadingprogress = 0;

  RegisterForm: FormGroup;

  isimgLoaded: boolean = false;

  imageResponse = [];
  options: any;

  constructor(
    private menu: MenuController,
    private modalController: ModalController,
    public formGroup: FormBuilder,
    public Alert: AlertController,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
    private router: Router,
  ) {
    this.RegisterForm = formGroup.group({
      // nameofparty : ['', [Validators.required]],
      // venue : ['', [Validators.required]],
      // price : ['', [Validators.required]],
      // nopeople : ['', [Validators.required]],
      // males : ['', [Validators.required]],
      // females : ['', [Validators.required]],
      content : ['', [Validators.required]],
    });
   }

  ngOnInit() {
  }

  addHookuppartyPost() {
    this.db.collection('hookupparty').add({
      content: this.content,
      nameofparty: this.nameofparty,
      venue: this.venue,
      province: this.province,
      nopeople: this.nopeople,
      males: this.males,
      females: this.females,
      price: this.price,
      date: moment(this.date).format('YYYY MMMM Do'),
      image: this.imageResponse,
      comments: 0,
      likes: 0,
      like: 0,
      postdate: moment(Date.now()).format('YYYY MMMM Do, h:mm:ss a'),
      time: moment(this.time).format('h:mm:ss a')
    }).then(result => {
      // console.log(result);
      // console.log(result.id);
      this.resultID = result.id
      // console.log(resultID);
      this.db.collection('hookupparty').doc(result.id).update({
        id: this.resultID,
      })
      this.goToSettings();
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  dateSelected(event) {
    this.date = event.detail.value;
    // console.log(this.date);
  }

  timeSelected(event) {
    this.time = event.detail.value;
    // console.log(this.time);
  }

  reminderTimes(event) {
    this.province = event.detail.value;
    // console.log(this.province);
  }

  changeListener2(userprofiles): void {
    const i = userprofiles.target.files[0];
      // console.log(i);
      const upload = this.storage.child(i.name).put(i);
      upload.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('upload is: ', progress , '% done.');
        // progress bar count
        // console.log( progress );
        
        if (progress <= 90) {
          this.uploadingprogress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        } else {
          this.uploadingprogress = 90
        }
      }, err => {
      }, () => {
        upload.snapshot.ref.getDownloadURL().then(dwnURL => {
          
          this.image = dwnURL;
          
          console.log(this.image);
          setTimeout(() => {
            this.uploadingprogress = 100;
          }, 1000)
        }).then(() => {
          // this.imageResponse = [];
          this.imageResponse.push({
            image: this.image
          })

          console.log(this.imageResponse);
          
        });
      });
  }

  openManange() {
    this.modalController.create({
      component: HookpartymanPage,
      // componentProps: {
      //   id: id
      // }
    }).then(modal => modal.present())
  }

  exceptHooks() {
    this.modalController.create({
      component: ViewhookpartyPage,
      // componentProps: {
      //   id: id
      // }
    }).then(modal => modal.present())
  }

  async goToSettings() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/settings').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

}
