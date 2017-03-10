import { Component } from '@angular/core';
import { MainPage } from './app.main.component';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
    templateUrl: 'app.login.html'
})

export class LoginPage {
    username: string
    password: string
    constructor(private navCtrl: NavController,
                private alertCtrl: AlertController) {
                }
    login() {
        KiiUser.authenticate(this.username, this.password)
        .then(
            (user:KiiUser) => {
                this.navCtrl.push(MainPage);
            },
        )
        .catch((error:Error) => {
            let alert = this.alertCtrl.create({
                title: 'Failed to Login',
                message: error.message,
                buttons: ['OK']
            });
            alert.present();
        })
    }
}
