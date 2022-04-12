import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-addpicture',
  templateUrl: './addpicture.page.html',
  styleUrls: ['./addpicture.page.scss'],
})
export class AddpicturePage implements OnInit {

  db = firebase.firestore();
  storage = firebase.storage().ref();

  image;
  picname;

  resultID;
  uploadingprogress = 0;

  RegisterForm: FormGroup;

  isimgLoaded: boolean = false;

  constructor(
    private menu: MenuController,
    private modalController: ModalController,
    public formGroup: FormBuilder,
  ) {
    this.RegisterForm = formGroup.group({
      name : ['', [Validators.required]],
    });
   }

  ngOnInit() {
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
          // console.log('File avail at: ', dwnURL);
          this.image = dwnURL;
          setTimeout(() => {
            this.uploadingprogress = 100;
          }, 1000)
        });
      });
  }

  addPicture() {
    this.db.collection('usermedia').doc(firebase.auth().currentUser.uid).collection('mypiccs')
    .add({
      image: this.image,
      picname: this.picname
    }).then(result => {
      // console.log(result);
      // console.log(result.id);
      this.resultID = result.id
      // console.log(resultID);
      this.db.collection('pics').doc(firebase.auth().currentUser.uid).collection('mypiccs').doc(result.id).update({
        id: this.resultID,
      })
      this.dismiss();
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

}
