import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { CookieBrowser } from '../../../shared/sdk/storage/cookie.browser';
import { LoopBackConfig } from '../../../shared/sdk';
import { PatrolConfigPage } from '../patrol-config/patrol-config';

/*
  Generated class for the EditPatrolConfig page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-patrol-config',
  templateUrl: 'edit-patrol-config.html'
})
export class EditPatrolConfigPage {
  id:string
  type:string;
  qrSize:string;
  qrCode:string;
  content:string;
  vAccessToken:string
  constructor(public navCtrl: NavController,private navParams: NavParams,
              private storageApi: CookieBrowser,
  ) {
    this.id      = navParams.get("id")
    this.type    = navParams.get("type")
    this.qrSize  = navParams.get("qrSize")
    this.qrCode  = navParams.get("img")
    this.content = navParams.get("content")
  }

  ionViewDidLoad() {
    let qrCode = JSON.parse(this.qrCode)
    if(qrCode.length)
    {
      this.vAccessToken = this.storageApi.get('access_token');
      this.qrCode =  LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion()
                      + '/OrganizationPatrolConfigs/' + this.id
                      + '/img/' + qrCode[0].fileName
                      + '?access_token=' + this.vAccessToken
    }
    else
    {
      this.qrCode = null
    }
  }
  close()
  {
    this.navCtrl.push(PatrolConfigPage)
  }
}
