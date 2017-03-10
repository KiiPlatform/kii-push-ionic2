import { Component } from '@angular/core';
import { LoginPage } from './app.login.component';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'app.main.html'
})

export class MainPage {
  constructor(private navCtrl: NavController) {
  }
  logout() {
    KiiUser.logOut()
    this.navCtrl.pop()
  }
  userID() : string {
    return KiiUser.getCurrentUser().getID()
  }
}
