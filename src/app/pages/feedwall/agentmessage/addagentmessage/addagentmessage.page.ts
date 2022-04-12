import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, LoadingController, MenuController } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import * as moment from 'moment';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AgentchatService } from './../../../../service/agentchat.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addagentmessage',
  templateUrl: './addagentmessage.page.html',
  styleUrls: ['./addagentmessage.page.scss'],
})
export class AddagentmessagePage implements OnInit {

  db = firebase.firestore();

  // message stuff
  @ViewChild(IonContent) content: IonContent;

  id;

  messages: Observable<any[]>;
  newMsg = '';

  // user infor

  idz: any;
  resultID

  myID = firebase.auth().currentUser.uid;
  myImage;
  myName;
  mySurname;
  friendID;
  friendImage;
  friendname;
  friendsurname;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private chatService: AgentchatService, 
    public activatedRoute: ActivatedRoute,
    private router: Router,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
  ) { }

  ngOnInit() {
    this.getMyCreditials();
    this.getFrindCreditials();
  }

  addChatlist() {
    this.db.collection('agentchatlist').doc(this.myID).collection('mychats')
    .add({
      friendid: 'oDq0R7bfHtek4SWSRaapqjacpdn2',
      image: this.friendImage,
      myid: firebase.auth().currentUser.uid,
      name: this.friendname,
      surname: this.friendsurname,
      created: moment(Date.now()).format('llll')
    }).then(result => {
      // console.log(result);
      // console.log(result.id);
      this.resultID = result.id
      // console.log(resultID);
      this.db.collection('agentchatlist').doc(this.myID).collection('mychats').doc(result.id).update({
        chatid: result.id,
      })
      this.addToFrindData(this.resultID);
      this.sendMessage(this.resultID);
      this.dismiss();
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  addToFrindData(resultID) {
    this.db.collection('agentchatlist').doc('oDq0R7bfHtek4SWSRaapqjacpdn2').collection('mychats').doc(resultID)
    .set({
      friendid: firebase.auth().currentUser.uid,
      image: this.myImage,
      myid: 'oDq0R7bfHtek4SWSRaapqjacpdn2',
      name: this.myName,
      surname: this.mySurname,
      chatid: resultID,
      created: moment(Date.now()).format('llll')
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  async HomePage() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/tabs/feedwall').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  getMyCreditials() {
    this.db.collection('users').doc(this.myID)
    .onSnapshot(snapshot => {
      this.myImage = snapshot.data().image;
      this.myName = snapshot.data().name;
      this.mySurname = snapshot.data().surname;

      // console.log(this.myImage);
      // console.log(this.myName);
      // console.log(this.mySurname);
    })
  }

  getFrindCreditials() {
    this.db.collection('users').doc('oDq0R7bfHtek4SWSRaapqjacpdn2')
    .onSnapshot(snapshot => {
      this.friendID = snapshot.data().userid;
      this.friendImage = snapshot.data().image;
      this.friendname = snapshot.data().name;
      this.friendsurname = snapshot.data().surname;

      // console.log(this.friendID);
      // console.log(this.friendImage);
      // console.log(this.friendname);
      // console.log(this.friendsurname);
    })
  }

  // message stuff
  sendMessage(id) {
    this.chatService.addChatMessage(this.newMsg, id).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }
  signOut() {
    this.chatService.signOut().then(() => {
      // this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }

  dismiss() {
    this.modalController.dismiss();
    this.HomePage();
  }

}
