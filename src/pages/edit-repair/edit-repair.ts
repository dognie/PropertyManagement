import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { CookieBrowser }            from '../../../shared/sdk/storage/cookie.browser';
import { Account,OrganizationRepair,AccessToken }  from '../../../shared/sdk/models';

import { AccountApi,OrganizationAccountApi,OrganizationRepairApi }            from '../../../shared/sdk/services';

import 'rxjs/add/operator/map';
import { Response } from '@angular/http';
/*
  Generated class for the AddRepair page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-repair',
  templateUrl: 'edit-repair.html'
})
export class EditRepairPage {
  data:any=null;
  account:any=null;
  vRepairProgressImage=[];
  stars = [1,2,3,4,5]
  constructor(public navCtrl: NavController,navParams:NavParams,
  	          private storageApi:CookieBrowser,
              private accountApi:AccountApi,
  	          private organizationRepairApi:OrganizationRepairApi) {
  	this.data = new OrganizationRepair(); 
    this.account=new Account();
    this.vRepairProgressImage=[];
    this.vRepairProgressImage.push({imgpath:"assets/image/g.jpg",filtervalue:1});
    this.vRepairProgressImage.push({imgpath:"assets/image/h.jpg",filtervalue:1});
    this.vRepairProgressImage.push({imgpath:"assets/image/i.jpg",filtervalue:1});
    this.vRepairProgressImage.push({imgpath:"assets/image/j.jpg",filtervalue:1});
  
  }

  ionViewDidLoad() {
    let vData = this.storageApi.get('eidtRepairData');
    if(vData) this.data = vData;
     this.rankStyleImg();

   }

  rankStyleImg() {

    this.vRepairProgressImage=[];
      if(this.data.status=='待受理'){
        this.vRepairProgressImage.push({imgpath:"assets/image/g.jpg",filtervalue:0});
        this.vRepairProgressImage.push({imgpath:"assets/image/h.jpg",filtervalue:1});
        this.vRepairProgressImage.push({imgpath:"assets/image/i.jpg",filtervalue:1});
        this.vRepairProgressImage.push({imgpath:"assets/image/j.jpg",filtervalue:1});
      }else if(this.data.status=='已受理'){
        this.vRepairProgressImage.push({imgpath:"assets/image/g.jpg",filtervalue:0});
        this.vRepairProgressImage.push({imgpath:"assets/image/h.jpg",filtervalue:0});
        this.vRepairProgressImage.push({imgpath:"assets/image/i.jpg",filtervalue:1});
        this.vRepairProgressImage.push({imgpath:"assets/image/j.jpg",filtervalue:1});
     }else if(this.data.status=='已分配'){
        this.vRepairProgressImage.push({imgpath:"assets/image/g.jpg",filtervalue:0});
        this.vRepairProgressImage.push({imgpath:"assets/image/h.jpg",filtervalue:0});
        this.vRepairProgressImage.push({imgpath:"assets/image/i.jpg",filtervalue:1});
        this.vRepairProgressImage.push({imgpath:"assets/image/j.jpg",filtervalue:1});
     }else if(this.data.status=='执行中'|| this.data.status=='已调度'){
        this.vRepairProgressImage.push({imgpath:"assets/image/g.jpg",filtervalue:0});
        this.vRepairProgressImage.push({imgpath:"assets/image/h.jpg",filtervalue:0});
        this.vRepairProgressImage.push({imgpath:"assets/image/i.jpg",filtervalue:0});
        this.vRepairProgressImage.push({imgpath:"assets/image/j.jpg",filtervalue:1});
     }else if(this.data.status=='已完成'){
        this.vRepairProgressImage.push({imgpath:"assets/image/g.jpg",filtervalue:0});
        this.vRepairProgressImage.push({imgpath:"assets/image/h.jpg",filtervalue:0});
        this.vRepairProgressImage.push({imgpath:"assets/image/i.jpg",filtervalue:0});
        this.vRepairProgressImage.push({imgpath:"assets/image/j.jpg",filtervalue:0});
     }else{
          this.vRepairProgressImage.push({imgpath:"assets/image/g.jpg",filtervalue:0});
          this.vRepairProgressImage.push({imgpath:"assets/image/h.jpg",filtervalue:1});
          this.vRepairProgressImage.push({imgpath:"assets/image/i.jpg",filtervalue:1});
          this.vRepairProgressImage.push({imgpath:"assets/image/j.jpg",filtervalue:1});
      }
   }



    isRating(aData,aStatIndex) {
        if(aData.rank >= aStatIndex)
        {
            return true;
        }
        return false;


        ///return true;
    }

  getStatus(aValue)
  {
    if(aValue.filtervalue)
    {
      return false;
    }
    return true;
   }


}
