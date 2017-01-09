/* tslint:disable */
import { Injectable } from '@angular/core';
import { Role } from '../../models/Role';
import { Account } from '../../models/Account';
import { Organization } from '../../models/Organization';
import { Service } from '../../models/Service';
import { OrganizationService } from '../../models/OrganizationService';
import { OrganizationAccount } from '../../models/OrganizationAccount';
import { OrganizationRole } from '../../models/OrganizationRole';
import { OrganizationInformation } from '../../models/OrganizationInformation';
import { InformationReview } from '../../models/InformationReview';
import { OrganizationRepair } from '../../models/OrganizationRepair';
import { OrganizationWorkOrder } from '../../models/OrganizationWorkOrder';
import { OrganizationRank } from '../../models/OrganizationRank';
import { OrganizationReply } from '../../models/OrganizationReply';
import { OrganizationPatrol } from '../../models/OrganizationPatrol';
import { OrganizationPatrolConfig } from '../../models/OrganizationPatrolConfig';
import { Storage } from '../../models/Storage';

@Injectable()
export class SDKModels {

  private models: { [name: string]: any } = {
    Role: Role,
    Account: Account,
    Organization: Organization,
    Service: Service,
    OrganizationService: OrganizationService,
    OrganizationAccount: OrganizationAccount,
    OrganizationRole: OrganizationRole,
    OrganizationInformation: OrganizationInformation,
    InformationReview: InformationReview,
    OrganizationRepair: OrganizationRepair,
    OrganizationWorkOrder: OrganizationWorkOrder,
    OrganizationRank: OrganizationRank,
    OrganizationReply: OrganizationReply,
    OrganizationPatrol: OrganizationPatrol,
    OrganizationPatrolConfig: OrganizationPatrolConfig,
    Storage: Storage,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }
}
