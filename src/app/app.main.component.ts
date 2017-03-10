import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as popsicle from 'popsicle'

@Component({
  templateUrl: 'app.main.html'
})

export class MainPage {
  constructor(private navCtrl: NavController,
              private alertCtrl: AlertController) {
      this.installPush()
  }
  logout() {
    KiiUser.logOut()
    this.navCtrl.pop()
  }
  userID() : string {
    return KiiUser.getCurrentUser().getID()
  }
  token() : string {
      return KiiUser.getCurrentUser().getAccessToken()
  }
  appID() : string {
      return Kii.getAppID()
  }
  appKey() : string {
      return Kii.getAppKey()
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
          console.log(data.registrationId)
          let platform = device.platform.toUpperCase()
          popsicle.request({
              method: 'POST',
              url: 'https://api-jp.kii.com/api/apps/' + this.appID() + '/installations',
              body: {
                  installationRegistrationID: data.registrationId,
                  deviceType: platform,
                  development: true
              },
              headers: {
                  'Content-Type' : 'application/vnd.kii.InstallationCreationRequest+json',
                  'Authorization' : 'Bearer ' + this.token(),
                  'X-Kii-AppID' : '' + this.appID(),
                  'X-Kii-AppKey' : '' + this.appKey()
              }
          }).use(popsicle.plugins.parse('json'))
          .then((res) => {
              console.log(res);
              let message = 'installationID: ' + res['body']['installationID']
              message += '\n'
              message += 'deviceToken: ' + data.registrationId

              let alert = this.alertCtrl.create({
                  title: 'Installed push',
                  message: message,
                  buttons: ['OK']
              });
              alert.present();
          })
          .catch((error:Error) => {
              let alert = this.alertCtrl.create({
                  title: 'Failed to Install push',
                  message: error.message,
                  buttons: ['OK']
              });
              alert.present();
          })
      });

      push.on('notification', (data) => {
          let alert = this.alertCtrl.create({
              title: data.title,
              message: data.message,
              buttons: ['OK']
          });
          alert.present();
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
