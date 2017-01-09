import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoopBackConfig } from '../../shared/sdk';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PatrolPage } from '../pages/patrol/patrol';
import { RepairPage }from '../pages/repair/repair';
import { CookieBrowser }  from '../../shared/sdk/storage/cookie.browser';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform,public cookieBrowser: CookieBrowser) {
    LoopBackConfig.setBaseURL('http://192.168.3.14:3000');
    LoopBackConfig.setApiVersion('api');

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    if(this.cookieBrowser.get('access_token')){
      this.rootPage =LoginPage;
    }else{
      this.rootPage =LoginPage;
    }
  }
}
