import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  db = firebase.firestore();
  storage = firebase.storage().ref();
  userid = firebase.auth().currentUser.uid;

  id;

  images = [];
  image;
  content;

  name;
  surname;
  userimage;

  resultID;
  uploadingprogress = 0;

  RegisterForm: FormGroup;

  imageResponse = [];

  constructor(
    private menu: MenuController,
    private modalController: ModalController,
    public formGroup: FormBuilder,
    public Alert: AlertController,
    private loadingCtrl: LoadingController,
  ) {
    this.RegisterForm = formGroup.group({
      content : ['', [Validators.required]],
    });

    this.getUsers();
   }

  ngOnInit() {
  }

  addPost() {
    this.db.collection('postz').add({
      content: this.content,
      userid: this.userid,
      name: this.name,
      surname: this.surname,
      userimage: this.userimage,
      image: this.imageResponse,
      // image: this.images,
      comments: 0,
      likes: 0,
      like: 0,
      date: Date.now()
      // date: Date.now()
    }).then(result => {
      // console.log(result);
      // console.log(result.id);
      this.resultID = result.id
      // console.log(resultID);
      this.db.collection('postz').doc(result.id).update({
        id: this.resultID,
      })
      this.dismiss();
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

  dismiss() {
    this.modalController.dismiss();
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

}
