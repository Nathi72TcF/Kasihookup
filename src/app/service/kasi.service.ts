import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, MenuController, LoadingController } from '@ionic/angular';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app';
import * as moment from 'moment';

import { Firestore, collectionData, doc, docData } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { promise } from 'selenium-webdriver';
import { resolve } from 'dns';
import { rejects } from 'assert';

export interface Workerzz {
  name: string;
  surname: string;
}

@Injectable({
  providedIn: 'root'
})
export class KasiService {

  db = firebase.firestore();
  storage = firebase.storage().ref();

  postCollection: AngularFirestoreCollection;

  userUID;
  userId;
  userDocumentNo;
  email;

  constructor(
    private afAuth: AngularFireAuth,
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore,

    private router: Router,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
  ) { }

  signIn({ email, password }) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
 
  signOut(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.goToLogin();
    });  
  }

  //  async signup({name, surname, email, password }, image): Promise<any>
  async signup({name, surname, contact, gender, location, startsign, year, email, password }, image): Promise<any> {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
 
    const uid = credential.user.uid;
    this.userId = credential.user.uid;
 
    return this.afs.doc(`users/${uid}`)
    .set({
      userid: uid,
      image: image,
      name: name,
      surname: surname,
      contact: contact,
      gender: gender,
      location: location,
      startsign: startsign,
      year: year,
      emails: email,
      password: password,
      position: 'client'
    }).then(result => {
      this.addProfile(uid);
      this.addWallet(uid)
      this.goToVerify();
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  async signuphook({name, surname, contact, gender, location, startsign, year, email, password}, image): Promise<any> {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
 
    const uid = credential.user.uid;
    this.userId = credential.user.uid;
 
    return this.afs.doc(`users/${uid}`)
    .set({
      userid: uid,
      image: image,
      name: name,
      surname: surname,
      contact: contact,
      gender: gender,
      location: location,
      startsign: startsign,
      year: year,
      emails: email,
      password: password,
      position: 'hookup'
    }).then(result => {
      this.addProfile(uid);
      this.addWallet(uid)
      this.goToVerify();
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  addClient(hookname, hooklocation, contact, hookhost, hookcontent, hook30mn, hook1hr, hook2hr, hooknight) {
    return this.afs.doc(`hookupgirls/${this.userId}`)
    .set({
      name: hookname,
      location: hooklocation,
      contact: contact,
      host: hookhost,
      content: hookcontent,
      hook30mn: hook30mn,
      hook1hr: hook1hr,
      hook2hr: hook2hr,
      hooknight: hooknight,
      // add like function
      id: this.userId,
      likes: 0,
      like: 0,
      comments: 0,
      date: moment(Date.now()).format('h:mm:ss a, MMMM Do YYYY')
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorMessage;
      // ...resetepassword
    });
  }

  async addProfile(userId) {
    return this.afs.doc(`profiles/${userId}`)
    .set({
      height: 'Not Given',
      weight: 'Not Given',
      eyecolour: 'Not Given',
      bodytype: 'Not Given',
      haircolor: 'Not Given',
      bodyart: 'Not Given',
      lookingfor: 'Not Given',
      turnoff: 'Not Given',
      status: 'Not Given',
      ethnicity: 'Not Given',
      living: 'Not Given',
      drinkinghabits: 'Not Given',
      education: 'Not Given',
      children: 'Not Given',
      smokinghabits: 'Not Given',
      sexdrive: 'Not Given',
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorMessage;
      // ...resetepassword
    });
  }

  async addWallet(userId) {
    return this.afs.doc(`tcfwallet/${userId}`)
    .set({
      tcfcoin: 50,
      tcfid: Math.floor(Math.random()*899999+100000),
      id: userId
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorMessage;
      // ...resetepassword
    });
  }

  getUsers(userId) {
    const Userss = this.afs.collection('users').doc(userId).valueChanges()
    return Userss;
  }

  // ///////////////////////////////////////////////////////////////////////////
  // Tabs Page

  // Get kamasutra
  getkamasutra() {
    const kama = this.afs.collection('kamasutra').valueChanges()
    return kama;
  }

  // Get kamasutra
  gethookup() {
    const hook = this.afs.collection('hookups').valueChanges()
    return hook;
  }

  // //////////////////////////////////////////////////////////////////////////
  // Message

  // get Message
  getmessage(id) {
    const msg = this.afs.collection('chatlist').doc(id).collection('mychats').valueChanges()
    return msg;
  }

  // //////////////////////////////////////////////////////////////////////////

  async goToVerify() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/tabs/feedwall').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  logout() {
    firebase.auth().signOut().then(() => {
      console.log('Sign-out successful.');

      // Sign-out successful.
      this.goToLogin();
    }).catch((error) => {
      console.log('An error happened.');
      // An error happened.
    });
  }

  async goToLogin() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/login').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  resetepassword(email) {
    const auth = firebase.auth();

    auth.sendPasswordResetEmail(email.Email).then(() => {
    // Email sent.
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

}
