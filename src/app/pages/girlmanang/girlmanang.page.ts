import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { ToastController } from '@ionic/angular';
import { ImagemodalPage } from '../imagemodal/imagemodal.page';
import { ManbooksPage } from './manbooks/manbooks.page';

@Component({
  selector: 'app-girlmanang',
  templateUrl: './girlmanang.page.html',
  styleUrls: ['./girlmanang.page.scss'],
})
export class GirlmanangPage implements OnInit {

  db = firebase.firestore();
  storage = firebase.storage().ref();
  userID = firebase.auth().currentUser.uid;

  girls = [];
  girlsNo;

  hookprofile = {
    image: '',
    name: null,
    location: null,
    contact: null,
    host: null,
    content: null,
    hook30mn: null,
    hook1hr: null,
    hook2hr: null,
    hooknight: null,
    like: null,
    comments: null
    };

    hookprice30;
    hookprice1hr;
    hookprice2hr;
    hookpricenight;

    price30;
    price1hr;
    price2hr;
    pricenight;

    uploadingprogress = 0;
    imageResponse = [];
    image;
    imagePost = [];
    imagePostNo;

    isimgLoaded: boolean = false;

  constructor(
    private router: Router,
    public loadingController: LoadingController,
    private menuCtrt: MenuController,
    private toastController: ToastController,
    public alertController: AlertController,
    private modalController: ModalController,
  ) {
    this.getHoohups();
   }

  ngOnInit() {
  }

  getHoohups() {
    this.db.collection('hookupgirls').doc(this.userID).onSnapshot(element => {
      this.girls = [];
     
        this.girls.push(element.data());
        this.girlsNo = this.girls.length;

        this.hookprofile.name = element.data().name;
        this.hookprofile.location = element.data().location;
        this.hookprofile.contact = element.data().contact;
        this.hookprofile.host = element.data().host;
        this.hookprofile.content = element.data().content;
        this.hookprofile.hook30mn = element.data().hook30mn;
        this.hookprofile.hook1hr = element.data().hook1hr;
        this.hookprofile.hook2hr = element.data().hook2hr;
        this.hookprofile.hooknight = element.data().hooknight;
        this.hookprofile.like = element.data().like;
        this.hookprofile.comments = element.data().comments;
        this.imagePost.push(element.data().image)

        this.imagePostNo = this.imagePost.length;

        this.hookprice30 = element.data().hook30mn / 10;
        this.hookprice1hr = element.data().hook1hr / 10;
        this.hookprice2hr = element.data().hook2hr / 10;
        this.hookpricenight = element.data().hooknight / 10;

        this.price30 = element.data().hook30mn;
        this.price1hr = element.data().hook1hr;
        this.price2hr = element.data().hook2hr;
        this.pricenight = element.data().hooknight;

        console.log("Coin", this.hookprofile.hook30mn);
        console.log("Coin", this.hookprofile.hook1hr);
        console.log("Coin", this.hookprofile.hook2hr);
        console.log("Coin", this.hookprofile.hooknight);

        console.log("Zaka 30min R", this.hookprice30);
        console.log("Zaka 1hr R", this.hookprice1hr);
        console.log("Zaka 2hr R", this.hookprice2hr);
        console.log("Zaka nught R", this.hookpricenight);

        // console.log(this.hookprofile.name);
        // console.log(this.hookprofile.location);
        // console.log(this.hookprofile.contact);
        // console.log(this.hookprofile.host);
        // console.log(this.hookprofile.content);
        // console.log(this.hookprofile.hook30mn);
        // console.log(this.hookprofile.hook1hr);
        // console.log(this.hookprofile.hook2hr);
        // console.log(this.hookprofile.hooknight);
        // console.log(this.hookprofile.like);
        // console.log(this.hookprofile.comments);
        // console.log(this.imagePost);
        // console.log(this.imagePostNo);

        // console.log(this.girls);
        // console.log(this.girlsNo);

        // this.datezz = moment(element.data().date).endOf('day').fromNow();
      })
  }

  async update() {
    if (this.hookprofile.name == "" || this.hookprofile.name == undefined) {
      const toast = await this.toastController.create({
        message: 'Enter Your Hookup Name.',
        duration: 2000
      });
      toast.present();
    } else if (this.hookprofile.location == "" || this.hookprofile.location == undefined) {
      const toast = await this.toastController.create({
        message: 'Enter Your Hookup Location.',
        duration: 2000
      });
      toast.present();
    } else if (this.hookprofile.contact == "" || this.hookprofile.contact == undefined) {
      const toast = await this.toastController.create({
        message: 'Enter Your Hookup Contact.',
        duration: 2000
      });
      toast.present();
    } else if (this.hookprofile.host == "" || this.hookprofile.host == undefined) {
      const toast = await this.toastController.create({
        message: 'Do you Host?.',
        duration: 2000
      });
      toast.present();
    } else if (this.hookprofile.content == "" || this.hookprofile.content == undefined) {
      const toast = await this.toastController.create({
        message: 'Enter Your Hookup Discription.',
        duration: 2000
      });
      toast.present();
    } else if (this.hookprofile.hook30mn == "" || this.hookprofile.hook30mn == undefined) {
      const toast = await this.toastController.create({
        message: 'Enter Price for 30 min Hookup.',
        duration: 2000
      });
      toast.present();
    } else if (this.hookprofile.hook1hr == "" || this.hookprofile.hook1hr == undefined) {
      const toast = await this.toastController.create({
        message: 'Enter Price for 1 Hour Hookup.',
        duration: 2000
      });
      toast.present();
    } else if (this.hookprofile.hook2hr == "" || this.hookprofile.hook2hr == undefined) {
      const toast = await this.toastController.create({
        message: 'Enter Price for 2 Hours Hookup.',
        duration: 2000
      });
      toast.present();
    } else if (this.hookprofile.hooknight == "" || this.hookprofile.hooknight == undefined) {
      const toast = await this.toastController.create({
        message: 'Enter Price for Whole Night Hookup.',
        duration: 2000
      });
      toast.present();
    } 
    // else if (this.image == "" || this.image == undefined) {
    //   const toast = await this.toastController.create({
    //     message: 'Choose Your Images (any Number).',
    //     duration: 2000
    //   });
    //   toast.present();
    // } 
    else {
      this.db.collection('hookupgirls').doc(firebase.auth().currentUser.uid).update({
        name: this.hookprofile.name,
        location: this.hookprofile.location,
        contact: this.hookprofile.contact,
        host: this.hookprofile.host,
        content: this.hookprofile.content,
        hook30mn: this.hookprofile.hook30mn,
        hook1hr: this.hookprofile.hook1hr,
        hook2hr: this.hookprofile.hook2hr,
        hooknight: this.hookprofile.hooknight,
        image: this.imageResponse
      }).then(res => {
        this.presentToast();
      })
    }
  }

