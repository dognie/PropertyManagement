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
import { Organization } from '../../models/Organization';


/**
 * Api services for the `Organization` model.
 *
 * **Details**
 *
 * 组织机构
 */
@Injectable()
export class OrganizationApi extends BaseLoopBackApi {

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
   * 获取直接子组织列表
   *
   * @param string id 
   *
   * @param object filter 
   *
   * @param boolean isInherited 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Organization` object.)
   * </em>
   */
  public children(id: any, filter: LoopBackFilter = {}, isInherited: any = {}): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Organizations/:id/children";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    if (filter) _urlParams.filter = filter;
    if (isInherited) _urlParams.isInherited = isInherited;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * 获取组织的父Id
   *
   * @param string id 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Organization` object.)
   * </em>
   */
  public parentId(id: any = {}): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Organizations/:id/parentId";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * 返回特殊组织的所有父特殊组织列表内容
   *
   * @param string id 
   *
   * @param object filter 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Organization` object.)
   * </em>
   */
  public parentItems(id: any = {}, filter: LoopBackFilter = {}): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Organizations/:id/parentItems";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    if (filter) _urlParams.filter = filter;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * 返回 isInherited 的值
   *
   * @param string id 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Organization` object.)
   * </em>
   */
  public getIsInherited(id: any = {}): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Organizations/:id/isInherited";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * 设置 isInherited
   *
   * @param string id 
   *
   * @param object data Request data.
   *
   *  - `isInherited` – `{boolean}` - 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Organization` object.)
   * </em>
   */
  public setIsInherited(id: any = {}, isInherited: any = {}): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Organizations/:id/isInherited";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    if (isInherited) _urlParams.isInherited = isInherited;
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
   * This usually means the response is a `Organization` object.)
   * </em>
   */
  public uploadOrganizationicon(req: any = {}): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Organizations/uploadicon";
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
   * This usually means the response is a `Organization` object.)
   * </em>
   */
  public updateOrganizationicon(id: any, req: any = {}, pictureName: any = {}): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Organizations/:id/icon/:pictureName";
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
   * This usually means the response is a `Organization` object.)
   * </em>
   */
  public downloadOrganizationicon(id: any, req: any = {}, res: any = {}, pictureName: any): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Organizations/:id/icon/:pictureName";
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
   * This usually means the response is a `Organization` object.)
   * </em>
   */
  public removeOrganizationicon(id: any, pictureName: any = {}): Observable<any> {
    let _method: string = "DELETE";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Organizations/:id/icon/:pictureName";
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
   * i.e. `Organization`.
   */
  public getModelName() {
    return "Organization";
  }
}
