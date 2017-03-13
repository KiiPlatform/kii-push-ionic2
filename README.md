# Kii push sample in ionic2.

This sample demostrates how to crete application using Kii Cloud with ionic2.
We focus on utilize push notification in this sample.

## Push plugin
The sample is built with
[phonegap-plugin-push](https://github.com/phonegap/phonegap-plugin-push).

We also have
[kii-cordova-plugin](https://github.com/KiiPlatform/kii-cordova-plugin).
However `kii-cordova-plugin` doesn't support silent push handling/ customizing
notification.
If you plan to implement those features, using `phonegap-plugin-push` would be
better choice.

## Preparation

### Prerequisite
Before start, please prepare Kii Cloud application APNS/ FCM configured.

[FCM guide](http://docs.kii.com/en/samples/push-notifications/push-notifications-android-fcm/configure-devportal/)

[APNS guide](http://docs.kii.com/en/samples/push-notifications/push-notifications-ios/upload-certificate-to-kii/)

To do this, you may need Appled Developer/ FCM account and create/configure proper application in
those service as well.

### Install ionic

```shell
npm install -g ionic
npm install -g typings
```

### Clone source codes

```shell
git clone git@github.com:KiiPlatform/kii-push-ionic2.git
cd kii-push-ionic2
```

### Resolve dependencies

```shell
npm install
ionic platform add ios android
ionic plugin add phonegap-plugin-push
typings install
```

### Change configration

#### Configure id of the widget

Edit ./config.xml and change id in the widget

```xml
...
<widget id="com.kii.push3" ...
...
```

Please replace `com.kii.push3` with the valid buidle id/ package name
of which owned by you.


#### Configure Kii Cloud application ids

Edit ./src/app/kii.service.ts


```ts
...
export class KiiService {
    init(): void {
        let appID =  "9ab34d8b"
        let appKey = "7a950d78956ed39f3b0815f0f001b43b"
        let appSite = KiiSite.JP
...
```

Please replace `appID`, `appKey` and `appSite` with the one you've created
on developer.kii.com.
You need to setup GCM Key and APNS p12 files for the app properly.


#### Configure GCM Sender ID

Edit src/app/app.main.component.ts

```ts
...
    installPush() {
        let push = PushNotification.init({
            android: {
                senderID: "12345679"
            },
...
```

Please replace senderID with your FCM application's one.


## Build and Run

```shell
ionic run ios
ionic run android
```

# Notes of developing App using Kii SDK with ionic2

## Create app with blank template.
```shell
ionic start myApp blank --v2
```

## Place Kii SDK
[Download](https://developer.kii.com/v2/downloads) Kii Cloud SDK

Extract zip file and place `KiiSDK.js`.
{Your app root directory}/src/assets/js

Load Kii SDK from `src/index.html`

```html
<script src="assets/js/KiiSDK.js"></script>
```

## Install type definition
```shell
npm install @types/kii-cloud-sdk --save-dev
```

## Note:
After completed steps above you can use Kii SDK in typescript codes.
Kii SDK is not exported as module. You'll use SDK as global definition.
i.e. No import statement is used and you can just use APIs like 
browser app shown in the
[guides](http://docs.kii.com/en/guides/cloudsdk/javascript/).

Note that before platform.ready() is called, you can not use KiiSDK.

## Use library requires typings
Some library requires typings instead of @types in npm.
In this case, you may need to configure `complierOptions` in tsconfig.json
Please make sure to keep the reference to type information defined in both
@types in npm and typings.
