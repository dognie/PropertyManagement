import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginProvider {
    data: any = null;
    result: any = null;
    accessToken: any = null;
    constructor(public http: Http) {
        this.http = http;
        this.accessToken = null;
    }
    /*****************************************************************************************************************
     * function : login
     * login v3 by username and password ,return access_token
     *****************************************************************************************************************/

    login(aUser) {
        var postdata = JSON.stringify({ username: aUser.userName, password: aUser.passWord });
        return this.http.post('http://192.168.3.14:3000/api/Accounts/login', JSON.parse(postdata))
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    /*****************************************************************************************************************
     * function : logout
     * logout v3 by access_token ,return status
     *****************************************************************************************************************/
    logout(aUser) {
        var postdata = JSON.stringify({ access_token: this.accessToken });
        return this.http.post('http://192.168.3.14:3000/api/Accounts/logout', JSON.parse(postdata))
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);

    }
    setUrlAccessToken(tokenId) {
        this.accessToken = tokenId;
        console.log("LoginProvider-setUrlAccessToken:", this.accessToken)
        return this.accessToken;
    }
    getUrlAccessToken() {

        console.log("LoginProvider-getUrlAccessToken:", this.accessToken)
        return this.accessToken;
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
