import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http/src/headers';

/*
  Generated class for the PatrolProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PatrolProvider {
    accessToken: any = null;
    constructor(public http: Http) {
        //console.log('Hello PatrolProvider Provider');
    }
    /*****************************************************************************************************************
     * function : getPatrolList
     * return patrol list by accesstoken
     *****************************************************************************************************************/
    patrolList(token_id, option, pageConfig) {
        var url_address = 'http://192.168.3.14:3000/api/OrganizationPatrols?';
        //console.log(url_address);
        var isWhere = (option.organization_id != null && option.organization_id.length != 0) ||
            (option.username != null && option.username.length != 0) ||
            (option.type != null && option.type.length != 0) ||
            (option.content != null && option.content.length != 0) ||
            (option.start_time != null && option.start_time.length != 0) ||
            (option.end_time != null && option.end_time.length != 0) ||
            (pageConfig.numPerPage > 0);
        if (isWhere) {
            url_address = url_address + 'filter={"where":{';

            url_address = url_address + '"and":[';

            if (option.organization_id != null && option.organization_id.length != 0) {
                url_address = url_address + '{' + '"organization_id":' + option.organization_id + '"},';
            }
            if (option.username != null && option.username.length != 0) {
                url_address = url_address + '{' + '"username":"' + option.username + '"},';
            }
            if (option.type != null && option.type.length != 0) {
                url_address = url_address + '{' + '"type":"' + option.type + '"},';
            }
            if (option.content != null && option.content.length != 0) {
                url_address = url_address + '{' + '"content":"' + option.content + '"},';
            }
            if (option.start_time != null && option.start_time.length != 0) {
                url_address = url_address + '{' + '"createdAt":{"gte":"' + option.start_time
                    + '"}},';
            }
            if (option.end_time != null && option.end_time.length != 0) {
                url_address = url_address + '{' + '"createdAt":{"lte":"' + option.end_time
                    + '"}},';
            }
            url_address = url_address + '{}';
            url_address = url_address + ']}';
            url_address = url_address + ',"limit":"' + pageConfig.numPerPage + '"';
            url_address = url_address + ',"skip":"' + (pageConfig.curPageNo - 1) * pageConfig.numPerPage + '"';
            url_address = url_address + '}';
            url_address = url_address + '&access_token=' + token_id;
        }
        else {
            url_address = url_address + '&access_token=' + token_id;
        }
        //console.log(url_address);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.get(url_address, { headers: headers }
        )
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    /*****************************************************************************************************************
     * function : patrolListNum
     * return patrol  num by where condtion
     * where condtion example:  {"and":[{ "createdAt":{"gte":"2016-12-13T01:54:13.321Z"   } },{"type":"设备巡检"},{}]}
     * {"and":[{ "createdAt":{"gt":"2016-12-13T01:54:13.321Z"  } },{}]}
     *****************************************************************************************************************/

    patrolListNum(token_id, option) {
        var url_address = 'http://192.168.3.14:3000/api/OrganizationPatrols/count?';
        var isWhere = (option.organization_id != null && option.organization_id.length != 0) ||
            (option.username != null && option.username.length != 0) ||
            (option.type != null && option.type.length != 0) ||
            (option.content != null && option.content.length != 0) ||
            (option.start_time != null && option.start_time.length != 0) ||
            (option.end_time != null && option.end_time.length != 0);

        if (isWhere) {
            url_address = url_address + 'where={';

            url_address = url_address + '"and":[';

            if (option.organization_id != null && option.organization_id.length != 0) {
                url_address = url_address + '{' + '"organization_id":"' + option.organization_id + '"},';
            }
            if (option.username != null && option.username.length != 0) {
                url_address = url_address + '{' + '"username":"' + option.username + '"},';
            }
            if (option.type != null && option.type.length != 0) {
                url_address = url_address + '{' + '"type":"' + option.type + '"},';
            }
            if (option.content != null && option.content.length != 0) {
                url_address = url_address + '{' + '"content":"' + option.content + '"},';
            }
            if (option.start_time != null && option.start_time.length != 0) {
                url_address = url_address + '{' + '"createdAt":{"gte":"' + option.start_time
                    + '"}},';
            }
            if (option.end_time != null && option.end_time.length != 0) {
                url_address = url_address + '{' + '"createdAt":{"lte":"' + option.end_time
                    + '"}},';
            }
            url_address = url_address + '{}';
            url_address = url_address + ']}';
            url_address = url_address + '&access_token=' + token_id;
        }
        else {
            url_address = url_address + '&access_token=' + token_id;
        }

        //console.log(url_address);

        //var whereOpt={
        //    type: "设备巡检",
        //    creatorName: "admin"
        //}
        //if (whereOpt!=null){
        //
        //    for(var key in whereOpt ){
        //
        //        url_address =
        //        console.log("key=",key);
        //        console.log("value=",whereOpt[key]);
        //    }
        //
        //}

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.get(url_address, { headers: headers }
        )
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    /*****************************************************************************************************************
     * function : patrolListImage
     * return patrol config list  by accesstoken and patrol_id
     *****************************************************************************************************************/
    patrolListImage(token_id, patrol_id) {
        var url_address = 'http://192.168.3.14:3000/api/OrganizationPatrolConfigs/' +
            patrol_id + '/' + '?access_token=' + token_id;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //console.log(url_address);
        return this.http.get(url_address, { headers: headers }
        )
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    /*****************************************************************************************************************
     * function : updatePatrolList
     * update partol instance by id
     *****************************************************************************************************************/
    updatePatrolList(token_id, patrol_id) {
        var url_address = 'http://192.168.3.14:3000/api/OrganizationPatrolConfigs/' +
            patrol_id + '/' + '?access_token=' + token_id;

        //console.log(url_address);
        return this.http.get(url_address
        )
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    /*****************************************************************************************************************
     * function : patrolListImage
     * return patrol imge url path  by accesstoken and patrol_id and image_name
     *****************************************************************************************************************/
    makePatrolListImagePath(token_id, config_id, image_name) {

        var url_address = 'http://192.168.3.14:3000/api/OrganizationPatrolConfigs/' +
            config_id + '/img/' + image_name +
            '?access_token=' + token_id;
        return url_address;
    }
    private extractData(res: Response) {
        let body = res.json();

        return Promise.resolve(body || {})
    }
    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Promise.reject(errMsg)
    }
}
