import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { FeedchatService } from '../../../service/feedchat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { ImagemodalPage } from '../../imagemodal/imagemodal.page';
import { element } from 'protractor';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-feedchat',
  templateUrl: './feedchat.page.html',
  styleUrls: ['./feedchat.page.scss'],
})
export class FeedchatPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  db = firebase.firestore();
  storage = firebase.storage().ref();
  userID = firebase.auth().currentUser.uid;

  id;

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

  postID: string;
  postReference: AngularFirestoreDocument;
  sub;
  heartType: string = "heart-outline";

  likesNo;
  like = [];

  imagePost = [];
  imagePostNo;

  isimgLoaded: boolean = false;

  constructor(
    private chatService: FeedchatService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    public Alert: AlertController,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
    private afs: AngularFirestore,
    private toastCtrl: ToastController
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.id);

    this.getFeedPost(this.id)
    this.myUserWallet();
    
    this.listenForMessages();
   }

  ngOnInit() {
    this.messages = this.chatService.getChatMessages(this.id);
    // console.log(this.messages);

    this.postID = this.id;
      this.postReference = this.afs.doc(`postz/${this.postID}`);
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
    this.db.collection('postz').doc(this.id).update({
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
    this.db.collection('postz').doc(id)
    .onSnapshot(snapshot => {
      // console.log(snapshot);
      this.post = [];
      
      this.post.push(snapshot.data())
      // console.log(this.post);

        this.imagePost.push(snapshot.data().image)
        this.imagePostNo = this.imagePost.length;

        // console.log(this.imagePost);
        // console.log(this.imagePostNo);

      this.comments = snapshot.data().comments;
      // console.log(this.comments);

      this.getFeedCommentNumber(id);
      
    })
  }

  getFeedCommentNumber(id) {
    this.commentsNumber = [];
    this.db.collection('feedchats').doc(id).collection('messages')
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
    this.db.collection('postz').doc(id).update({ comments: this.commentsNo })
  }

  // push notification
  listenForMessages() {
    this.chatService.getMessages().subscribe(async (msg: any) => {
      console.log('NEW MESSAGE: ', msg);
      
      const alert = await this.Alert.create({
        header: msg.notification.title,
        subHeader: msg.notification.body,
        message: msg.data.info,
        buttons: ['OK'],
      });
 
      await alert.present();
    });
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

  async goToFeedWall() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/tabs/feedwall').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

}
