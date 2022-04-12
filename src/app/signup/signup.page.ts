import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { LoadingController, AlertController, MenuController, ModalController, ToastController} from '@ionic/angular';
import { Router } from '@angular/router';
import { KasiService } from './../service/kasi.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  storage = firebase.storage().ref();

  uid;
  image;
  name;
  surname;
  email;
  contact;
  gender;
  location;
  startsign;
  year;
  // userid = firebase.auth().currentUser.uid;
  // email = firebase.auth().currentUser.email;

  RegisterForm: FormGroup;
  password;
  confirmpassword;
  ErrorMessage;

  uploadingprogress;

  // Password eye off
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  myBoolean = false;

  constructor(
    private kasi: KasiService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private router: Router,
    private formGroup: FormBuilder,
    private FormsModule: FormsModule,
    private menuCtrl: MenuController,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,

    public Alert: AlertController,
    public toastController: ToastController,
    public modalController: ModalController,
  ) {
    this.RegisterForm = formGroup.group({
      name : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      surname : ['', Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z]+$'), Validators.required])],
      // surname : ['', [Validators.required, Validators.pattern('[a-zA-Z]+$')]],
      email : ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.]+@[a-zA-Z-.]+\.[a-zA-Z]+$')]],
      contact : ['', [Validators.required, Validators.pattern('([0-9]{10})')]],
      location : ['', [Validators.required]],
      year : ['', [Validators.required, Validators.pattern('([0-9]{4})')]],
      password : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      confirmpassword : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
    });
   }

  ngOnInit() {
  }

  setGender(event) {
    this.gender = event.detail.value;
    // console.log(this.gender);
  }

  customActionSheetOptions: any = {
    // header: 'Gender',
    subHeader: 'Select your Gender',
  };

  customActionSheetOptions1: any = {
    // header: 'Gender',
    subHeader: 'Select your Star Sign',
  };

  setStarSign(event) {
    this.startsign = event.detail.value;
    // console.log(this.startsign);
  }

  signup() {
    this.signUp();
  }

  async signUp() {
    if (this.image == '' || this.image == undefined) {
      this.ErrorMessage = 'Please select your profile picture.';
      this.presentAlert(this.ErrorMessage);
    } else if (this.gender == '' || this.gender == undefined) {
      this.ErrorMessage = 'Please select your Gender.';
      this.presentAlert(this.ErrorMessage);
    } else if (this.startsign == '' || this.startsign == undefined) {
      this.ErrorMessage = 'Please select your Start Sign.';
      this.presentAlert(this.ErrorMessage);
    } else if (this.confirmpassword !== this.password) {
      this.ErrorMessage = 'The passwords you entered do not match.';
      this.presentAlert(this.ErrorMessage);
    } else if (this.myBoolean == false) {
      const alert = await this.alertCtrl.create({
        header: 'Eish!!!',
        message: '<strong>Accept Terms & Conditions.</strong>!!!',
        buttons: [
          {
            text: 'Okay',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              // console.log('Confirm Cancel: blah');
            }
          }
        ]
      });
      await alert.present();
    } else {
      const loading = await this.loadingCtrl.create();
      await loading.present();
      this.kasi.signup(this.RegisterForm.value, this.image)
        .then((user) => {
            loading.dismiss();
          },
          async (err) => {
            loading.dismiss();
            const alert = await this.alertCtrl.create({
              header: 'Sign up failed',
              message: err.message,
              buttons: ['OK'],
            });
  
            await alert.present();
          }
        );
    }
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
        // console.log(this.image);
        setTimeout(() => {
          this.uploadingprogress = 100;
        }, 1000)
      });
    });
  }

  getPhoneInput(ev: any) {
    this.contact = ev.target.value;

    // calling firebase
    // this.contact[0] == '0'
    if (this.contact[0] !== '0') {
      this.presentAlertPhoneValidation();
    } else {
      // this.showInputs()
      // console.log('im working');
      this.contact = this.contact;
    }
      // console.log(this.phoneVal);
      // console.log(this.contact);
  }

  async presentAlertPhoneValidation() {
    const alert = await this.Alert.create({
      header: 'Eish!',
      message: '<strong>Phone Numbers must start with a number: 0.</strong>!!!',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.erasedToContact();
            // console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertImage() {
    const alert = await this.Alert.create({
      header: 'Eish!',
      message: '<strong>Please select your Picture.</strong>!!!',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // this.erasedToContact();
            // console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }

  erasedToContact() {
    this.contact = '';
  }

  onMyBooleanChange() {
    // console.log(this.myBoolean);
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async presentAlert(data) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }

  async goToSignUpHook() {
    const loading = await this.alertCtrl.create();
    await loading.present().then(() => {
      this.menuCtrl.close().then(() => {
        this.router.navigateByUrl('/signuphook').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }

}
