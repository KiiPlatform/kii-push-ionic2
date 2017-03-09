import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from './app.login.component';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      Kii.initializeWithSite("9ab34d8b",
                             "7a950d78956ed39f3b0815f0f001b43b",
                             KiiSite.JP);
      let kiiUser: KiiUser;
    });
  }
}
