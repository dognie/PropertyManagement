import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginProvider } from '../../providers/login-provider';
import { PatrolPage } from '../../pages/patrol/patrol'
import { HomePage } from '../../pages/home/home'
import { Account, OrganizationAccount, AccessToken }  from '../../../shared/sdk/models';
import { AccountApi, OrganizationApi, OrganizationAccountApi }            from '../../../shared/sdk/services';
import { CookieBrowser }            from '../../../shared/sdk/storage/cookie.browser';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 　* as  Promise from 'bluebird';
import { AlertController, ToastController  } from 'ionic-angular';
import { LoopBackConfig } from '../../../shared/sdk';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [LoginProvider, CookieBrowser]
})
export class LoginPage {
    User = {
        userName: '',
        passWord: ''
    };
    vUserId: string
    vError = false;
    submitted = false;
    vOrgList = [];
    private account: Account = new Account();
    //private orgAccount:OrganizationAccount = new OrganizationAccount();
    constructor(public navCtrl: NavController, public alertCtrl: AlertController, public loginServer: LoginProvider,
        private accountApi: AccountApi, public storageApi: CookieBrowser,
        private organizationAccountApi: OrganizationAccountApi,
        private organizationApi: OrganizationApi,
        public toastCtrl: ToastController
    ) {
    }

    login() {

        var vResultList = [];
        this.loginApi()
            .then((token: any) => {
                this.storageApi.set('access_token', token.id);
                this.storageApi.set('account', token.user.id);
                this.storageApi.set('defaultOrgAccountId', token.user.defaultOrganizationId);
                let vUser = token.user
                let imageUrl = ""
                if (vUser.picture) {
                    let baseUrl = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion()
                    let userIcon = JSON.parse(vUser.picture)[0].fileName
                    imageUrl = baseUrl + '/Accounts/' + this.vUserId
                        + "/picture/" + userIcon
                        + '?access_token=' + token.id
                }
                else {
                    imageUrl = 'assets/image/userDefIcon.png'
                }
                this.storageApi.set('userIcon', imageUrl);
                return this.defaultOrgApi(encodeURIComponent(token.user.id));
            })
            .then((result) => {
                var pos = result.defaultOrganization.organizationId.indexOf('#staff');
                var defaultOrgId = result.defaultOrganization.organizationId.substring(0, pos);
                this.storageApi.set('defaultOrgId', defaultOrgId);
                vResultList.push(defaultOrgId);
                this.navCtrl.push(HomePage);
            })
            .catch((err) => {
                let alert = this.alertCtrl.create({
                    title: 'Error!',
                    subTitle: '用户名或密码错误',
                    buttons: ['取消']
                });
                alert.present();
                this.storageApi.remove('defaultOrgId');
                this.storageApi.remove('defaultOrgAccountId');
                this.storageApi.remove('account');
                this.storageApi.remove('access_token');
            });


    }
    loginApi() {
        var curApi = this.accountApi;
        var vAccout = this.account;
        return curApi.login(vAccout)
            .toPromise()
    }


    defaultOrgApi(userId) {
        var curApi = this.accountApi;
        var vAccout = this.account;
        return curApi.getAccount(userId, { "include": "defaultOrganization" })
            .toPromise()
    }
    logout() {
        //this.storageApi.get('access_token');
        this.storageApi.remove('defaultOrgAccountId');
        this.storageApi.remove('defaultOrgId');
        this.storageApi.remove('account');
        this.storageApi.remove('access_token');

    }
    /*****************************************************************************************************************
     * function : `getChildOrgIdlList`
     * return child org list by orgid
     *****************************************************************************************************************/
    getChildOrgIdlList(orgId) {
        //this.defaultOrg = this.storageApi.get('defaultOrgId');
        var curApi = this.organizationApi;
        var self = this;
        var vOrgId = orgId + '.*'; // moongodb
        //var vOrgId = orgId + '%'; // mysal or sqlite
        var orgList = [];
        curApi.find({ where: { id: { like: vOrgId } } })
            .toPromise()
    }


}
