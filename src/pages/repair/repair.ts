import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Account, AccessToken }  from '../../../shared/sdk/models';
import { AccountApi,OrganizationApi,OrganizationRepairApi,OrganizationAccountApi,OrganizationRankApi }            from '../../../shared/sdk/services';
import { CookieBrowser }            from '../../../shared/sdk/storage/cookie.browser';
import { Response } from '@angular/http';
import { LoopBackConfig } from '../../../shared/sdk';
import  { EditRepairPage }  from  '../../pages/edit-repair/edit-repair';
import { LoginPage } from '../login/login';
import { WorkOrdersPage } from '../work-orders/work-orders';
import　* as  Promise from 'bluebird';
import { LoopBackFilter } from '../../../shared/sdk/models/BaseModels';
/*
  Generated class for the Repair page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
// Repair
// {
//   rank: string;
//   imgs: string[];
//   content: string;
//   createdAt: Date;
//   creatorName: string;
//   repairsAddress: string;
// }


export class PageConfig
{
  pageIndex : number;
  pageSize  : number;
  pageCount : number;
  totalCount: number;
  pageConfCount:number;
}

export class WhereCondition{
  organizationId :string;
  status:string;
  creatorName:string;
  createdAt:any;
}
export interface Count
{
  count: number
}
@Component({
  selector: 'page-repair',
  templateUrl: 'repair.html'
})

export class RepairPage {
  isMouseOnTimeFilter = false
  active:boolean;
  stars = [1,2,3,4,5]
  _rating=4
  vData:any = null;
  dataCount    = 15;
  pageSize     = 3;
  pageIndex    = 1;
  pageMaxCount = 7;
  vOrgID:string;
  vUserOrgId:string;
  vContentData:any;
  vBaseUrl:string;
  vAccessToken:string;
  vAccountId:string;
  defaultOrg:string=null;
  curSelectedcOrg:string=null;
  vPage = new PageConfig();
  vSelfOrgPage = new PageConfig();
  vWhereCondition = new WhereCondition();
  vStartDate:Date = null
  vEndDate:Date = null
  isMouseOnType = false;
  isMouseOnStaff = false;
  vUserIcon:string
  vUserStatus = "类型";
  vFilterUserName = "人物";
  vUserList:any;
  vTypeList = [
    "类型",
    "待受理",
    "已受理",
    "执行中",
    "已分配",
    "已调度",
    "已完成"
  ]
  vSelfOrgNameList = [
  ]
  vChildOrgNameList = [
    "/物业",
    "/物业/财务",
    "/物业/金科"
  ]


  constructor(public navCtrl: NavController,navParams:NavParams,
              public storageApi: CookieBrowser,
              private organizationRepairApi:OrganizationRepairApi,
              private organizationApi:OrganizationApi,
              private AccountApi:AccountApi,
              private organizationAccountApi:OrganizationAccountApi,
              private OrganizationRankApi:OrganizationRankApi) {

  }
 
  ionViewDidLoad() {
    this.vUserIcon = this.storageApi.get('userIcon')
    this.loadData();

  }
  loadData(aOrgId?:string)
  {

    let vDefOrgID = aOrgId || this.storageApi.get('defaultOrgId')

    this.vUserOrgId = vDefOrgID
    if (vDefOrgID === '/' || vDefOrgID === ".")
    {
      this.vOrgID = "#repair"
    }
    else
    {
      this.vOrgID =  vDefOrgID + "/#repair"
    }

    this.vAccessToken = this.storageApi.get('access_token');
    this.vAccountId = this.storageApi.get('account');
    this.vUserList=[];
    this.vUserStatus="类型";
    this.vStartDate= null
    this.vEndDate= null
    if(this.vWhereCondition.status){
      delete this.vWhereCondition.status;
    }
    if(this.vWhereCondition.createdAt){
      delete this.vWhereCondition.createdAt;
    }
    if(this.vWhereCondition.creatorName){
      delete this.vWhereCondition.creatorName;
    }

    this.getSelfOrgAccountListApi({accountId:this.vAccountId}).then((data)=>{
      var result = JSON.parse(JSON.stringify(data));
      this.vSelfOrgNameList=[];
      for(let index of result) {
        this.vSelfOrgNameList.push(index);
      }
    });
    this.vBaseUrl = LoopBackConfig.getPath() + '/' + LoopBackConfig.getApiVersion();
    this.vWhereCondition.organizationId = this.vOrgID;
    let vFilter = this.setFilter(this.vPage,this.vWhereCondition)
    this.getRepairCount(this.vWhereCondition)
        .then((vCount:any)=>
        {
          this.vPage = this.getPageInfo(vCount.count)
          this.vPage.pageConfCount = 7;
          return this.getOrgAccountId(this.vPage.pageCount)
        })
        .then((vAccountList)=>
        {
          let vAccountArray = []
          for(let i = 0; i < vAccountList.length; i++)
          {
            vAccountArray = [...vAccountArray,...vAccountList[i]]
          }
          let vDisAccountArray = this.distinctArrayObj(vAccountArray,"accountId")
          return this.getUserFilter(vDisAccountArray)
        })
        .then((vUserList)=>
        {
          this.vUserList =[];
          this.vFilterUserName = "人物";
          this.vUserList.push({username:'人物'});
          for(let vUser of vUserList){
            this.vUserList.push(vUser);
          }
        })
        .catch((err)=>{
          console.log("getRepairCount useinfo then err:",err);
        });
    var httpRankPromise=[];
    this.getContentData(vDefOrgID,"#repair",vFilter)
        .then((vContentData)=>
        {
          this.vContentData = vContentData;
          for(let i = 0; i < this.vContentData.length; i++)
          {
            if(this.vContentData[i].imgs) {
              let vImageList = JSON.parse(this.vContentData[i].imgs)
              this.vContentData[i].imageUrl = this.imageList2Array(this.vContentData[i].id, vImageList, "imgs");
            }else{
              this.vContentData[i].imageUrl=[];
            }
            httpRankPromise.push(this.getRepairRank('OrganizationRepair_'+this.vContentData[i].id));
          }
          return Promise.all(httpRankPromise);
        }).then((ranklist)=>{
          this.setRank(this.vContentData,ranklist);
        }).catch((err)=>{
          console.log("getContentData then err:",err);
        });
  }

  distinctArrayObj(aList,aFieldName)
  {
    let vResult = []
    let distinctObj = {};
    for(let i = 0; i < aList.length; i++)
    {
      distinctObj[aList[i][aFieldName]] = 1
    }
    for(let key in distinctObj)
    {
      vResult.push(key)
    }
    return vResult
  }

  getOrgAccountId(aCount)
  {
    let vPromiseList = []
    for(let i = 0; i < aCount; i++)
    {
      let vSkipPage = i * this.vPage.pageSize
      let vFilter = {skip:vSkipPage,fields:{accountId:true}}
      let vGetContent = this.getContentData(this.vUserOrgId,"#staff",vFilter)
      vPromiseList.push(vGetContent)
    }
    return Promise.all(vPromiseList)
  }
  getUserFilter(aAccountIdList)
  {
    let vPromiseList = []
    for(let i = 0; i < aAccountIdList.length; i++)
    {
      let vFilter = {fields:{username:true}}
      let vUserName = this.getAccountById(aAccountIdList[i],vFilter)
      vPromiseList.push(vUserName)
    }
    return Promise.all(vPromiseList)
  }
  getAccountById(aId:string,aWhereCondition?:any)
  {
    return this.AccountApi.findById(aId,aWhereCondition)
        .toPromise();
  }

  getRepairCount(aWhereCondition?:any)
  {
    return  this.organizationRepairApi.count(aWhereCondition)
        .toPromise();
  }

  getPageInfo(aCount:number,aPageIndex?:number,aPageSize?:number)
  {
    let vPage = new PageConfig()
    aPageSize  = aPageSize  || 10;
    aPageIndex = aPageIndex || 1;
    vPage.pageSize  = aPageSize;
    vPage.pageIndex = aPageIndex;
    vPage.pageCount = Math.ceil(aCount/aPageSize);
    vPage.totalCount= aCount;
    return vPage;
  }
  imageList2Array(aId:string,aImageList:any = [],aFieldName:string)
  {

    let vResult = [];
    for(let i = 0; i < aImageList.length; i++)
    {
      let vImageUrl = this.vBaseUrl + '/OrganizationRepairs/' + aId + '/'
          + aFieldName + '/' + aImageList[i].fileName
          + '?access_token=' + this.vAccessToken
      vResult.push(vImageUrl)
    }
    return(vResult)
  }

  setFilter(aPage:any,aWhereCondition?:any)
  {
    let vResult = {skip:0,limit:10,where:{}}
    let vSkip = (aPage.pageIndex - 1) * aPage.pageSize
    let where = aWhereCondition
    vResult.skip = vSkip
    vResult.where= where
    vResult.limit=aPage.pageSize;
    return vResult
  }

  getContentData(orgId,aDept:string,aWhereFilter?:LoopBackFilter)
  {
    if( aWhereFilter.where && aWhereFilter.where.organizationId) {
      delete aWhereFilter.where.organizationId;
    }

    let vFilterId  = "";
    let vDefOrgID =orgId;

    if(vDefOrgID === '/' || vDefOrgID ==='.')
    {
      vFilterId = vDefOrgID + aDept
    }
    else
    {
      vFilterId = vDefOrgID + '/' + aDept
    }
    return this.organizationApi.children(encodeURIComponent(vFilterId),aWhereFilter)
        .toPromise();

  }
  setSearchValue(aValue:any,aColumn:any)
  {
    if(aColumn === 'user')
    {
      this.vFilterUserName = aValue
      this.vWhereCondition.creatorName = aValue
    }
    if(aColumn === 'type')
    {
      this.vUserStatus = aValue
      this.vWhereCondition.status = aValue
    }
  }


  searchByFilter()
  {
    if(this.vWhereCondition.status === "类型")
    {
      delete this.vWhereCondition.status
    }
    if(this.vWhereCondition.creatorName == "人物"){
      delete this.vWhereCondition.creatorName
    }
    if(this.vStartDate && this.vEndDate)
    {
      this.vEndDate.setHours(23);
      this.vEndDate.setMinutes(59);
      this.vEndDate.setSeconds(59);
      this.vEndDate.setMilliseconds(999);
      this.vWhereCondition.createdAt = {"between":[this.vStartDate.toISOString(),this.vEndDate.toISOString()]}
    }
    this.vPage.pageIndex = 1;

    this.vWhereCondition.organizationId = this.vOrgID;
    let vFilter = this.setFilter(this.vPage,this.vWhereCondition)
    this.getRepairCount(this.vWhereCondition)
        .then((vCount)=>
        {
          this.vPage = this.getPageInfo(vCount.count)
          this.vPage.pageConfCount = 7;
        })
    var httpRankPromise=[];
    this.getContentData(this.vUserOrgId,"#repair",vFilter)
        .then((vData)=>{
          this.vContentData = vData;
          for(let i = 0; i < this.vContentData.length; i++)
          {
            if(this.vContentData[i].imgs) {
              let vImageList = JSON.parse(this.vContentData[i].imgs)
              this.vContentData[i].imageUrl = this.imageList2Array(this.vContentData[i].id, vImageList, "imgs");
            }else{
              this.vContentData[i].imageUrl=[];
            }
            httpRankPromise.push(this.getRepairRank('OrganizationRepair_'+this.vContentData[i].id));
          }
          return Promise.all(httpRankPromise);
        }).then((ranklist)=>{
          this.setRank(this.vContentData,ranklist);
        }).catch((error)=>{
          console.log(error);
        });
  }
  setItem(aItem){
    let vEditDOM = aItem._elementRef.nativeElement.children[0].children[0].children[0].children[2]
    vEditDOM.style.visibility = "visible"
    aItem._elementRef.nativeElement.style.boxShadow="0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"

  }
  unSetItem(aItem){
    aItem._elementRef.nativeElement.style.boxShadow=""
    let vEditDOM = aItem._elementRef.nativeElement.children[0].children[0].children[0].children[2]
    vEditDOM.style.visibility = "hidden"
  }
  pageChangeEnv()
  {
    var httpRankPromise =[];
    this.vWhereCondition.organizationId = this.vOrgID;
    let vFilter = this.setFilter(this.vPage,this.vWhereCondition)
    this.getContentData(this.vUserOrgId,"#repair",vFilter)
        .then((vData)=>{
          this.vContentData = vData;
          for(let i = 0; i < this.vContentData.length; i++)
          {
            if(this.vContentData[i].imgs) {
              let vImageList = JSON.parse(this.vContentData[i].imgs)
              this.vContentData[i].imageUrl = this.imageList2Array(this.vContentData[i].id, vImageList, "imgs");
            }else{
              this.vContentData[i].imageUrl=[];
            }
            httpRankPromise.push(this.getRepairRank('OrganizationRepair_'+this.vContentData[i].id));
          }
          return Promise.all(httpRankPromise);
        }).then((ranklist)=>{
          this.setRank(this.vContentData,ranklist);
        });
  }
  setRank(vData,ranklist){
    for(let i = 0; i < vData.length;i++) {
      vData[i].rank = 0;
      for (let rankArray of  ranklist) {
        for (let index of rankArray) {
          if (('OrganizationRepair_' + vData[i].id) == index.id) {
            vData[i].rank = index.ranking;
            break;
          }
        }
      }
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
  getRepairRank(id){
    var curfilter={where:{id:id}};
    return this.OrganizationRankApi.find(curfilter)
        .toPromise()
  }
  editItem(aItem)
  {
    this.storageApi.set("eidtRepairData",aItem);
    this.navCtrl.push(EditRepairPage);
  }
  removeItem(aItem)
  {
    console.log(aItem)
  }
  loginOut()
  {
    console.log("logout");
    this.storageApi.remove('defaultOrgAccountId');
    this.storageApi.remove('defaultOrgId');
    this.storageApi.remove('access_token');
    this.storageApi.remove('account');
    this.navCtrl.push(LoginPage);
  }
  workOrdersPage()
  {
    console.log("workOrdersPage");
    this.navCtrl.push(WorkOrdersPage);
  }
  changeOrganization(orgId){
    if(orgId !== '返回'){
      this.loadData(orgId)
    }
  }
  changeSelfOrganization(orgId){
    this.vChildOrgNameList=[];
    this.getChildOrgIdlListApi(orgId,10).then((data)=>{
      var result = JSON.parse(JSON.stringify(data));
      this.vChildOrgNameList = result;
    }).catch((err)=>{

    });
  }

  /*****************************************************************************************************************
   * function : `getSelfOrgAccountListNum`
   * return self orgAccount list num by accoutId
   * author : lihan
   *****************************************************************************************************************/
  getSelfOrgAccountListNum(aWhereCondition?:any){
    //this.defaultOrg = this.storageApi.get('defaultOrgId');
    return this.organizationAccountApi.count(aWhereCondition)
        .toPromise();
  }
  /*****************************************************************************************************************
   * function : `getSelfOrgAccountListNum`
   * return self orgAccount list num by accoutId
   * author : lihan
   *****************************************************************************************************************/
  getSelfOrgAccountList(aWhereCondition?:any){
    //this.defaultOrg = this.storageApi.get('defaultOrgId');
    return this.organizationAccountApi.find(aWhereCondition)
        .toPromise()
  }
  /*****************************************************************************************************************
   * function : `getSelfOrgAccountListApi`
   * return self org list num by accoutId
   * author : lihan
   *****************************************************************************************************************/
  getSelfOrgAccountListApi(aWhereCondition?:any){
    var httpPromise =[];
    var selfOrgIdList=[];
    return new Promise((resolve, reject)=> {
      this.getSelfOrgAccountListNum(aWhereCondition)
          .then((vCount)=>{
            this.vSelfOrgPage = this.getPageInfo(vCount.count)
            this.vSelfOrgPage.pageConfCount = 7;
            for( var curPage = 0; curPage<this.vSelfOrgPage.pageCount;curPage++) {
              this.vSelfOrgPage = this.getPageInfo(vCount.count,curPage+1)
              let vFilter = this.setFilter(this.vSelfOrgPage, aWhereCondition)
              httpPromise.push(this.getSelfOrgAccountList(vFilter))
            }
            return Promise.all(httpPromise);
          }).then((data)=>{
            var result = JSON.parse(JSON.stringify(data));
            for(var index of result) {
              for (var vobj of index) {
                if(vobj.organizationId){
                  var pos =vobj.organizationId.indexOf('#staff');
                  var orgId_result = vobj.organizationId.substring(0,pos);
                  if(orgId_result){
                    selfOrgIdList.push(orgId_result);
                  }
                }
              }
            }
            resolve(selfOrgIdList);
          }).catch((error)=>{
            reject(error);
          });
    });
  }

  /*****************************************************************************************************************
   * function : `getChildOrgIdlList`
   * return child org list by orgid and max list is 10
   * author : lihan
   *****************************************************************************************************************/

  getChildOrgIdlList(orgId,limitNum,skipNum){
    //this.defaultOrg = this.storageApi.get('defaultOrgId');
    var curApi = this.organizationApi;
    var vOrgId = orgId + '.*'; // moongodb
    var orgList =[];
    var filteroptions=  '{"where":';
    filteroptions = filteroptions+'{'+'"id":'+ '{"like":"'+ orgId+'"}' +'},';
    filteroptions = filteroptions+'"limit":'+limitNum+',';
    filteroptions = filteroptions+'"skip":'+skipNum+'}';
    return  curApi.find(JSON.parse(filteroptions))
        .toPromise();
  }



  /*****************************************************************************************************************
   * function : `getChildOrgIdlListNum`
   * return child org list num by orgid
   * author : lihan
   *****************************************************************************************************************/
  getChildOrgIdlListNum(orgId){
    //this.defaultOrg = this.storageApi.get('defaultOrgId');
    var curApi = this.organizationApi;
    var self = this;
    var vOrgId = orgId + '.*'; // moongodb
    //var vOrgId = orgId + '%'; // mysal or sqlite
    return  curApi.count( {id:{like:vOrgId}})
        .toPromise();
  }
  /*****************************************************************************************************************
   * function : `getChildOrgIdlList`
   * return all child org list by orgid
   * author : lihan
   *****************************************************************************************************************/
  getChildOrgIdlListApi(orgId,numPerpage){
    var totalPage =0;
    var httpBPromiseList=[];
    var resultList=[];
    var self = this;
    return new Promise(function (resolve, reject) {

      self.getChildOrgIdlListNum(orgId).then((data)=> {
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

      }).then((orgList)=> {
        var result = JSON.parse(JSON.stringify(orgList));
        for (var index of result) {
          for(var childindex of index){
            resultList.push(childindex.id);
          }
        }
        resolve(resultList);
      }).catch((err)=> {
        reject(err);
      });
    });
  }
  getAccountInfo(accountId){
    var curApi = this.AccountApi;
    return curApi.getAccount((accountId), null)
        .toPromise()
  }
  /*****************************************************************************************************************
   * function : getStaffOfOrgListNum
   * return all staff list num  by organizationId
   * author : lihan
   *****************************************************************************************************************/
  getStaffOfOrgListNum(orgId){
    var vOrgId;
    if(orgId == '/'){
      vOrgId = orgId+'#staff';
    }else{
      vOrgId = orgId+'/#staff'
    }
    var curApi = this.organizationAccountApi;
    return  curApi.count({organizationId:vOrgId})
        .toPromise();
  }
  /*****************************************************************************************************************
   * function : makePromiseObject
   * return staff list  by organizationId
   * author : lihan
   *****************************************************************************************************************/
  getStaffOfOrgListApi(orgId,numPerpage){

    let self  = this;
    var vOrgId;
    var totalPage =0;
    var httpBPromiseList=[];
    var orgAccountList=[];
    if(orgId == '/'){
      vOrgId = orgId+'#staff';
    }else{
      vOrgId = orgId+'/#staff';
    }

    return new Promise(function (resolve, reject) {


      self.getStaffOfOrgListNum(orgId).then((data)=> {
        var result = JSON.parse(JSON.stringify(data));
        if (result != null && result.count != 0) {
          totalPage = result.count / numPerpage
          if (result.count == 1) {
            totalPage = 1;
          } else {
            totalPage = Math.trunc((result.count - 1) / numPerpage) + 1;
          }
          console.log(totalPage)
          for (var curpage = 0; curpage < totalPage; curpage++) {
            httpBPromiseList.push(self.getChildStaffOfOrgList(vOrgId,numPerpage,numPerpage * curpage))
          }
          return Promise.all(httpBPromiseList);
        } else {
          return Promise.all(httpBPromiseList);
        }

      }).then((orgList)=> {
        var result = JSON.parse(JSON.stringify(orgList));
        httpBPromiseList=[];
        for (var index of result) {
          for(var childindex of index){
            httpBPromiseList.push(self.getAccountInfo(childindex.accountId))
          }
        }
        return Promise.all(httpBPromiseList);
      }).then((accountInfo)=>{
        console.log(accountInfo);
        resolve(accountInfo);
      }).catch((err)=> {
        reject(err);
      });
    });
  }


  /*****************************************************************************************************************
   * function : getStaffOfOrgList
   * return staff list  by organizationId
   * author : lihan
   *****************************************************************************************************************/
  getChildStaffOfOrgList(orgId,limitNum,skipNum){
    var filteroptions=  '{';
    filteroptions = filteroptions+'"limit":'+limitNum+',';
    filteroptions = filteroptions+'"skip":'+skipNum+'}';
    console.log(filteroptions);
    var curApi = this.organizationApi;
    return curApi.children(encodeURIComponent(orgId),JSON.parse(filteroptions))
        .toPromise();
  }
}
