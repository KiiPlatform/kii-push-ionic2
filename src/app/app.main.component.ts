import { Component } from '@angular/core';
import { LoginPage } from './app.login.component';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'app.main.html'
})

export class MainPage {
  constructor(private navCtrl: NavController) {
      this.installPush()
  }
  logout() {
    KiiUser.logOut()
    this.navCtrl.pop()
  }
  userID() : string {
    return KiiUser.getCurrentUser().getID()
  }

  installPush() {
      let push = PushNotification.init({
          android: {
              senderID: "12345679"
          },
          ios: {
              alert: "true",
              badge: true,
              sound: 'false'
          }
      });

      push.on('registration', (data) => {
          console.log(data.registrationId);
      });

      push.on('notification', (data) => {
          console.log(data.message);
          console.log(data.title);
          console.log(data.count);
          console.log(data.sound);
          console.log(data.image);
          console.log(data.additionalData);
      });
      push.on('error', (e) => {
          console.log(e.message);
      });
  }

}
