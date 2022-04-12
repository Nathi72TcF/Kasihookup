import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AgentchatService } from '../../../../service/agentchat.service';
import { Router, ActivatedRoute } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-chatagentmessage',
  templateUrl: './chatagentmessage.page.html',
  styleUrls: ['./chatagentmessage.page.scss'],
})
export class ChatagentmessagePage implements OnInit {

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
    private chatService: AgentchatService, 
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
