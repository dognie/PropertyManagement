import { JSONSearchParams } from './services/core/search.params';
import { ErrorHandler } from './services/core/error.service';
import { LoopBackAuth } from './services/core/auth.service';
import { LoggerService } from './services/custom/logger.service';
import { SDKModels } from './services/custom/SDKModels';
import { InternalStorage } from './storage/internal.storage';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CookieBrowser } from './storage/cookie.browser';
import { RoleApi } from './services/custom/Role';
import { AccountApi } from './services/custom/Account';
import { OrganizationApi } from './services/custom/Organization';
import { ServiceApi } from './services/custom/Service';
import { OrganizationServiceApi } from './services/custom/OrganizationService';
import { OrganizationAccountApi } from './services/custom/OrganizationAccount';
import { OrganizationRoleApi } from './services/custom/OrganizationRole';
import { OrganizationInformationApi } from './services/custom/OrganizationInformation';
import { InformationReviewApi } from './services/custom/InformationReview';
import { OrganizationRepairApi } from './services/custom/OrganizationRepair';
import { OrganizationWorkOrderApi } from './services/custom/OrganizationWorkOrder';
import { OrganizationRankApi } from './services/custom/OrganizationRank';
import { OrganizationReplyApi } from './services/custom/OrganizationReply';
import { OrganizationPatrolApi } from './services/custom/OrganizationPatrol';
import { OrganizationPatrolConfigApi } from './services/custom/OrganizationPatrolConfig';
import { StorageApi } from './services/custom/Storage';
/**
* @module SDKBrowserModule
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
@NgModule({
  imports:      [ CommonModule, HttpModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [
    ErrorHandler
  ]
})
export class SDKBrowserModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule  : SDKBrowserModule,
      providers : [
        LoopBackAuth,
        LoggerService,
        JSONSearchParams,
        SDKModels,
        RoleApi,
        AccountApi,
        OrganizationApi,
        ServiceApi,
        OrganizationServiceApi,
        OrganizationAccountApi,
        OrganizationRoleApi,
        OrganizationInformationApi,
        InformationReviewApi,
        OrganizationRepairApi,
        OrganizationWorkOrderApi,
        OrganizationRankApi,
        OrganizationReplyApi,
        OrganizationPatrolApi,
        OrganizationPatrolConfigApi,
        StorageApi,
        { provide: InternalStorage, useClass: CookieBrowser }
      ]
    };
  }
}
/**
* Have Fun!!!
* - Jon
**/
export * from './models/index';
export * from './services/index';
export * from './lb.config';

