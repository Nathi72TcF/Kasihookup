import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { MenuController, ModalController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ImagemodalPage } from '../imagemodal/imagemodal.page';
import { KasiService } from './../../service/kasi.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { PostPage } from './post/post.page';
import * as moment from 'moment';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AddagentmessagePage } from './agentmessage/addagentmessage/addagentmessage.page';
import { FcmService } from './../../service/fcm.service';

@Component({
  selector: 'app-feedwall',
  templateUrl: './feedwall.page.html',
  styleUrls: ['./feedwall.page.scss'],
})
export class FeedwallPage implements OnInit {

  db = firebase.firestore();
  storage = firebase.storage().ref();
  userID = firebase.auth().currentUser.uid;

  posts = [];
  // post = [];
  agentchat = [];
  agentchatNo;

  page = 0;
  likes = [];
  likesNo;

  likeNo;
  liked;

  postID: string;
  postReference: AngularFirestoreDocument;
  sub;

  heartType: string = "heart-outline";

  // twingz
  datezz;
  dummy: any = [ "dummy1", "dummy2", "dummy3", "dummy4", "dummy5"];

  isimgLoaded: boolean = false;
  imagePost = [];
  imagePostNo;

  imgPost = [];
  imgPostNo;

  noOfItem = 1

  // push notifications
  pushes: any = [];

  // load more scroll function
  //Data object for listing items
  post: any[] = [];

  //Save first document in snapshot of items received
  firstInResponse: any = [];

  //Save last document in snapshot of items received
  lastInResponse: any = [];

  //Keep the array of first document of previous pages
  prev_strt_at: any = [];

  //Maintain the count of clicks on Next Prev button
  pagination_clicked_count = 0;

  //Disable next and prev buttons
  disable_next: boolean = false;
  disable_prev: boolean = false;

  constructor(
    public kasiservice: KasiService,
    private menu: MenuController,
    private modalController: ModalController,
    public Alert: AlertController,
    private router: Router,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
    private afs: AngularFirestore,
    private messagingService: FcmService,
    private toastCtrl: ToastController
  ) {
    // this.getPostUpdate();
    // this.getPosts();
    this.loadItems();
   }

  ngOnInit() {
    // console.log(this.userID);
    this.getAgentChat();
  }

  // PWA Code
  listenForMessages() {
    this.messagingService.getMessages().subscribe(async (msg: any) => {
      const alert = await this.Alert.create({
        header: msg.notification.title,
        subHeader: msg.notification.body,
        message: msg.data.infor,
        buttons: ['OK']
      })
      await alert.present();
    })
  }

  requestPermission() {
    this.messagingService.requestPermission().subscribe(
      async token => {
        const toast = await this.toastCtrl.create({
          message: 'Got your token',
          duration: 2000
        })
        toast.present();
      },
      async (err) => {
        const alert = await this.Alert.create({
          header: 'Error',
          message: err,
          buttons: ['OK']
        })
        await alert.present();
      }
    )
  }

  async deleteToken() {
    this.messagingService.deleteToken();
    const toast = await this.toastCtrl.create({
      message: 'Token removed',
      duration: 2000
    })
    toast.present();
  }

  // Home Page Code
  getPostUpdate() {
    this.db.collection('postz').orderBy('date', 'desc').onSnapshot(Snapshop => {
      this.post = [];
     
      Snapshop.forEach(element => {
        this.post.push(element.data());
        console.log(this.posts);

        this.imgPost.push(element.data().image)
        this.imgPostNo = this.imagePost.length;

        // console.log(this.imgPost);
        // console.log(this.imgPostNo);

        // this.datezz = moment(element.data().date).endOf('day').fromNow();
      })
   });
   
  }

  // load ore scroll function
  loadItems() {
    this.afs.collection('postz', ref => ref
      .limit(7)
      .orderBy('date', 'desc')
    ).snapshotChanges()
      .subscribe(response => {
        if (!response.length) {
          console.log("No Data Available");
          return false;
        }
        this.firstInResponse = response[0].payload.doc;
        this.lastInResponse = response[response.length - 1].payload.doc;

        this.post = [];
        for (let item of response) {
          this.post.push(item.payload.doc.data());
          console.log(this.post);
        }

        //Initialize values
        this.prev_strt_at = [];
        this.pagination_clicked_count = 0;
        this.disable_next = false;
        this.disable_prev = false;

        //Push first item to use for Previous action
        this.push_prev_startAt(this.firstInResponse);

      }, error => {
    });
  }

  //Show previous set 
  prevPage() {
    this.disable_prev = true;
    this.afs.collection('postz', ref => ref
      .orderBy('date', 'desc')
      .startAt(this.get_prev_startAt())
      .endBefore(this.firstInResponse)
      .limit(7)
    ).get()
      .subscribe(response => {
        this.firstInResponse = response.docs[0];
        this.lastInResponse = response.docs[response.docs.length - 1];
        
        this.post = [];
        for (let item of response.docs) {
          this.post.push(item.data());
        }

        //Maintaing page no.
        this.pagination_clicked_count--;

        //Pop not required value in array
        this.pop_prev_startAt(this.firstInResponse);

        //Enable buttons again
        this.disable_prev = false;
        this.disable_next = false;
      }, error => {
        this.disable_prev = false;
      });
  }

