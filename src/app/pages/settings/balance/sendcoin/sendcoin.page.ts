import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { element } from 'protractor';

@Component({
  selector: 'app-sendcoin',
  templateUrl: './sendcoin.page.html',
  styleUrls: ['./sendcoin.page.scss'],
})
export class SendcoinPage implements OnInit {

  db = firebase.firestore();
  storage = firebase.storage().ref();
  userid = firebase.auth().currentUser.uid;

  RegisterForm: FormGroup;

  searchResults = [];
  userListProfile = [];
  wallet = [];

  sentAmount: number = 0;
  name;
  surname;
  image;
  tcfid;

  profile = {
    sentimage: '',
    sentname: null,
    sentsurname: null,
    senttcfid: null,
    senttcfcoin: null,
    recimage: '',
    recname: null,
    recsurname: null,
    rectcfid: null,
    rectcfcoin: null,
    recid: null
  }

  TotalSentCoin;
  TotalReducedCoin;

  resultMe;
  resultFriend;

  ErrorMessage;

  constructor(
    private menu: MenuController,
    private modalController: ModalController,
    public formGroup: FormBuilder,
    public Alert: AlertController,
  ) {
    this.RegisterForm = formGroup.group({
      sentAmount : ['', [Validators.required]],
    });

    this.getUser();
    this.myUserData();
    this.myUserWallet();
   }

  ngOnInit() {
  }

  getUser() {
    this.db.collection('users').onSnapshot(snapshot => {
      this.userListProfile = [];
      console.log(snapshot);
      
      snapshot.forEach(element => {
        this.userListProfile.push(element.data());
        console.log(this.userListProfile);
      })
    })
  }

  myUserData() {
    this.db.collection('users').doc(this.userid)
    .onSnapshot(snapshot => {
      this.profile.sentimage = snapshot.data().image;
      this.profile.sentname = snapshot.data().name;
      this.profile.sentsurname = snapshot.data().surname;
    })
  }

  myUserWallet() {
    this.db.collection('tcfwallet').doc(this.userid)
    .onSnapshot(snapshot => {
      this.profile.senttcfid = snapshot.data().tcfid;
      this.profile.senttcfcoin = snapshot.data().tcfcoin;
    })
  }

  async presentAlertAddUser(id) {
      const alert = await this.Alert.create({
        header: 'Confirm!',
        message: '<strong>Are you sure you want to send coin to this user</strong> ??',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              // console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'yep',
            handler: () => {
              this.adduser(id);
              this.addWallet(id);
            }
          }
        ]
      });
      await alert.present();
  }

  adduser(id) {
    this.db.collection('users').doc(id)
    .onSnapshot(snapshot => {
      this.profile.recimage = snapshot.data().image;
      this.profile.recname = snapshot.data().name;
      this.profile.recsurname = snapshot.data().surname;

      this.image = snapshot.data().image;
      this.name = snapshot.data().name;
      this.surname = snapshot.data().surname;
    })
  }

  addWallet(id) {
    this.db.collection('tcfwallet').doc(id)
    .onSnapshot(snapshot => {
      this.profile.rectcfid = snapshot.data().tcfid;
      this.profile.rectcfcoin = snapshot.data().tcfcoin;
      this.profile.recid = id;

      this.tcfid = snapshot.data().tcfid;
    })
  }

  sendCoin() {
    if (this.sentAmount === 0) {
      this.ErrorMessage = 'Please enter Amount to send.';
      this.presentAlert(this.ErrorMessage);
    } else if (this.profile.recname === '') {
      this.ErrorMessage = 'Select Friend to send Coin';
      this.presentAlert(this.ErrorMessage);
    } else if (this.profile.senttcfcoin < this.sentAmount) {
      this.ErrorMessage = 'The Amount entered is invalid or you out of coin as well !!!';
      this.presentAlert(this.ErrorMessage);
    } else {
      this.CalculateCoin();
    }
  }

  CalculateCoin() {
    this.TotalSentCoin = +this.profile.rectcfcoin + +this.sentAmount;
    this.TotalReducedCoin = +this.profile.senttcfcoin - +this.sentAmount;

    console.log(this.TotalSentCoin);
    console.log(this.TotalReducedCoin);

    this.updateMyCoin();
    this.updateFriendCoin();

    this.addCoinRecordMe();
    this.addCoinRecordFriend();
    
  }

  updateMyCoin() {
    this.db.collection('tcfwallet').doc(this.userid)
    .update({
      tcfcoin: this.TotalReducedCoin
    })
  }

  updateFriendCoin() {
    this.db.collection('tcfwallet').doc(this.profile.recid)
    .update({
      tcfcoin: this.TotalSentCoin
    })
  }

  addCoinRecordMe() {
    this.db.collection('tcfwallet').doc(this.userid).collection('sentcoin')
    .add({
      sentImage: this.profile.recimage,
      sentName: this.profile.recname,
      sentSurname: this.profile.recsurname,
      sentID: this.profile.recid,
      sentcoin: this.sentAmount,
      date: moment(Date.now()).format('h:mm:ss a, MMMM Do YYYY'),
    }).then(result => {
      // console.log(result);
      // console.log(result.id);
      this.resultMe = result.id
      // console.log(resultID);
      this.db.collection('tcfwallet').doc(this.userid).collection('sentcoin').doc(result.id).update({
        id: this.resultMe,
      })
      this.dismiss();
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  addCoinRecordFriend() {
    this.db.collection('tcfwallet').doc(this.profile.recid).collection('reccoin')
    .add({
      recImage: this.profile.sentimage,
      recName: this.profile.sentname,
      recSurname: this.profile.sentsurname,
      recID: this.userid,
      reccoin: this.sentAmount,
      date: moment(Date.now()).format('h:mm:ss a, MMMM Do YYYY'),
    }).then(result => {
      // console.log(result);
      // console.log(result.id);
      this.resultFriend = result.id
      // console.log(resultID);
      this.db.collection('tcfwallet').doc(this.userid).collection('reccoin').doc(result.id).update({
        id: this.resultFriend,
      })
      this.dismiss();
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    // set val to the value of the searchbar
    const val = ev.target.value;
    const num = Number(val)
    // if the value is an empty string don't filter the items
    console.log(val);
    console.log(num);
    
    if (val && val.trim() != "" && !(num == 0)) {
      console.log(num);
      console.log(!(num == 0));
      
      
      let arr = this.userListProfile.filter(item => String(item.name).indexOf(val) >= 0)
      console.log(arr);

      this.searchResults = arr;
      
      console.log('Results = ',this.searchResults);

    } else if (val == "") {
      this.searchResults = [];
    }

    console.log(this.userListProfile);
    console.log(this.searchResults);
    
  }

  async presentAlert(data) {
    const alert = await this.Alert.create({
      header: 'Eish',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
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
