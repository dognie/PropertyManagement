import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccountApi,OrganizationApi,OrganizationWorkOrderApi,OrganizationAccountApi } from '../../../shared/sdk/services';
import { OrganizationWorkOrder,Account } from '../../../shared/sdk/models';
import { CookieBrowser }            from '../../../shared/sdk/storage/cookie.browser';
/*
  Generated class for the AddWork page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-work',
  templateUrl: 'edit-work.html'
})
export class EditWorkPage {
  data:any=null;
  account:any=null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      private storageApi:CookieBrowser,
      private accountApi:AccountApi,
      private organizationRepairApi:OrganizationWorkOrderApi) {

      this.data = new OrganizationWorkOrder();
      this.account=new Account();


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditWorkPage');
    let vData = this.storageApi.get('eidtWorkData');
    if (vData) this.data = vData;
  }

}
