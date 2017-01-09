import { Injectable } from '@angular/core';
import { Http,Response,Request,RequestOptionsArgs,ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http/src/headers';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver'
/*
  Generated class for the WorkOrdersProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WorkOrdersProvider {

  constructor(public http: Http) {
    console.log('Hello WorkOrdersProvider Provider');
  }
  getTestExcle(){

    var url_address = 'assets/excel/test.xlsx';
    var headers = new Headers();
    //headers.append('Content-Type', 'application/x-xls');
    headers.append('Content-Type', 'application/octet-stream');
    console.log("getTestExcle");

    //export interface RequestOptionsArgs {
    //  url?: string;
    //  method?: string | RequestMethod;
    //  search?: string | URLSearchParams;
    //  headers?: Headers;
    //  body?: any;
    //  withCredentials?: boolean;
    //  responseType?: ResponseContentType;
    //}


    let styleId:ResponseContentType  =2;
    return this.http.request(url_address,
        {
          url : url_address,
          method: 'GET',
          responseType:styleId
        }).subscribe((res:any)=>{


          /**
           * Possible options: 'binary', 'base64', 'buffer', 'file'
           */
      console.log("getTestExcle",res);

          var data = new Uint8Array(res._body);
          var arr = new Array();
          for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            //for (let i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
          var bstr = arr.join("");
          var opts = {type:"binary",bookType:'xlsx',cellStyles:true}
           var workbook = XLSX.read(bstr, opts);
          var first_sheet_name = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[first_sheet_name];
          var sheet_name_list = workbook.SheetNames;
          var z;
            for (z in worksheet) {
            /* all keys that do not begin with "!" correspond to cell addresses */
            if(z[0] === '!') continue;
                //console.log( "cell["+z+"].s" + "=" ,worksheet[z].s);
                //console.log( "cell["+z+"].v" + "=" + JSON.stringify(worksheet[z].v));
                //console.log( "cell["+z+"].w" + "=" + JSON.stringify(worksheet[z].w));
                //console.log( "cell["+z+"].f" + "=" + JSON.stringify(worksheet[z].f));


          }
            console.log(worksheet);

    });
  }
  public handleError(error: Response): any {
    console.log("WorkOrdersProvider",error);
    return Observable.throw(error || 'Server error');
  }
  getExcle(){
    console.log("WorkOrdersProvider getExcle");
    return this.getTestExcle();
  }

}
