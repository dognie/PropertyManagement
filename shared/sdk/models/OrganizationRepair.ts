/* tslint:disable */
import {
  Organization,
  OrganizationWorkOrder
} from '../index';

declare var Object: any;
export interface OrganizationRepairInterface {
  id: string;
  type?: string;
  content?: string;
  phone?: string;
  imgsDesc?: string;
  dealUserName?: string;
  dealUserPhone?: string;
  repairsAddress?: string;
  status?: string;
  isRankExist?: boolean;
  organizationId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  creatorId?: string;
  creatorName?: string;
  updatorId?: string;
  updatorName?: string;
  imgs?: string;
  organizationworkorderId?: string;
  organization?: Organization;
  organizationworkorder?: OrganizationWorkOrder;
}

export class OrganizationRepair implements OrganizationRepairInterface {
  id: string;
  type: string;
  content: string;
  phone: string;
  imgsDesc: string;
  dealUserName: string;
  dealUserPhone: string;
  repairsAddress: string;
  status: string;
  isRankExist: boolean;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  creatorName: string;
  updatorId: string;
  updatorName: string;
  imgs: string;
  organizationworkorderId: string;
  organization: Organization;
  organizationworkorder: OrganizationWorkOrder;
  constructor(data?: OrganizationRepairInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OrganizationRepair`.
   */
  public static getModelName() {
    return "OrganizationRepair";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OrganizationRepair for dynamic purposes.
  **/
  public static factory(data: OrganizationRepairInterface): OrganizationRepair{
    return new OrganizationRepair(data);
  }  
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'OrganizationRepair',
      plural: 'OrganizationRepairs',
      properties: {
        id: {
          name: 'id',
          type: 'string'
        },
        type: {
          name: 'type',
          type: 'string'
        },
        content: {
          name: 'content',
          type: 'string'
        },
        phone: {
          name: 'phone',
          type: 'string'
        },
        imgsDesc: {
          name: 'imgsDesc',
          type: 'string'
        },
        dealUserName: {
          name: 'dealUserName',
          type: 'string'
        },
        dealUserPhone: {
          name: 'dealUserPhone',
          type: 'string'
        },
        repairsAddress: {
          name: 'repairsAddress',
          type: 'string'
        },
        status: {
          name: 'status',
          type: 'string'
        },
        isRankExist: {
          name: 'isRankExist',
          type: 'boolean',
          default: false
        },
        organizationId: {
          name: 'organizationId',
          type: 'string'
        },
        createdAt: {
          name: 'createdAt',
          type: 'Date',
          default: new Date(0)
        },
        updatedAt: {
          name: 'updatedAt',
          type: 'Date',
          default: new Date(0)
        },
        creatorId: {
          name: 'creatorId',
          type: 'string'
        },
        creatorName: {
          name: 'creatorName',
          type: 'string'
        },
        updatorId: {
          name: 'updatorId',
          type: 'string'
        },
        updatorName: {
          name: 'updatorName',
          type: 'string'
        },
        imgs: {
          name: 'imgs',
          type: 'string'
        },
        organizationworkorderId: {
          name: 'organizationworkorderId',
          type: 'string'
        },
      },
      relations: {
        organization: {
          name: 'organization',
          type: 'Organization',
          model: 'Organization'
        },
        organizationworkorder: {
          name: 'organizationworkorder',
          type: 'OrganizationWorkOrder',
          model: 'OrganizationWorkOrder'
        },
      }
    }
  }
}
