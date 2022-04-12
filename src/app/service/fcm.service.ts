import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  token = null;

  constructor(
    private fcm: FCM, 
    public plt: Platform,
    private afMessaging: AngularFireMessaging
  ) { }

  // PWA Code
  requestPermission() {
    return this.afMessaging.requestToken.pipe(
      tap(token => {
        console.log('Store token to Serve', token);
      })
    )
  }

  getMessages() {
    return this.afMessaging.messages;
  }

  deleteToken() {
    if (this.token) {
      this.afMessaging.deleteToken(this.token);
      this.token = null;
    }
  }

  // Store token to Serve e7MwrUAFwW2KWkrrS_P-Pc:APA91bEE_pjcgk6h47ZMtlVorUhFwrHN9gBV7inK34epKRJ3CP9y_1HlBlbxQeUcFlL3H5FQbls4zOPk04IGcQJBeiplH-ep-gcuAokQuM9PR2c8QB_1LJHD98nT1tzIoTGBeQTg5fWo

  // // Code to be included on TS
  // // devteck code

  // import { FCM } from '@ionic-native/fcm/ngx';
  // import { Platform } from '@ionic/angular';

  // constructor
    // private fcm: FCM, 
    // public plt: Platform

  // constructor() {
  //   // push notification code
  //   this.plt.ready()
  //     .then(() => {
  //       this.fcm.onNotification().subscribe(data => {
  //         if (data.wasTapped) {
  //           console.log("Received in background");
  //         } else {
  //           console.log("Received in foreground");
  //         };
  //       });

  //       this.fcm.onTokenRefresh().subscribe(token => {
  //         // Register your new token in your back-end if you want
  //         // backend.registerToken(token);
  //       });
  //     })
  // }

  // // push notification code
  // // create android project, download and copy google-services.json file in platforms/android for android
  // subscribeToTopic() {
  //   this.fcm.subscribeToTopic('postz');
  // }
  // getToken() {
  //   this.fcm.getToken().then(token => {
  //     // Register your new token in your back-end if you want
  //     // backend.registerToken(token);
  //   });
  // }
  // unsubscribeFromTopic() {
  //   this.fcm.unsubscribeFromTopic('postz');
  // }

  // requestPermission() {
  //   this.chatService.requestPermission().subscribe(
  //     async token => {
  //       const toast = await this.toastCtrl.create({
  //         message: 'Got your token',
  //         duration: 2000
  //       });
  //       toast.present();
  //     },
  //     async (err) => {
  //       const alert = await this.Alert.create({
  //         header: 'Error',
  //         message: err,
  //         buttons: ['OK'],
  //       });
 
  //       await alert.present();
  //     }
  //   );
  // }
 
  // async deleteToken() {
  //   this.chatService.deleteToken();
  //   const toast = await this.toastCtrl.create({
  //     message: 'Token removed',
  //     duration: 2000
  //   });
  //   toast.present();
  // }

  // pushs() {
  //   const express = require("express");
  //   const app = express();
  //   const FCM = require('fcm-node');
  //   const serverKey = '*********************' //put your server key here
  //   app.post('/send-push',(req,res) => {
  //     const message = {
  //       registration_ids: [...req.body.userFcmToken] ,  // array required
  //       notification: {
  //           title:req.body.notificationTitle ,
  //           body: req.body.notificationBody,
  //           sound:  "default",
  //           icon: "ic_launcher",
  //           badge:  req.body.notificationBadge ? req.body.notificationBadge : "1",
  //           click_action: 'FCM_PLUGIN_ACTIVITY',
  //       },
  //       priority: req.body.notificationPriority ? req.body.notificationPriority : 'high',
  //       data: {
  //           action:req.body.actionType, // Action Type
  //           payload:req.body.payload // payload
  //       }
  //     }
    
  //     const fcm = new FCM(serverKey)
  //         fcm.send(message, (err, response) => {
  //           if (err) {
  //             console.log("Something has gone wrong!", JSON.stringify(err));
  //             res.send(err);
  //           } else {
  //             console.log("Successfully sent with response: ", response);
  //             res.send(response)
  //         }
  //       })
  //   })
  // }
  
}
