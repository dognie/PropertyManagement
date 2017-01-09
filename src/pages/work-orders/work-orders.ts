import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WindowRef } from '../patrol/WindowRef';
import { Response } from '@angular/http';

import { LoopBackConfig } from '../../../shared/sdk';
import { CookieBrowser } from '../../../shared/sdk/storage/cookie.browser';
import { AccountApi,OrganizationApi,OrganizationWorkOrderApi,OrganizationAccountApi } from '../../../shared/sdk/services';
import { OrganizationWorkOrder,OrganizationWorkOrderInterface } from '../../../shared/sdk/models/OrganizationWorkOrder';
import { LoopBackFilter } from '../../../shared/sdk/models/BaseModels';
import { RepairPage } from '../repair/repair';
import { LoginPage } from '../login/login';
import  { EditWorkPage }  from  '../../pages/edit-work/edit-work';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver'
import * as SSF from 'ssf'
import　* as  Promise from 'bluebird';
import { WorkOrdersProvider } from '../../providers/work-orders-provider'
/*
  Generated class for the WorkOrders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export class PageConfig
{
  pageIndex : number;
  pageSize  : number;
  pageCount : number;
  totalCount: number;
  pageConfCount:number;
}
export class WhereCondition
{
  status: string
  organizationId :string;
  creatorName:string;
  createdAt:any;
}
export interface Count
{
  count: number
}
@Component({
  selector: 'page-work-orders',
  templateUrl: 'work-orders.html',
  providers: [WindowRef,WorkOrdersProvider]
})
export class WorkOrdersPage {
  vOrgID:string;
  vUserOrgId:string;
  vContentData:any;
  vBaseUrl:string;
  vAccessToken:string;
  isMouseOnType = false;
  isMouseOnStaff =false;
  vPage = new PageConfig();
  vSelfOrgPage = new PageConfig();
  vWhereCondition = new WhereCondition();
  vUserStatus = "类型"
  vStaff = "人物"
  vStartDate:Date = null
  vEndDate:Date = null
  vAccountId:string;
  vUserIcon:string
  vFilterUserName = "人物";
  vUserList:any;

  vDataStatusList = [
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
  vChildOrgNameList = []
  vStaffOfOrgList=[]
  pageMaxCount = 7;
  constructor(public navCtrl: NavController,public windowRef:WindowRef,
              public storageApi:CookieBrowser,public organizationWorkOrderApi:OrganizationWorkOrderApi,
              public organizationApi:OrganizationApi,
              private accountApi:AccountApi,
              private organizationAccountApi:OrganizationAccountApi,
              private workOrdersProvider:WorkOrdersProvider) {}

  ionViewDidLoad() {
    this.vUserIcon = this.storageApi.get('userIcon')
    this.loadData()
  }
  loadData(aOrgId?:string)
  {
    let vDefOrgID = aOrgId || this.storageApi.get('defaultOrgId')

    this.vUserOrgId = vDefOrgID
    if (vDefOrgID === '/' || vDefOrgID === ".")
    {
      this.vOrgID = "#repair-order"
    }
    else
    {
      this.vOrgID =  vDefOrgID + "/#repair-order"
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
    this.getWorkOrderCount(this.vWhereCondition)
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
    this.getContentData(vDefOrgID,"#repair-order",vFilter)
        .then((vContentData)=>
        {
          this.vContentData = vContentData;
          for(let i = 0; i < this.vContentData.length; i++)
          {
            if(this.vContentData[i].imgs) {
              let vImageList = JSON.parse(this.vContentData[i].imgs)
              this.vContentData[i].imageUrl = this.imageList2Array(this.vContentData[i].firstRepairId, vImageList, "imgs");
            }else{
              this.vContentData[i].imageUrl=[];
            }
          }
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
    return this.accountApi.findById(aId,aWhereCondition)
        .toPromise();
  }

  getWorkOrderCount(aWhereCondition?:any)
  {
    return  this.organizationWorkOrderApi.count(aWhereCondition)
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
    let vResult = {skip:0,where:{}}
    let vSkip = (aPage.pageIndex - 1) * aPage.pageSize
    let where = aWhereCondition
    vResult.skip = vSkip
    vResult.where= where
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
    this.getWorkOrderCount(this.vWhereCondition)
    .then((vCount)=>
      {
        this.vPage = this.getPageInfo(vCount.count)
        this.vPage.pageConfCount = 7;
      })
    this.getContentData(this.vUserOrgId,"#repair-order",vFilter)
    .then((vData)=>{
      this.vContentData = vData;
      for(let i = 0; i < this.vContentData.length; i++)
      {
        if(this.vContentData[i].imgs) {
          let vImageList = JSON.parse(this.vContentData[i].imgs)
          this.vContentData[i].imageUrl = this.imageList2Array(this.vContentData[i].firstRepairId, vImageList, "imgs");
        }else{
          this.vContentData[i].imageUrl=[];
        }
      }
    })
  }
  pageChangeEnv()
  {

    this.vWhereCondition.organizationId = this.vOrgID;
    let vFilter = this.setFilter(this.vPage,this.vWhereCondition)
    this.getContentData(this.vUserOrgId,"#repair-order",vFilter)
    .then((vData)=>{
      this.vContentData = vData;
      for(let i = 0; i < this.vContentData.length; i++)
      {
        if(this.vContentData[i].imgs) {
          let vImageList = JSON.parse(this.vContentData[i].imgs)
          this.vContentData[i].imageUrl = this.imageList2Array(this.vContentData[i].firstRepairId, vImageList, "imgs");

        }else{
          this.vContentData[i].imageUrl=[];
        }
      }
    })
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
  editItem(aItem)
  {
    this.storageApi.set("eidtWorkData",aItem);
    this.navCtrl.push(EditWorkPage);
  }

  loginOut()
  {
    //console.log("logout");
    this.storageApi.remove('defaultOrgAccountId');
    this.storageApi.remove('defaultOrgId');
    this.storageApi.remove('access_token');
    this.storageApi.remove('account');
    this.navCtrl.push(LoginPage);
  }
  repairPage()
  {
    //console.log("repairPage");
    this.navCtrl.push(RepairPage);
  }
  changeOrganization(orgId){
    if(orgId !== '返回'){
      this.loadData(orgId)
    }
  }
  changeSelfOrganization(orgId){
    this.getChildOrgIdlListApi(orgId,10).then((data)=>{
      var result = JSON.parse(JSON.stringify(data));
      this.vChildOrgNameList = result;
      //console.log(orgId, this.vChildOrgNameList);
      //console.log(this.vChildOrgNameList  );
    }).catch((err)=>{

    });
  }

// Print Page Function
// Data is this.vContentData
  getPrintInfor()
  {
    // load data should from new vData because 1 page need 20 count of patrol
    let vTable: string
    vTable  = '<table style="border-collapse:collapse;border:1px solid black;">'
    vTable += '<tr style="border:1px solid black;">'
    vTable += '<th style="border:1px solid black;">用户</th>'
    vTable += '<th style="border:1px solid black;">类型</th>'
    vTable += '<th style="border:1px solid black;">类容</th>'
    vTable += '<th style="border:1px solid black;">创建时间</th></tr>'
    for(let i = 0; i < this.vContentData.length; i++)
    {
      vTable += '<tr style="border:1px solid black;">'
      vTable += '<td style="border:1px solid black;">' + this.vContentData[i].creatorName + '</td>' +
                '<td style="border:1px solid black;">' + this.vContentData[i].type        + '</td>' +
                '<td style="border:1px solid black;">' + this.vContentData[i].content     + '</td>' +
                '<td style="border:1px solid black;">' + this.vContentData[i].createdAt   + '</td>'
      vTable += '</tr>'
    }
    vTable += "</table>"
    return vTable
  }
  printPage(event)
  {
    let mywindow = this.windowRef.nativeWindow.open('', 'PRINT', 'height=400,width=600');

    let vPrintInfo = this.getPrintInfor()
    mywindow.document.write('<html><head><title>' + document.title  + '</title>');

    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>工单列表</h1>');
    mywindow.document.write(vPrintInfo);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();
  }

//  Download Excel Full Function
//  Excel data is this.vContentData
  convertJSONList2Array(aDataList)
  {
    let vColumn = [];
    let vResult = [];
    for(let k in aDataList[0])
    {
      vColumn.push(k)
    }
    vResult.push(vColumn)
    for(let i = 0; i < aDataList.length; i++ )
    {
      let vData = aDataList[i];
      let vDataArry = [];
      for(let j = 0; j < vColumn.length; j++ )
      {
        vDataArry.push(vData[vColumn[j]])
      }
      vResult.push(vDataArry)
    }
    return vResult;
  }
  sheet_from_array_of_arrays(data, opts) {
    let ws = {};

    let cellstyle ={
      patternType: 'solid',
      fgColor:{
        theme:4,
        tint:0.7999816888943144,
         rgb:"DCDCDC"
      },
      bgColor:{indexed:64}
    }
    //let cellstyle = '{"patternType":"solid","fgColor":{"theme":7,"rgb":"EAFCE1"},"bgColor":{"indexed":64}}';
    //console.log(JSON.stringify(cellstyle));
    //console.log("workbook style", XLSX.IWorkBook.Sheets.Main.C1.s.fill)
    let range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
    for(let R = 0; R != data.length; ++R) {
      for(let C = 0; C != data[R].length; ++C) {
        if(range.s.r > R) range.s.r = R;
        if(range.s.c > C) range.s.c = C;
        if(range.e.r < R) range.e.r = R;
        if(range.e.c < C) range.e.c = C;
        let cell: XLSX.IWorkSheetCell = null
        if(R==0){
          if(data[R][C]  =='id'){data[R][C]= '工单编号'}
          if(data[R][C]  =='type'){data[R][C]= '服务类型'}
          if(data[R][C]  =='content'){data[R][C]= '报事内容'}
          if(data[R][C]  =='repairsAddress'){data[R][C]= '报修地址'}
          if(data[R][C]  =='createdAt'){data[R][C]= '创建时间'}
          if(data[R][C]  =='creatorName'){data[R][C]= '创建者'}
          if(data[R][C]  =='status'){data[R][C]= '工单状态'}
          if(data[R][C]  =='organizationId'){data[R][C]= '所属组织'}
          cell = {v: data[R][C],t:null};
        }else{
          cell = {v: data[R][C],t:null};
        }


        if(cell.v == null) continue;
        let cell_ref = XLSX.utils.encode_cell({c:C,r:R});

        if(typeof cell.v === 'number')
        {
          cell.t = 'n';
        }
        else if(typeof cell.v === 'boolean') cell.t = 'b';
        else if(typeof cell.v === 'Date') {
          cell.t = 'n';
          cell.z = SSF._table[14];
        }
        else cell.t = 's';
        cell.s = JSON.stringify(cellstyle);
        //cell.s = cellstyle;
        cell.z ="General";
        cell.w =cell.v;
        cell.h =cell.v;
        cell.r = '<t>' + cell.v + '</t>';
        ws[cell_ref] = cell;
      }
    }
    if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range.s,range.e);
    return ws;
  }
  s2ab(s) {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }
  getExcelData()
  {
    let resultPromiseList = []
    // let vPage = new PageConfig();
    let vPage = this.vPage;
    for(let i = 1; i <= this.vPage.pageCount;i++)
    {
      vPage.pageIndex = i
      let vFilter = this.setFilter(vPage,this.vWhereCondition)
      let resultPromise = this.getContentData(this.vUserOrgId,"#repair-order",vFilter)
      resultPromiseList.push(resultPromise)
    }
    return Promise.all(resultPromiseList)
  }
  mergeArrayList(aList)
  {
    let vAllData = []
    for(let i = 0; i < aList.length; i++)
    {
      vAllData = [...vAllData,...aList[i]]
    }
    return vAllData
  }
  deleteNoUseField(aData:any,aIteam:any)
  {
    let vResult = []
    for(let i = 0; i < aData.length; i++)
    {
      let vData = aData[i]
      delete vData[aIteam]
      vResult.push(vData)
    }
    return vResult;
  }
  DownLoadExcel(){
    this.getExcelData()
    .then((vData)=>{
      let vAllData = this.mergeArrayList(vData)
      let ExcelData = this.deleteNoUseField(vAllData,"imgs")
      ExcelData = this.deleteNoUseField(ExcelData,"schedulerId")
      ExcelData = this.deleteNoUseField(ExcelData,"executorId")
      ExcelData = this.deleteNoUseField(ExcelData,"curDealUserId")
      ExcelData = this.deleteNoUseField(ExcelData,"departmentId")
      ExcelData = this.deleteNoUseField(ExcelData,"schedulerName")
      ExcelData = this.deleteNoUseField(ExcelData,"executorName")
      ExcelData = this.deleteNoUseField(ExcelData,"updatedAt")
      ExcelData = this.deleteNoUseField(ExcelData,"creatorId")
      ExcelData = this.deleteNoUseField(ExcelData,"userName")
      ExcelData = this.deleteNoUseField(ExcelData,"firstRepairId")
      let vExcelData = this.convertJSONList2Array(ExcelData)
      let ws_name = "WorkOrder";
      let wb = {
        SheetNames:[],
        Sheets:{}
      }
      let ws = this.sheet_from_array_of_arrays(vExcelData,null);
      wb.SheetNames.push(ws_name);
      wb.Sheets[ws_name] = ws;
      //console.log(wb.Sheets[ws_name]);
      var opts = {type:"binary",bookType:'xlsx',cellStyles:true, sheetStubs: true,cellNF: true,bookSST:false }
      let wbout = XLSX.write(wb, opts);
      FileSaver.saveAs(new Blob([this.s2ab(wbout)],{type:"application/octet-stream"}), "workOrder.xlsx")

    })
  }


  ReadExcel(){


    //'binary', 'base64', 'buffer', 'file'
    this.workOrdersProvider.getExcle();
    //this.workOrdersProvider.getTestExcle();
    //var xlsx = XLSX.readFile('assets/excel/test.xls' );
    //console.log(xlsx.Props);

  }


  /*****************************************************************************************************************
   * function : `getSelfOrgAccountListNum`
   * return self orgAccount list num by accoutId
   * author : lihan
   *****************************************************************************************************************/
  getSelfOrgAccountListNum(aWhereCondition?:any){
    return  this.organizationAccountApi.count(aWhereCondition)
      .toPromise();
  }
  /*****************************************************************************************************************
   * function : `getSelfOrgAccountListNum`
   * return self orgAccount list num by accoutId
   * author : lihan
   *****************************************************************************************************************/
  getSelfOrgAccountList(aWhereCondition?:any){
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
          .then((vCount:any)=>{
            this.vSelfOrgPage = this.getPageInfo(vCount.count)
            this.vSelfOrgPage.pageConfCount = 7;
            for( var curPage = 0; curPage<this.vSelfOrgPage.pageCount;curPage++) {
              this.vSelfOrgPage = this.getPageInfo(vCount,curPage+1)
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
    var self = this;
    var vOrgId = orgId + '.*'; // moongodb
    //var vOrgId = orgId + '%'; // mysal or sqlite
    var orgList =[];
    var filteroptions=  '{"where":';
    filteroptions = filteroptions+'{'+'"id":'+ '{"like":"'+ orgId+'"}' +'},';
    filteroptions = filteroptions+'"limit":'+limitNum+',';
    filteroptions = filteroptions+'"skip":'+skipNum+'}';
    return curApi.find(JSON.parse(filteroptions))
           .toPromise()
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
    var orgList =[];

    return curApi.count( {id:{like:vOrgId}})
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
    let self  = this;
    var curApi = this.accountApi;
    return curApi.getAccount((accountId), null)
      .toPromise();
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
    return curApi.count({organizationId:vOrgId})
        .toPromise();

  }
  /*****************************************************************************************************************
   * function : makePromiseObject
   * return staff list  by organizationId
   * author : lihan
   *****************************************************************************************************************/
  getStaffOfOrgListApi(orgId,numPerpage) {

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
          for (var curpage = 0; curpage < totalPage; curpage++) {
            httpBPromiseList.push(self.getChildStaffOfOrgList(vOrgId, numPerpage, numPerpage * curpage))
          }
          return Promise.all(httpBPromiseList);
        } else {
          return Promise.all(httpBPromiseList);
        }

      }).then((orgList)=> {

        var result = JSON.parse(JSON.stringify(orgList));
        httpBPromiseList = [];
        for (var index of result) {
          for (var childindex of index) {
            httpBPromiseList.push(self.getAccountInfo(childindex.accountId))
          }
        }
        return Promise.all(httpBPromiseList);
      }).then((accountInfo)=> {
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
    //console.log(filteroptions);
    var curApi = this.organizationApi;
    return curApi.children(encodeURIComponent(orgId),JSON.parse(filteroptions)).toPromise();

  }
}
