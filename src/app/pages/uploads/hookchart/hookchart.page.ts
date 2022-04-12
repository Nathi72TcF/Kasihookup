import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, Platform } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { HookupchartService } from '../../../service/hookupchart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, AlertController, LoadingController, MenuController } from '@ionic/angular';
import { ImagemodalPage } from '../../imagemodal/imagemodal.page';
import { element } from 'protractor';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-hookchart',
  templateUrl: './hookchart.page.html',
  styleUrls: ['./hookchart.page.scss'],
})
export class HookchartPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  db = firebase.firestore();
  storage = firebase.storage().ref();
  userID = firebase.auth().currentUser.uid;

  id;

  postID: string;
  postReference: AngularFirestoreDocument;
  sub;

  heartType: string = "heart-outline";

  messages: Observable<any[]>;
  newMsg = '';

  post = [];

  comments;
  commentsNumber = [];
  commentsNo;

  senttcfid;
  senttcfcoin;

  TotalSentCoin;
  TotalReducedCoin;
  msgCost: number = 1;
  myCoin;

  ErrorMessage;

  likesNo;
  like = [];

  constructor(
    private chatService: HookupchartService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    public Alert: AlertController,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
    private afs: AngularFirestore,
    private platform: Platform,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.id);

    this.getFeedPost(this.id)
    this.myUserWallet();
   }

  ngOnInit() {
    this.messages = this.chatService.getChatMessages(this.id);
    // console.log(this.messages);

    this.postID = this.id;
      this.postReference = this.afs.doc(`hookups/${this.postID}`);
      this.sub = this.postReference.valueChanges().subscribe(val => {
        this.heartType = val.likes.includes(this.userID) ? 'heart' : 'heart-outline';
        this.like = val.likes;
        this.likesNo = this.like.length;
        // console.log('No of likes', this.likesNo);
        // console.log('likes list', this.like);
        // console.log(this.heartType);
        // this.toggleHeart();

        this.upDateLikes();
      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    }
    
  toggleHeart() {
    // this.heartType = this.heartType == "heart" ? "heart-empty" : "heart"
    
    if (this.heartType == 'heart-outline') {
      this.postReference.update({
          likes: firebase.firestore.FieldValue.arrayUnion(this.userID)
      })
      } else {
        this.postReference.update({
          likes: firebase.firestore.FieldValue.arrayRemove(this.userID)
      })
    }
  }

  upDateLikes() {
    // like
    this.db.collection('hookups').doc(this.id).update({
      like: this.likesNo,
    })
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

    // this.goToFeedWall();
  }

  myUserWallet() {
    this.db.collection('tcfwallet').doc(this.userID)
    .onSnapshot(snapshot => {
      this.senttcfid = snapshot.data().tcfid;
      this.senttcfcoin = snapshot.data().tcfcoin;

      // console.log(this.senttcfcoin);
      
    })
  }

  getFeedPost(id) {
    this.db.collection('hookups').doc(id)
    .onSnapshot(snapshot => {
      // console.log(snapshot);
      this.post = [];
      
      this.post.push(snapshot.data())
      // console.log(this.post);

      this.comments = snapshot.data().comments;
      // console.log(this.comments);

      this.getFeedCommentNumber(id);
      
    })
  }

  getFeedCommentNumber(id) {
    this.commentsNumber = [];
    this.db.collection('hookupchart').doc(id).collection('messages')
    .onSnapshot(snapshot => {
      // console.log(snapshot);
      
      snapshot.forEach(element => {
        this.commentsNumber.push(element.data())
        // console.log(this.commentsNumber);
        // console.log(this.commentsNumber.length);
        this.commentsNo = this.commentsNumber.length;
        setTimeout(() => {
          // this.uploadingprogress = 100;
          this.updateCommentNo(id);
        }, 1)
      })
      // this.updateCommentNo(id);
    })
  }

  updateCommentNo(id) {
    this.db.collection('hookups').doc(id).update({ comments: this.commentsNo })
  }
 
  signOut() {
    this.chatService.signOut().then(() => {
      // this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }

  openPreview(image) {
    this.modalController.create({
      component: ImagemodalPage,
      componentProps: {
        image: image
      }
    }).then(modal => modal.present());
  }

  async presentAlert(data) {
    const alert = await this.Alert.create({
      header: 'Eish',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }

  async goToHookups() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/tabs/uploads').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  ionViewDidEnter() {
    this.menuCtrt.enable(false);
  }

}