  upDate30Min() {
    this.db.collection('hookupgirls').doc(firebase.auth().currentUser.uid).update({
      hook30mn: this.price30,
    }).then(res => {
      this.presentToast();
    })
  }

  upDate1hr() {
    this.db.collection('hookupgirls').doc(firebase.auth().currentUser.uid).update({
      hook1hr: this.price1hr,
    }).then(res => {
      this.presentToast();
    })
  }

  upDate2hr() {
    this.db.collection('hookupgirls').doc(firebase.auth().currentUser.uid).update({
      hook2hr: this.price2hr,
    }).then(res => {
      this.presentToast();
    })
  }

  upDatenight() {
    this.db.collection('hookupgirls').doc(firebase.auth().currentUser.uid).update({
      hooknight: this.pricenight,
    }).then(res => {
      this.presentToast();
    })
  }

  hook30min(ev: any) {
    console.log(ev.target.value);

    this.price30 = ev.target.value * 10

    console.log(this.price30);
    console.log("Total after", this.price30 / 10);

  }

  hook1hr(ev: any) {
    console.log(ev.target.value);

    this.price1hr = ev.target.value * 10

    console.log(this.price1hr);
    console.log("Total after", this.price1hr / 10);
  }

  hook2hr(ev: any) {
    console.log(ev.target.value);

    this.price2hr = ev.target.value * 10

    console.log(this.price2hr);
    console.log("Total after", this.price2hr / 10);
  }

  hooknight(ev: any) {
    console.log(ev.target.value);

    this.pricenight = ev.target.value * 10

    console.log(this.pricenight);
    console.log("Total after", this.pricenight / 10);
  }

  changeListener2(userprofiles): void {
    const i = userprofiles.target.files[0];
      // console.log(i);
      const upload = this.storage.child(i.name).put(i);
      upload.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('upload is: ', progress , '% done.');
        // progress bar count
        // console.log( progress );
        
        if (progress <= 90) {
          this.uploadingprogress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        } else {
          this.uploadingprogress = 90
        }
      }, err => {
      }, () => {
        upload.snapshot.ref.getDownloadURL().then(dwnURL => {
          
          this.image = dwnURL;
          
          console.log(this.image);
          setTimeout(() => {
            this.uploadingprogress = 100;
          }, 1000)
        }).then(() => {
          // this.imageResponse = [];
          this.imageResponse.push({
            image: this.image
          })

          console.log(this.imageResponse);
          
        });
      });
  }

  getPhoneInput(ev: any) {
    this.hookprofile.contact = ev.target.value;

    if (this.hookprofile.contact[0] !== '0') {
      this.presentAlertPhoneValidation();
    } else {
      // console.log('im working');
      this.hookprofile.contact = this.hookprofile.contact;
    }
      // console.log(this.phoneVal);
      // console.log(this.profile.contact);
  }

  async presentAlertPhoneValidation() {
    const alert = await this.alertController.create({
      header: 'Eish!',
      message: '<strong>Phone Numbers must start with a number: 0.</strong>!!!',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.erasedToContact();
            // console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertPhoneMaxLenght() {
    const alert = await this.alertController.create({
      header: 'Eish!',
      message: '<strong>Phone Numbers must have 10 numbers.</strong>!!!',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.erasedToContact();
            // console.log('im working');
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertPhoneMinLenght() {
    const alert = await this.alertController.create({
      header: 'Eish!',
      message: '<strong>Phone Numbers has less than 10 numbers.</strong>!!!',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.erasedToContact();
            // console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }

  erasedToContact() {
    this.hookprofile.contact = '';
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Account Updated.',
      duration: 9000,
      color: 'primary',
      position: 'bottom'
    });
    toast.present();
  }

  openCalender() {
    this.modalController.create({
      component: ManbooksPage,
      cssClass: 'my-custom-class'
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

  async goToCalender() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/hookcalender').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  async goToProfile() {
    const loading = await this.loadingController.create();
    await loading.present().then(() => {
      this.menuCtrt.close().then(() => {
        this.router.navigateByUrl('/tabs/profile').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  ionViewDidEnter() {
    this.menuCtrt.enable(false);
  }

}
