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
import { OrganizationWorkOrder } from '../../models/OrganizationWorkOrder';
import { Organization } from '../../models/Organization';


/**
 * Api services for the `OrganizationWorkOrder` model.
 *
 * **Details**
 *
 * 工单表
 */
@Injectable()
export class OrganizationWorkOrderApi extends BaseLoopBackApi {

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
   * This usually means the response is a `OrganizationWorkOrder` object.)
   * </em>
   */
  public getOrganization(id: any, refresh: any = {}): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/OrganizationWorkOrders/:id/organization";
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
   * 返回当前工作流状态和下个可能的步骤
   *
   * @param string id 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `OrganizationWorkOrder` object.)
   * </em>
   */
  public getWorkFlowStatus(id: any = {}): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/OrganizationWorkOrders/:id/getWorkFlowStatus";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * 设置当前工作流状态,可设置值[已受理,已分配,已调度,执行中,已完成,已关闭]
   *
   * @param string id 
   *
   * @param object data Request data.
   *
   *  - `status` – `{string}` - 
   *
   *  - `userid` – `{string}` - 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `OrganizationWorkOrder` object.)
   * </em>
   */
  public setWorkFlowStatus(id: any = {}, status: any = {}, userid: any = {}): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/OrganizationWorkOrders/:id/setWorkFlowStatus";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    if (status) _urlParams.status = status;
    if (userid) _urlParams.userid = userid;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * 设置工单调度者 
   *
   * @param string id 
   *
   * @param object data Request data.
   *
   *  - `schedulerId` – `{string}` - 
   *
   *  - `status` – `{string}` - 
   *
   *  - `departmentId` – `{string}` - 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `OrganizationWorkOrder` object.)
   * </em>
   */
  public setSchedulerId(id: any = {}, schedulerId: any = {}, status: any = {}, departmentId: any = {}): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/OrganizationWorkOrders/:id/setSchedulerId";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    if (schedulerId) _urlParams.schedulerId = schedulerId;
    if (status) _urlParams.status = status;
    if (departmentId) _urlParams.departmentId = departmentId;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * 关联报事 
   *
   * @param string id 
   *
   * @param object data Request data.
   *
   *  - `repairId` – `{string}` - 
   *
   *  - `isNew` – `{boolean}` - 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `OrganizationWorkOrder` object.)
   * </em>
   */
  public setAssociationRepair(id: any = {}, repairId: any = {}, isNew: any = {}): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/OrganizationWorkOrders/:id/setAssociationRepair";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    if (repairId) _urlParams.repairId = repairId;
    if (isNew) _urlParams.isNew = isNew;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  /**
   * 设置工单执行者 
   *
   * @param string id 
   *
   * @param object data Request data.
   *
   *  - `executorId` – `{string}` - 
   *
   *  - `status` – `{string}` - 
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `OrganizationWorkOrder` object.)
   * </em>
   */
  public setExecutorId(id: any = {}, executorId: any = {}, status: any = {}): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/OrganizationWorkOrders/:id/setExecutorId";
    let _routeParams: any = {
      id: id
    };
    let _postBody: any = {};
    let _urlParams: any = {};
    if (executorId) _urlParams.executorId = executorId;
    if (status) _urlParams.status = status;
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
   * This usually means the response is a `OrganizationWorkOrder` object.)
   * </em>
   */
  public uploadOrganizationWorkOrderimgs(req: any = {}): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/OrganizationWorkOrders/uploadimgs";
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
   * This usually means the response is a `OrganizationWorkOrder` object.)
   * </em>
   */
  public updateOrganizationWorkOrderimgs(id: any, req: any = {}, pictureName: any = {}): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/OrganizationWorkOrders/:id/imgs/:pictureName";
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
   * This usually means the response is a `OrganizationWorkOrder` object.)
   * </em>
   */
  public downloadOrganizationWorkOrderimgs(id: any, req: any = {}, res: any = {}, pictureName: any): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/OrganizationWorkOrders/:id/imgs/:pictureName";
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
   * This usually means the response is a `OrganizationWorkOrder` object.)
   * </em>
   */
  public removeOrganizationWorkOrderimgs(id: any, pictureName: any = {}): Observable<any> {
    let _method: string = "DELETE";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/OrganizationWorkOrders/:id/imgs/:pictureName";
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
   * i.e. `OrganizationWorkOrder`.
   */
  public getModelName() {
    return "OrganizationWorkOrder";
  }
}
