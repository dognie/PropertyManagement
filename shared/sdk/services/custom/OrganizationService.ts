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
import { OrganizationService } from '../../models/OrganizationService';
import { Service } from '../../models/Service';
import { Organization } from '../../models/Organization';


/**
 * Api services for the `OrganizationService` model.
 *
 * **Details**
 *
 * 组织机构的功能服务
 */
@Injectable()
export class OrganizationServiceApi extends BaseLoopBackApi {

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
   * Fetches belongsTo relation service.
   *
   * @param any id PersistedModel id
   *
   * @param boolean refresh 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `OrganizationService` object.)
   * </em>
   */
  public getService(id: any, refresh: any = {}): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/OrganizationServices/:id/service";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    if (refresh) _urlParams.refresh = refresh;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * Fetches belongsTo relation organization.
   *
   * @param any id PersistedModel id
   *
   * @param boolean refresh 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `OrganizationService` object.)
   * </em>
   */
  public getOrganization(id: any, refresh: any = {}): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/OrganizationServices/:id/organization";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    if (refresh) _urlParams.refresh = refresh;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * 上传图片
   *
   * @param object data Request data.
   *
   *  - `req` – `{object}` - 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `OrganizationService` object.)
   * </em>
   */
  public uploadOrganizationServiceicon(req: any = {}): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/OrganizationServices/uploadicon";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (req) _urlParams.req = req;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * 更新图片
   *
   * @param any id PersistedModel id
   *
   * @param string pictureName 
   *
   * @param object data Request data.
   *
   *  - `req` – `{object}` - 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `OrganizationService` object.)
   * </em>
   */
  public updateOrganizationServiceicon(id: any, req: any = {}, pictureName: any = {}): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/OrganizationServices/:id/icon/:pictureName";
    let _routeParams: any = {
      id: id,
      pictureName: pictureName
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    if (req) _urlParams.req = req;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * 获取图片
   *
   * @param any id PersistedModel id
   *
   * @param object req 
   *
   * @param object res 
   *
   * @param string pictureName 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `OrganizationService` object.)
   * </em>
   */
  public downloadOrganizationServiceicon(id: any, req: any = {}, res: any = {}, pictureName: any): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/OrganizationServices/:id/icon/:pictureName";
    let _routeParams: any = {
      id: id,
      pictureName: pictureName
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    if (req) _urlParams.req = req;
    if (res) _urlParams.res = res;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * 删除图片如果 pictureName为空则删除所有图片 
   *
   * @param any id PersistedModel id
   *
   * @param string pictureName 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `OrganizationService` object.)
   * </em>
   */
  public removeOrganizationServiceicon(id: any, pictureName: any = {}): Observable<any> {
    let _method: string = "DELETE";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/OrganizationServices/:id/icon/:pictureName";
    let _routeParams: any = {
      id: id,
      pictureName: pictureName
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `OrganizationService`.
   */
  public getModelName() {
    return "OrganizationService";
  }
}
