/* tslint:disable */
import {
  Organization
} from '../index';

declare var Object: any;
export interface OrganizationWorkOrderInterface {
  id: string;
  type?: string;
  houseNo?: string;
  progression?: string;
  phone?: string;
  content?: string;
  assigneeId?: string;
  schedulerId?: string;
  executorId?: string;
  curDealUserId?: string;
  repairsAddress?: string;
  departmentId?: string;
  userName?: string;
  schedulerName?: string;
  executorName?: string;
  firstRepairId?: string;
  status?: string;
  organizationId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  creatorId?: string;
  creatorName?: string;
  updatorId?: string;
  updatorName?: string;
  imgs?: string;
  organization?: Organization;
}

export class OrganizationWorkOrder implements OrganizationWorkOrderInterface {
  id: string;
  type: string;
  houseNo: string;
  progression: string;
  phone: string;
  content: string;
  assigneeId: string;
  schedulerId: string;
  executorId: string;
  curDealUserId: string;
  repairsAddress: string;
  departmentId: string;
  userName: string;
  schedulerName: string;
  executorName: string;
  firstRepairId: string;
  status: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  creatorName: string;
  updatorId: string;
  updatorName: string;
  imgs: string;
  organization: Organization;
  constructor(data?: OrganizationWorkOrderInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OrganizationWorkOrder`.
   */
  public static getModelName() {
    return "OrganizationWorkOrder";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OrganizationWorkOrder for dynamic purposes.
  **/
  public static factory(data: OrganizationWorkOrderInterface): OrganizationWorkOrder{
    return new OrganizationWorkOrder(data);
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
      name: 'OrganizationWorkOrder',
      plural: 'OrganizationWorkOrders',
      properties: {
        id: {
          name: 'id',
          type: 'string'
        },
        type: {
          name: 'type',
          type: 'string'
        },
        houseNo: {
          name: 'houseNo',
          type: 'string'
        },
        progression: {
          name: 'progression',
          type: 'string'
        },
        phone: {
          name: 'phone',
          type: 'string'
        },
        content: {
          name: 'content',
          type: 'string'
        },
        assigneeId: {
          name: 'assigneeId',
          type: 'string'
        },
        schedulerId: {
          name: 'schedulerId',
          type: 'string'
        },
        executorId: {
          name: 'executorId',
          type: 'string'
        },
        curDealUserId: {
          name: 'curDealUserId',
          type: 'string'
        },
        repairsAddress: {
          name: 'repairsAddress',
          type: 'string'
        },
        departmentId: {
          name: 'departmentId',
          type: 'string'
        },
        userName: {
          name: 'userName',
          type: 'string'
        },
        schedulerName: {
          name: 'schedulerName',
          type: 'string'
        },
        executorName: {
          name: 'executorName',
          type: 'string'
        },
        firstRepairId: {
          name: 'firstRepairId',
          type: 'string'
        },
        status: {
          name: 'status',
          type: 'string'
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
      },
      relations: {
        organization: {
          name: 'organization',
          type: 'Organization',
          model: 'Organization'
        },
      }
    }
  }
}
