import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { BookchatService } from '../../service/bookchat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { ImagemodalPage } from '../imagemodal/imagemodal.page';
import { element } from 'protractor';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-bookingchat',
  templateUrl: './bookingchat.page.html',
  styleUrls: ['./bookingchat.page.scss'],
})
export class BookingchatPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  db = firebase.firestore();
  storage = firebase.storage().ref();
  userID = firebase.auth().currentUser.uid;

  id;

  messages: Observable<any[]>;
  newMsg = '';

  senttcfid;
  senttcfcoin;

  myCoin;

  ErrorMessage;

  constructor(
    private chatService: BookchatService, 
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public Alert: AlertController,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.id);

    this.myUserWallet();
   }

  ngOnInit() {
    this.messages = this.chatService.getChatMessages(this.id);
  }

  sendMsg() {
    if (this.senttcfcoin < 1) {
      this.ErrorMessage = 'You dont have any coins left. Please reload or Contact Agent to Reload.';
      this.presentAlert(this.ErrorMessage);
    } else if (this.senttcfcoin > 1) {
      this.CalculateCoin();
    }
  }

  CalculateCoin() {
    this.myCoin = this.senttcfcoin - 1;
    // console.log(this.myCoin);

    this.updateMyCoin();
  }

  updateMyCoin() {
    this.db.collection('tcfwallet').doc(this.userID)
    .update({
      tcfcoin: this.myCoin
    })
    // console.log('updated');
    this.sendMessage();
  }

  sendMessage() {
    this.chatService.addChatMessage(this.newMsg, this.id).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }

  myUserWallet() {
    this.db.collection('tcfwallet').doc(this.userID)
    .onSnapshot(snapshot => {
      this.senttcfid = snapshot.data().tcfid;
      this.senttcfcoin = snapshot.data().tcfcoin;

      // console.log(this.senttcfcoin);
      
    })
  }
 
  signOut() {
    this.chatService.signOut().then(() => {
      // this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }

  async presentAlert(data) {
    const alert = await this.Alert.create({
      header: 'Eish',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }

}
