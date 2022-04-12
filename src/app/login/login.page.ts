import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { LoadingController, AlertController, MenuController, ModalController, ToastController} from '@ionic/angular';
import { Router } from '@angular/router';
import { KasiService } from './../service/kasi.service';
import { Directive, HostListener, Output, EventEmitter, ElementRef, Input } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @Output() onSignIn: EventEmitter<any> = new EventEmitter

  email;
  password;

  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  user = [];
  position;

  constructor(
    private kasi: KasiService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private router: Router,
    private formBuilder: FormBuilder,
    private FormsModule: FormsModule,
    private menuCtrl: MenuController,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,

    public Alert: AlertController,
    public toastController: ToastController,
    public modalController: ModalController,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
   }

  ngOnInit() {
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  resetPassword() {
    this.router.navigate(['reset-password']);
  }

  async signIn() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
 
    this.kasi.signIn(this.loginForm.value)
      .then(
        (res) => {
          this.afAuth.onAuthStateChanged((user) => {

            // this.afs.collection('users').doc(user.uid).get()
            // .subscribe(snap => {
            //   this.user.push(snap)
            //   console.log(this.user);
            // })

            this.kasi.getUsers(user.uid).subscribe(snap => {
              // console.log(snap);
              this.user.push(snap);
              // console.log(this.user);
            })

            setTimeout(() => {
              for (let key in this.user) {
                this.position = this.user[key].position;
              }
              // console.log(this.position);
              this.goToPAge(this.position);
              loading.dismiss();
            }, 3000);
          });
        },
        async (err) => {
          loading.dismiss();
          const alert = await this.alertCtrl.create({
            header: ':(',
            message: err.message,
            buttons: ['OK'],
          });
 
          await alert.present();
        }
      );
  }

  async goToPAge(position) {
    console.log(position);
    if (position == 'client') {
      console.log(position);
      this.router.navigateByUrl('/verify', { replaceUrl: true });
    } else if (position == 'admin') {
      console.log(position);
      this.router.navigateByUrl('/adminhome', { replaceUrl: true });
    }
  }

  async resetepassword() {
    let alert = await this.Alert.create({
      header: 'Reset Password!',
      inputs: [{
        name: 'Email',
        type: 'email',
        placeholder: 'Please enter Your Email'
      }],
      buttons: [{
        text: 'cancel',
        handler: () => {
          // console.log('Confirm Cancel');
        }
      }, {
        text: 'send',
        handler: (email) => {
          // console.log('email sent');
          this.kasi.resetepassword(email);
          this.ReseteMSG();
        }
      }]
    });
    await alert.present();
  }

  async ReseteMSG() {
    const alert = await this.Alert.create({
      header: 'Alert',
      subHeader: 'Resete Successful',
      message: 'Resete Link setup has been sent to your Email Account. Please check your Email inbox .',
      buttons: ['OK']
    });
    await alert.present();
  }

  async goToSignUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present().then(() => {
      this.menuCtrl.close().then(() => {
        this.router.navigateByUrl('/signup').then(async () => {
          await loading.dismiss();
        });
      });
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }

}
