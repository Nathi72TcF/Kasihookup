import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { KasiService } from './../../service/kasi.service';
import { Router } from '@angular/router';
import { MenuController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { element } from 'protractor';
import { Config } from '@ionic/angular';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  db = firebase.firestore();
  storage = firebase.storage().ref();
  userID = firebase.auth().currentUser.uid;

  chatlist = [];
  chatlistNo;

  // twp way also for friend
  chatid;
  friendid;
  image;
  myid;
  name;
  surname;
  created;

  isIos = false;

  dummy: any = [ "dummy1", "dummy2", "dummy3", "dummy4", "dummy5"];

  constructor(
    public kasi: KasiService,
    private menu: MenuController,
    private modalController: ModalController,
    public Alert: AlertController,
    private router: Router,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
    public config: Config,
  ) { }

  ngOnInit() {
    this.isIos = this.config.get('mode') === 'ios';

    this.dataInit();
  }

  async dataInit() {
    this.chatlist = [];
    this.kasi.getmessage(this.userID).subscribe(data => {
      // console.log(data);
      this.chatlist = data;
      this.chatlistNo = data.length;
    })
  }

  doRefresh(event) {
    this.dataInit();

    setTimeout(() => {
      // console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

}
