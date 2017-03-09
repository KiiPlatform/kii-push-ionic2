import { Component } from '@angular/core';
import { MainPage } from './app.main.component';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'app.login.html'
})

export class LoginPage {
  constructor(public navCtrl: NavController) {
  }
  login() {
    this.navCtrl.push(MainPage);
  }
}