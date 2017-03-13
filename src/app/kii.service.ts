import { Injectable } from '@angular/core';
import * as popsicle from 'popsicle'

@Injectable()
export class KiiService {
    init(): void {
        let appID =  "9ab34d8b"
        let appKey = "7a950d78956ed39f3b0815f0f001b43b"
        let appSite = KiiSite.JP
        Kii.initializeWithSite(appID,
                               appKey,
                               appSite);
    }

    login(username: string, password: string): Promise<KiiUser> {
        return KiiUser.authenticate(username, password)
    }

    logout() : void {
        KiiUser.logOut()
    }

    userID() : string {
        return KiiUser.getCurrentUser().getID()
    }

    installToken(deviceToken: string, platform: string): Promise<any> {
        if (!KiiUser.getCurrentUser()) {
            return new Promise((resolve, reject) => {
                reject(new Error("No login user."))
            })
        }
        let appID = Kii.getAppID()
        let appKey = Kii.getAppKey()
        let accessToken = KiiUser.getCurrentUser().getAccessToken()
        return popsicle.request({
            method: 'POST',
            url: 'https://api-jp.kii.com/api/apps/' + appID + '/installations',
            body: {
                installationRegistrationID: deviceToken,
                deviceType: platform,
                development: true
            },
            headers: {
                'Content-Type' : 'application/vnd.kii.InstallationCreationRequest+json',
                'Authorization' : 'Bearer ' + accessToken,
                'X-Kii-AppID' : '' + appID,
                'X-Kii-AppKey' : '' + appKey
            }
        }).use(popsicle.plugins.parse('json'))
    }
}

