/* tslint:disable */
import {
  Organization,
  OrganizationPatrolConfig
} from '../index';

declare var Object: any;
export interface OrganizationPatrolInterface {
  id?: string;
  type?: string;
  content?: string;
  organizationId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  creatorId?: string;
  creatorName?: string;
  updatorId?: string;
  updatorName?: string;
  organizationPatrolConfigId?: string;
  organization?: Organization;
  organizationPatrolConfig?: OrganizationPatrolConfig;
}

export class OrganizationPatrol implements OrganizationPatrolInterface {
  id: string;
  type: string;
  content: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  creatorName: string;
  updatorId: string;
  updatorName: string;
  organizationPatrolConfigId: string;
  organization: Organization;
  organizationPatrolConfig: OrganizationPatrolConfig;
  constructor(data?: OrganizationPatrolInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OrganizationPatrol`.
   */
  public static getModelName() {
    return "OrganizationPatrol";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OrganizationPatrol for dynamic purposes.
  **/
  public static factory(data: OrganizationPatrolInterface): OrganizationPatrol{
    return new OrganizationPatrol(data);
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
      name: 'OrganizationPatrol',
      plural: 'OrganizationPatrols',
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
        organizationPatrolConfigId: {
          name: 'organizationPatrolConfigId',
          type: 'string'
        },
      },
      relations: {
        organization: {
          name: 'organization',
          type: 'Organization',
          model: 'Organization'
        },
        organizationPatrolConfig: {
          name: 'organizationPatrolConfig',
          type: 'OrganizationPatrolConfig',
          model: 'OrganizationPatrolConfig'
        },
      }
    }
  }
}
