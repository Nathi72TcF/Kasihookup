import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { PartychartService } from '../../../service/partychart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { ImagemodalPage } from '../../imagemodal/imagemodal.page';
import { element } from 'protractor';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-hookchat',
  templateUrl: './hookchat.page.html',
  styleUrls: ['./hookchat.page.scss'],
})
export class HookchatPage implements OnInit {

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

  price;

  name;
  surname;
  userzimage;
  contact;
  status;
  gender;
  starsign;
  location;
  year;
  useridz;

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
    private chatService: PartychartService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    public Alert: AlertController,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
    private afs: AngularFirestore,
    public toastController: ToastController,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.id);

    this.getFeedPost(this.id)
    this.myUserWallet();

    this.getUser();
   }

  ngOnInit() {
    this.messages = this.chatService.getChatMessages(this.id);
    // console.log(this.messages);

    this.postID = this.id;
      this.postReference = this.afs.doc(`hookupparty/${this.postID}`);
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

  async presentAlertJoinParty(id) {
    // console.log(id);
    const alert = await this.Alert.create({
      header: 'Hooray!',
      message: '<strong>Are you sure you want to Join this Party Hookup</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yep',
          handler: () => {
            this.JoinParty(id);
          }
        }
      ]
    });
    await alert.present();
  }

  upDateLikes() {
    // like
    this.db.collection('hookupparty').doc(this.id).update({
      like: this.likesNo,
    })
  }

  sendMsg() {
    if (this.senttcfcoin < 1) {
      this.ErrorMessage = 'You dont have any coins left. Please reload.';
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

  JoinParty(id) {
    if (this.senttcfcoin < this.price) {
      this.ErrorMessage = 'You dont have Enough Coins to Join the Party. Please reload.';
      this.presentAlert(this.ErrorMessage);
    } else if (this.senttcfcoin > this.price) {
      this.CalculateCoinParty(id);
    }
  }

  checkIfBooked(id) {

    const usersRef = this.db.collection('hookupparty').doc(id).collection('bookings').doc(firebase.auth().currentUser.uid);

    usersRef.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
      this.ErrorMessage = 'Already Booked for this Party.';
      this.presentAlert(this.ErrorMessage);
      } else {
        this.CalculateCoinParty(id);
        // console.log('im adding');
      }
    })
  }

  CalculateCoinParty(id) {
    this.myCoin = this.senttcfcoin - this.price;
    // console.log(this.myCoin);

    this.updateMyCoinParty(id);
  }

  updateMyCoinParty(id) {
    this.db.collection('tcfwallet').doc(this.userID)
    .update({
      tcfcoin: this.myCoin
    })
    // console.log('updated');
    this.joinPartyUser(id);
  }

  getUser() {
    this.db.collection('users').doc(firebase.auth().currentUser.uid).onSnapshot(Snapshop => {
      this.name = Snapshop.data().name;
      this.surname = Snapshop.data().surname;
      this.contact = Snapshop.data().contact;
      this.userzimage = Snapshop.data().image; 
      this.location = Snapshop.data().location; 
      this.year = Snapshop.data().year; 
      this.gender = Snapshop.data().gender; 
      this.starsign = Snapshop.data().startsign;
      this.useridz = Snapshop.data().userid;
     
      let checkuser = []

      checkuser.push(Snapshop.data())
      // console.log(checkuser);
      
   });
  }

  joinPartyUser(id) {
    this.db.collection('hookupparty').doc(id).collection('bookings').doc(firebase.auth().currentUser.uid)
    .set({
      name: this.name,
      surname: this.surname,
      contact: this.contact,
      image: this.userzimage,
      location: this.location,
      year: this.year,
      gender: this.gender,
      starsign: this.starsign,
      id: this.useridz
    }).then(() => {
      this.presentToast();
      this.goToHookups();
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your Join a Sex Party. A Response will be sent soon.',
      duration: 9000,
      color: 'primary',
      position: 'bottom'
    });
    toast.present();
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
    this.db.collection('hookupparty').doc(id)
    .onSnapshot(snapshot => {
      // console.log(snapshot);
      this.post = [];
      
      this.post.push(snapshot.data())
      console.log(this.post);

        this.imagePost.push(snapshot.data().image)
        this.imagePostNo = this.imagePost.length;
        this.price = snapshot.data().price

        // console.log(this.imagePost);
        // console.log(this.imagePostNo);
        // console.log(this.price);

      this.comments = snapshot.data().comments;
      // console.log(this.comments);

      this.getFeedCommentNumber(id);
      
    })
  }

  getFeedCommentNumber(id) {
    this.commentsNumber = [];
    this.db.collection('partychats').doc(id).collection('messages')
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
    this.db.collection('hookupparty').doc(id).update({ comments: this.commentsNo })
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
        this.router.navigateByUrl('/tabs/profile').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

}