  nextPage() {
    this.disable_next = true;
    this.afs.collection('postz', ref => ref
      .limit(7)
      .orderBy('date', 'desc')
      .startAfter(this.lastInResponse)
    ).get()
      .subscribe(response => {

        if (!response.docs.length) {
          this.disable_next = true;
          return;
        }

        this.firstInResponse = response.docs[0];

        this.lastInResponse = response.docs[response.docs.length - 1];
        this.post = [];
        for (let item of response.docs) {
          this.post.push(item.data());
        }

        this.pagination_clicked_count++;

        this.push_prev_startAt(this.firstInResponse);

        this.disable_next = false;
      }, error => {
        this.disable_next = false;
      });
  }

  //Add document
  push_prev_startAt(prev_first_doc) {
    this.prev_strt_at.push(prev_first_doc);
  }

  //Remove not required document 
  pop_prev_startAt(prev_first_doc) {
    this.prev_strt_at.forEach(element => {
      if (prev_first_doc.data().id == element.data().id) {
        element = null;
      }
    });
  }

  //Return the Doc rem where previous page will startAt
  get_prev_startAt() {
    if (this.prev_strt_at.length > (this.pagination_clicked_count + 1))
      this.prev_strt_at.splice(this.prev_strt_at.length - 2, this.prev_strt_at.length - 1);
    return this.prev_strt_at[this.pagination_clicked_count - 1];
  }

  // ////////////////////////////////////////////////////////////////////////////

  getPosts() {
    this.db.collection('post').orderBy('date', 'asc').onSnapshot(Snapshop => {
      this.posts = [];
     
      Snapshop.forEach(element => {
        // this.posts.push(element.data());
        // console.log(this.posts);

        this.imagePost.push(element.data().image)
        this.imagePostNo = this.imagePost.length;

        // console.log(this.imagePost);
        // console.log(this.imagePostNo);

        // this.datezz = moment(element.data().date).endOf('day').fromNow();
      })
   });
   
  }

  getAgentChat() {
    this.db.collection('agentchatlist').doc(this.userID).collection('mychats').onSnapshot(Snapshop => {
      this.agentchat = [];

      Snapshop.forEach(element => {
        this.agentchat.push(element.data());
        this.agentchatNo = this.agentchat.length;
        // console.log('Chat On', this.agentchatNo);
        // console.log(this.agentchat);
      });

   });
  }

  addmessage() {
    // console.log('im clicked');

    this.modalController.create({
      component: AddagentmessagePage,
      // componentProps: {
      //   id: id
      // }
    }).then(modal => modal.present())
  }

  getLikeId(id) {
    // console.log(id);
    // likes functions
   
    setTimeout(() => {
      this.postReference = this.afs.doc(`post/${id}`);
      this.sub = this.postReference.valueChanges().subscribe(val => {
        this.heartType = val.likes.includes(this.userID) ? 'heart' : 'heart-outline';
        // console.log(this.heartType);
        this.toggleHeart(this.heartType);
      })
    }, 1)
  }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }

  toggleHeart(heartType) {
    // console.log(heartType);
    // this.heartType = this.heartType == "heart" ? "heart-empty" : "heart"

    if (heartType == 'heart-outline') {
      this.postReference.update({
        likes: firebase.firestore.FieldValue.arrayUnion(this.userID)
      })
    } else {
      this.postReference.update({
        likes: firebase.firestore.FieldValue.arrayRemove(this.userID)
      })
    }
  }

  // addLikes(id) {
  //   // console.log('im clicked');
    
  //   this.db.collection('post').doc(id).onSnapshot(snapshot => {
  //     // console.log(snapshot);
  //     // console.log(id);
  //     // this.likes = 0;

  //     setTimeout(() => {
  //       this.likes = snapshot.data().likes;
  //     }, 1)
  //   })
    
  //   this.recheckLike(id, this.likes);
  //   // console.log(this.likes);
  //   // this.updatesLikes(id);
  // }

  // recheckLike(id, likes) {
  //   setTimeout(() => {
  //     // this.uploadingprogress = 100;
  //     this.updatesLikes(id, likes);
  //   }, 1)
  // }

  // updatesLikes(id, likes) {
  //   this.likeNo = 1;
  //   this.liked;

  //   this.liked = +likes + +this.likeNo;
  //   // console.log(liked);

  //   this.db.collection('post').doc(id).update({ likes: this.liked })
  //   .then(() => {
  //     this.Refresh();
  //   });
  //   // console.log('Post Liked');

  // }

  async Refresh() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/tabs/feedwall').then(async () => {
          await loading.dismiss();
          this.liked = 0;
        });
      });
    });
  }

  loadMore(event) {
    setTimeout(() => {
      // console.log('Timeout Done');
      event.target.complete();

      // if (this.posts.length === 1000) {
      //   event.target.disabled = true;
      //   event.target.complete();
      // }
    }, 2000);
  }

  // toggleInfiniteScroll() {
  //   this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  // }

  openPost() {
    this.modalController.create({
      component: PostPage,
      componentProps: {
        id: this.userID
      }
    }).then(modal => modal.present());
  }

  openPreview(image) {
    this.modalController.create({
      component: ImagemodalPage,
      componentProps: {
        image: image
      }
    }).then(modal => modal.present());
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

}
