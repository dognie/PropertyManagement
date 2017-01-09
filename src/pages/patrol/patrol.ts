import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Response } from '@angular/http';

import * as Promise from 'bluebird';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver'
import * as SSF from 'ssf'
import { WindowRef } from './WindowRef';

import { LoginPage } from '../login/login';
import { PatrolConfigPage } from '../patrol-config/patrol-config';
import { LoopBackFilter } from '../../../shared/sdk/models/BaseModels';
import { AccountApi, OrganizationApi, OrganizationPatrolApi, OrganizationPatrolConfigApi, OrganizationAccountApi } from '../../../shared/sdk/services';
import { CookieBrowser } from '../../../shared/sdk/storage/cookie.browser';
import { LoopBackConfig } from '../../../shared/sdk';


/*
  Generated class for the Patrol page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export class WhereCondition {
    type: string
    createdAt: any;
    creatorName: string;
    organizationId: string;
}
export interface Count {
    count: number
}
export class PageConfig {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    pageConfCount: number;
}
@Component({
    selector: 'page-patrol',
    templateUrl: 'patrol.html',
    providers: [CookieBrowser, WindowRef]
})
export class PatrolPage {

    vSelfOrgNameList = [
    ]
    vChildOrgNameList = [
    ]
    vUserList: any = []
    vTypeList = [
        "类型",
        "设备巡检",
        "电子巡更"
    ]
    vContentData: any;
    vAccessToken: string;
    vAccountId: string;
    // vFilterUserType:string;
    vStartDate: any;
    vEndDate: any;
    vOrgID: string;
    vUserOrgId: string
    vUserIcon: string
    vFilterUserType = "类型";
    vFilterUserName = "人物";
    vPage = new PageConfig();
    vSelfOrgPage = new PageConfig();
    vWhereCondition = new WhereCondition();

    constructor(public navCtrl: NavController,
        public storageApi: CookieBrowser,
        public AccountApi: AccountApi,
        public OrganizationApi: OrganizationApi,
        public OrganizationAccountApi: OrganizationAccountApi,
        public OrganizationPatrolApi: OrganizationPatrolApi,
        public OrganizationPatrolConfigApi: OrganizationPatrolConfigApi
    ) {
    }

    ionViewDidLoad() {
        this.vUserIcon = this.storageApi.get('userIcon')
        this.loadData()
    }
    loadData(aOrgId?: string) {

        let vDefOrgID = aOrgId || this.storageApi.get('defaultOrgId')
        this.vUserOrgId = vDefOrgID
        if (vDefOrgID === '/' || vDefOrgID === ".") {
            this.vOrgID = "/#patrol"
        }
        else {
            this.vOrgID = vDefOrgID + "/#patrol"
        }
        this.vAccessToken = this.storageApi.get('access_token');
        this.vAccountId = this.storageApi.get('account');
        this.getSelfOrgAccountListApi({ accountId: this.vAccountId }).then((data) => {
            var result = JSON.parse(JSON.stringify(data));
            this.vSelfOrgNameList = [];
            for (let index of result) {
                this.vSelfOrgNameList.push(index);
            }
        });

        this.vWhereCondition.organizationId = this.vOrgID;
        let vFilter = this.setFilter(this.vPage, this.vWhereCondition)
        this.getPatrolCount(this.vWhereCondition)
            .then((vCount: any) => {
                this.vPage = this.getPageInfo(vCount.count)
                this.vPage.pageConfCount = 7;
                return this.getOrgAccountId(this.vPage.pageCount)
            })
            .then((vAccountList) => {
                let vAccountArray = []
                for (let i = 0; i < vAccountList.length; i++) {
                    vAccountArray = [...vAccountArray, ...vAccountList[i]]
                }
                let vDisAccountArray = this.distinctArrayObj(vAccountArray, "accountId")
                return this.getUserFilter(vDisAccountArray)
            })
            .then((vUserList) => {
                this.vUserList = [];
                this.vUserList.push({ username: '人物' });
                this.vFilterUserName = "人物";
                for (let vUser of vUserList) {
                    this.vUserList.push(vUser);
                }
            })
            .catch((err) => { console.log(err) })

        this.getContentData(vDefOrgID, "#patrol", vFilter)
            .then((vData) => {
                return this.getPatrolConfImage(vData)
            })
            .then((vContentData) => {
                this.vContentData = vContentData
            })
            .catch((err) => { console.log(err) })
    }

    distinctArrayObj(aList, aFieldName) {
        let vResult = []
        let distinctObj = {};
        for (let i = 0; i < aList.length; i++) {
            distinctObj[aList[i][aFieldName]] = 1
        }
        for (let key in distinctObj) {
            vResult.push(key)
        }
        return vResult
    }
    getPageInfo(aCount: number, aPageIndex?: number, aPageSize?: number) {
        let vPage = new PageConfig()
        aPageSize = aPageSize || 10;
        aPageIndex = aPageIndex || 1;
        vPage.pageSize = aPageSize;
        vPage.pageIndex = aPageIndex;
        vPage.pageCount = Math.ceil(aCount / aPageSize);
        vPage.totalCount = aCount;
        return vPage;
    }
    getPatrolCount(aWhereCondition?: any) {
        return this.OrganizationPatrolApi.count(aWhereCondition)
            .toPromise();
    }
    PatrolConfigFindById(aId: any, aFilter?: any) {
        return this.OrganizationPatrolConfigApi.findById(aId, aFilter)
            .toPromise();
    }
    getPatrolConfImage(aData) {
        let PromisePatrolConfList = []
        let vBaseUrl = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion()

        for (let i = 0; i < aData.length; i++) {
            let PromisePatrolConf = this.PatrolConfigFindById(aData[i].organizationPatrolConfigId)
            PromisePatrolConfList.push(PromisePatrolConf)
        }
        return Promise.all(PromisePatrolConfList)
            .then((aList) => {
                for (let i = 0; i < aData.length; i++) {
                    let vImage = JSON.parse(aList[i].img)
                    aData[i].ImageUrl = vBaseUrl + '/OrganizationPatrolConfigs/' + aList[i].id + '/img'
                        + '/' + vImage[0].fileName
                        + '?access_token=' + this.vAccessToken
                }
                return aData
            })
    }
    Orgchildren(orgId, aDept: string, aWhereFilter?: LoopBackFilter) {
        let vFilterId = ""
        let vDefOrgID = orgId;

        if (vDefOrgID === '/' || vDefOrgID === '.') {
            vFilterId = vDefOrgID + aDept
        }
        vFilterId = vDefOrgID + '/' + aDept
        return this.OrganizationApi
            .children(encodeURIComponent(vFilterId), aWhereFilter)
            .toPromise()
    }

    userAccountID(aID: string, aFilter?: any) {
        return this.AccountApi.findById(aID, aFilter)
            .toPromise()
    }
    getOrgAccountId(aCount) {
        let vPromiseList = []
        for (let i = 0; i < aCount; i++) {
            let vSkipPage = i * this.vPage.pageSize
            let vFilter = { skip: vSkipPage, fields: { accountId: true } }
            let vGetContent = this.getContentData(this.vUserOrgId, "#staff", vFilter)
            vPromiseList.push(vGetContent)
        }
        return Promise.all(vPromiseList)
    }
    getUserFilter(aAccountIdList) {
        let vPromiseList = []
        for (let i = 0; i < aAccountIdList.length; i++) {
            let vFilter = { fields: { username: true } }
            let vUserName = this.userAccountID(aAccountIdList[i], vFilter)
            vPromiseList.push(vUserName)
        }
        return Promise.all(vPromiseList)
    }

    patrolConfigList() {
        this.navCtrl.push(PatrolConfigPage);
    }
    getContentData(orgId, aDept: string, aWhereFilter?: LoopBackFilter) {
        if (aWhereFilter.where && aWhereFilter.where.organizationId) {
            delete aWhereFilter.where.organizationId;
        }

        let vFilterId = "";
        let vDefOrgID = orgId;

        if (vDefOrgID === '/' || vDefOrgID === '.') {
            vFilterId = vDefOrgID + aDept
        }
        else {
            vFilterId = vDefOrgID + '/' + aDept
        }
        return this.OrganizationApi.children(encodeURIComponent(vFilterId), aWhereFilter)
            .toPromise();

    }
    setItem(aItem) {
        let vEditDOM = aItem._elementRef.nativeElement.children[0].children[0].children[0].children[2]
        vEditDOM.style.visibility = "visible"
        aItem._elementRef.nativeElement.style.boxShadow = "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"

    }
    unSetItem(aItem) {
        aItem._elementRef.nativeElement.style.boxShadow = ""
        let vEditDOM = aItem._elementRef.nativeElement.children[0].children[0].children[0].children[2]
        vEditDOM.style.visibility = "hidden"
    }
    loginOut() {
        this.storageApi.remove('defaultOrgAccountId');
        this.storageApi.remove('defaultOrgId');
        this.storageApi.remove('access_token');
        this.storageApi.remove('account');
        this.navCtrl.push(LoginPage);
    }

    changeOrganization(orgId) {
        if (orgId !== '返回') {
            this.loadData(orgId)
        }
    }
    changeSelfOrganization(orgId) {
        this.vChildOrgNameList = [];
        this.getChildOrgIdlListApi(orgId, 10).then((data) => {
            var result = JSON.parse(JSON.stringify(data));
            this.vChildOrgNameList = result;
        }).catch((err) => {

        });
    }

    setSearchValue(aValue: any, aColumn: any) {
        if (aColumn === 'user') {
            this.vFilterUserName = aValue
            this.vWhereCondition.creatorName = aValue
        }
        if (aColumn === 'type') {
            this.vFilterUserType = aValue
            this.vWhereCondition.type = aValue
        }
    }
    searchByFilter() {
        if (this.vStartDate && this.vEndDate) {
            this.vEndDate.setHours(23);
            this.vEndDate.setMinutes(59);
            this.vEndDate.setSeconds(59);
            this.vEndDate.setMilliseconds(999);
            this.vWhereCondition.createdAt = { "between": [this.vStartDate.toISOString(), this.vEndDate.toISOString()] }
        }
        if (this.vWhereCondition.creatorName === "人物") {
            delete this.vWhereCondition.creatorName
        }
        if (this.vWhereCondition.type === "类型") {
            delete this.vWhereCondition.type
        }
        this.vPage.pageIndex = 1;
        this.vWhereCondition.organizationId = this.vOrgID;
        let vFilter = this.setFilter(this.vPage, this.vWhereCondition)
        this.getPatrolCount(this.vWhereCondition)
            .then((vCount: any) => {
                this.vPage = this.getPageInfo(vCount.count)
                this.vPage.pageConfCount = 7;
            })

        this.getContentData(this.vUserOrgId, "#patrol", vFilter)
            .then((vData) => {
                return this.getPatrolConfImage(vData)
            })
            .then((vContentData) => {
                this.vContentData = vContentData
            })
    }
    setFilter(aPage: any, aWhereCondition?: any) {
        let vResult = { skip: 0, where: {} }
        let vSkip = (aPage.pageIndex - 1) * aPage.pageSize
        let where = aWhereCondition
        vResult.skip = vSkip
        vResult.where = where
        return vResult
    }
    pageChangeEnv() {
        let vFilter = this.setFilter(this.vPage, this.vWhereCondition)
        this.getContentData(this.vUserOrgId, "#patrol", vFilter)
            .then((vData) => {
                this.getPatrolConfImage(vData)
                    .then((vContentData) => {
                        this.vContentData = vContentData
                    })
            })
    }
    convertJSONList2Array(aDataList) {
        let vColumn = [];
        let vResult = [];
        for (let k in aDataList[0]) {
            vColumn.push(k)
        }
        vResult.push(vColumn)
        for (let i = 0; i < aDataList.length; i++) {
            let vData = aDataList[i];
            let vDataArry = [];
            for (let j = 0; j < vColumn.length; j++) {
                vDataArry.push(vData[vColumn[j]])
            }
            vResult.push(vDataArry)
        }
        return vResult;
    }
    sheet_from_array_of_arrays(data, opts) {
        let ws = {};
        let range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
        for (let R = 0; R != data.length; ++R) {
            for (let C = 0; C != data[R].length; ++C) {
                if (range.s.r > R) range.s.r = R;
                if (range.s.c > C) range.s.c = C;
                if (range.e.r < R) range.e.r = R;
                if (range.e.c < C) range.e.c = C;
                let cell: XLSX.IWorkSheetCell = null
                cell = { v: data[R][C], t: null };
                if (cell.v == null) continue;
                let cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

                if (typeof cell.v === 'number') {
                    cell.t = 'n';
                }
                else if (typeof cell.v === 'boolean') cell.t = 'b';
                else if (typeof cell.v === 'Date') {
                    cell.t = 'n';
                    cell.z = SSF._table[14];
                }
                else cell.t = 's';

                ws[cell_ref] = cell;
            }
        }
        if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range.s, range.e);
        return ws;
    }
    s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    getExcelData() {
        let resultPromiseList = []
        // let vPage = new PageConfig();
        let vPage = this.vPage;
        for (let i = 1; i <= this.vPage.pageCount; i++) {
            vPage.pageIndex = i
            let vFilter = this.setFilter(vPage, this.vWhereCondition)
            let resultPromise = this.getContentData(this.vUserOrgId, "#patrol", vFilter)
            resultPromiseList.push(resultPromise)
        }
        return Promise.all(resultPromiseList)
    }
    mergeArrayList(aList) {
        let vAllData = []
        for (let i = 0; i < aList.length; i++) {
            vAllData = [...vAllData, ...aList[i]]
        }
        return vAllData
    }
    deleteNoUseField(aData: any, aIteam: any) {
        let vResult = []
        for (let i = 0; i < aData.length; i++) {
            let vData = aData[i]
            delete vData[aIteam]
            vResult.push(vData)
        }
        return vResult;
    }
    DownLoadExcel() {
        this.getExcelData()
            .then((vData) => {
                let vAllData = this.mergeArrayList(vData)
                let ExcelData = this.deleteNoUseField(vAllData, "organizationPatrolConfigId")
                let vExcelData = this.convertJSONList2Array(ExcelData)
                let ws_name = "WorkOrder";
                let wb = {
                    SheetNames: [],
                    Sheets: {}
                }
                let ws = this.sheet_from_array_of_arrays(vExcelData, null);
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;
                let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
                FileSaver.saveAs(new Blob([this.s2ab(wbout)], { type: "application/octet-stream" }), "Patrol.xlsx")

            })
    }
    /*****************************************************************************************************************
     * function : `getSelfOrgAccountListNum`
     * return self orgAccount list num by accoutId
     *****************************************************************************************************************/
    getSelfOrgAccountListNum(aWhereCondition?: any) {
        return this.OrganizationAccountApi.count(aWhereCondition)
            .toPromise();
    }
    /*****************************************************************************************************************
     * function : `getSelfOrgAccountListNum`
     * return self orgAccount list num by accoutId
     *****************************************************************************************************************/
    getSelfOrgAccountList(aWhereCondition?: any) {
        return this.OrganizationAccountApi.find(aWhereCondition)
            .toPromise()
    }
    /*****************************************************************************************************************
     * function : `getSelfOrgAccountListApi`
     * return self org list num by accoutId
     *****************************************************************************************************************/
    getSelfOrgAccountListApi(aWhereCondition?: any) {
        var httpPromise = [];
        var selfOrgIdList = [];
        return new Promise((resolve, reject) => {
            this.getSelfOrgAccountListNum(aWhereCondition)
                .then((vCount: any) => {
                    this.vSelfOrgPage = this.getPageInfo(vCount.count)
                    this.vSelfOrgPage.pageConfCount = 7;
                    for (var curPage = 0; curPage < this.vSelfOrgPage.pageCount; curPage++) {
                        this.vSelfOrgPage = this.getPageInfo(vCount, curPage + 1)
                        let vFilter = this.setFilter(this.vSelfOrgPage, aWhereCondition)
                        httpPromise.push(this.getSelfOrgAccountList(vFilter))
                    }
                    return Promise.all(httpPromise);
                }).then((data) => {
                    var result = JSON.parse(JSON.stringify(data));
                    for (var index of result) {
                        for (var vobj of index) {
                            if (vobj.organizationId) {
                                var pos = vobj.organizationId.indexOf('#staff');
                                var orgId_result = vobj.organizationId.substring(0, pos);
                                if (orgId_result) {
                                    selfOrgIdList.push(orgId_result);
                                }
                            }
                        }
                    }
                    resolve(selfOrgIdList);
                }).catch((error) => {
                    reject(error);
                });
        });
    }

    /*****************************************************************************************************************
     * function : `getChildOrgIdlList`
     * return child org list by orgid and max list is 10
     *****************************************************************************************************************/

    getChildOrgIdlList(orgId, limitNum, skipNum) {
        //this.defaultOrg = this.storageApi.get('defaultOrgId');
        var curApi = this.OrganizationApi;
        var self = this;
        var vOrgId = orgId + '.*'; // moongodb
        //var vOrgId = orgId + '%'; // mysal or sqlite
        var orgList = [];
        var filteroptions = '{"where":';
        filteroptions = filteroptions + '{' + '"id":' + '{"like":"' + orgId + '"}' + '},';
        filteroptions = filteroptions + '"limit":' + limitNum + ',';
        filteroptions = filteroptions + '"skip":' + skipNum + '}';
        return curApi.find(JSON.parse(filteroptions))
            .toPromise()
    }
    /*****************************************************************************************************************
     * function : `getChildOrgIdlListNum`
     * return child org list num by orgid
     *****************************************************************************************************************/
    getChildOrgIdlListNum(orgId) {
        //this.defaultOrg = this.storageApi.get('defaultOrgId');
        var curApi = this.OrganizationApi;
        var self = this;
        var vOrgId = orgId + '.*'; // moongodb
        var orgList = [];

        return curApi.count({ id: { like: vOrgId } })
            .toPromise();
    }
    /*****************************************************************************************************************
     * function : `getChildOrgIdlList`
     * return all child org list by orgid
     *****************************************************************************************************************/
    getChildOrgIdlListApi(orgId, numPerpage) {
        var totalPage = 0;
        var httpBPromiseList = [];
        var resultList = [];
        var self = this;
        return new Promise(function(resolve, reject) {

            self.getChildOrgIdlListNum(orgId).then((data) => {
                var result = JSON.parse(JSON.stringify(data));
                if (result != null && result.count != 0) {
                    totalPage = result.count / numPerpage
                    if (result.count == 1) {
                        totalPage = 1;
                    } else {
                        totalPage = Math.trunc((result.count - 1) / numPerpage) + 1;
                    }
                    for (var curpage = 0; curpage < totalPage; curpage++) {
                        httpBPromiseList.push(self.getChildOrgIdlList(orgId, numPerpage, numPerpage * curpage))
                    }
                    return Promise.all(httpBPromiseList);
                } else {
                    return Promise.all(httpBPromiseList);
                }

            }).then((orgList) => {
                var result = JSON.parse(JSON.stringify(orgList));
                for (var index of result) {
                    for (var childindex of index) {
                        resultList.push(childindex.id);
                    }
                }
                resolve(resultList);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    getAccountInfo(accountId) {
        var curApi = this.AccountApi;
        return curApi.getAccount((accountId), null)
            .toPromise();
    }
    /*****************************************************************************************************************
     * function : getStaffOfOrgListNum
     * return all staff list num  by organizationId
     *****************************************************************************************************************/
    getStaffOfOrgListNum(orgId) {
        var vOrgId;
        if (orgId == '/') {
            vOrgId = orgId + '#staff';
        } else {
            vOrgId = orgId + '/#staff'
        }
        var curApi = this.OrganizationAccountApi;
        return curApi.count({ organizationId: vOrgId })
            .toPromise();

    }
    /*****************************************************************************************************************
     * function : makePromiseObject
     * return staff list  by organizationId
     *****************************************************************************************************************/
    getStaffOfOrgListApi(orgId, numPerpage) {

        let self = this;
        var vOrgId;
        var totalPage = 0;
        var httpBPromiseList = [];
        var orgAccountList = [];
        if (orgId == '/') {
            vOrgId = orgId + '#staff';
        } else {
            vOrgId = orgId + '/#staff'
        }

        return new Promise(function(resolve, reject) {

            self.getStaffOfOrgListNum(orgId).then((data) => {
                var result = JSON.parse(JSON.stringify(data));
                if (result != null && result.count != 0) {
                    totalPage = result.count / numPerpage
                    if (result.count == 1) {
                        totalPage = 1;
                    } else {
                        totalPage = Math.trunc((result.count - 1) / numPerpage) + 1;
                    }
                    for (var curpage = 0; curpage < totalPage; curpage++) {
                        httpBPromiseList.push(self.getChildStaffOfOrgList(vOrgId, numPerpage, numPerpage * curpage))
                    }
                    return Promise.all(httpBPromiseList);
                } else {
                    return Promise.all(httpBPromiseList);
                }

            }).then((orgList) => {
                var result = JSON.parse(JSON.stringify(orgList));
                httpBPromiseList = [];
                for (var index of result) {
                    for (var childindex of index) {
                        httpBPromiseList.push(self.getAccountInfo(childindex.accountId))
                    }
                }
                return Promise.all(httpBPromiseList);
            }).then((accountInfo) => {
                resolve(accountInfo);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    /*****************************************************************************************************************
     * function : getStaffOfOrgList
     * return staff list  by organizationId
     *****************************************************************************************************************/
    getChildStaffOfOrgList(orgId, limitNum, skipNum) {
        var filteroptions = '{';
        filteroptions = filteroptions + '"limit":' + limitNum + ',';
        filteroptions = filteroptions + '"skip":' + skipNum + '}';
        var curApi = this.OrganizationApi;
        return curApi.children(encodeURIComponent(orgId), JSON.parse(filteroptions)).toPromise();

    }

}
