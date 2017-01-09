/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackConfig } from '../../lb.config';
import { LoopBackAuth } from '../core/auth.service';
import { LoopBackFilter,  } from '../../models/BaseModels';
import { JSONSearchParams } from '../core/search.params';
import { ErrorHandler } from '../core/error.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { OrganizationReply } from '../../models/OrganizationReply';


/**
 * Api services for the `OrganizationReply` model.
 *
 * **Details**
 *
 * 回复表
 */
@Injectable()
export class OrganizationReplyApi extends BaseLoopBackApi {

  constructor(
    @Inject(Http) protected http: Http,
    @Inject(SDKModels) protected models: SDKModels,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http,  models, auth, searchParams, errorHandler);
  }

  /**
   * 设置是否为草稿
   *
   * @param any id PersistedModel id
   *
   * @param object data Request data.
   *
   *  - `setDraft` – `{boolean}` - 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `OrganizationReply` object.)
   * </em>
   */
  public setDraft(id: any, setDraft: any): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/OrganizationReplies/:id/setDraft";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    if (setDraft) _urlParams.setDraft = setDraft;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `OrganizationReply`.
   */
  public getModelName() {
    return "OrganizationReply";
  }
}
