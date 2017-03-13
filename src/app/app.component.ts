import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from './app.login.component';
import { KiiService } from './kii.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage

  constructor(platform: Platform,
              kiiService: KiiService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      kiiService.init();
    });
  }
}
