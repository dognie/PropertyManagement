/* tslint:disable */
import {
  Organization
} from '../index';

declare var Object: any;
export interface OrganizationPatrolConfigInterface {
  id?: string;
  type?: string;
  content: string;
  qrBackCorlor?: string;
  qrTextColor?: string;
  qrSize?: string;
  organizationId?: string;
  img?: string;
  createdAt?: Date;
  updatedAt?: Date;
  creatorId?: string;
  creatorName?: string;
  updatorId?: string;
  updatorName?: string;
  organization?: Organization;
}

export class OrganizationPatrolConfig implements OrganizationPatrolConfigInterface {
  id: string;
  type: string;
  content: string;
  qrBackCorlor: string;
  qrTextColor: string;
  qrSize: string;
  organizationId: string;
  img: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  creatorName: string;
  updatorId: string;
  updatorName: string;
  organization: Organization;
  constructor(data?: OrganizationPatrolConfigInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OrganizationPatrolConfig`.
   */
  public static getModelName() {
    return "OrganizationPatrolConfig";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OrganizationPatrolConfig for dynamic purposes.
  **/
  public static factory(data: OrganizationPatrolConfigInterface): OrganizationPatrolConfig{
    return new OrganizationPatrolConfig(data);
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
      name: 'OrganizationPatrolConfig',
      plural: 'OrganizationPatrolConfigs',
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
        qrBackCorlor: {
          name: 'qrBackCorlor',
          type: 'string'
        },
        qrTextColor: {
          name: 'qrTextColor',
          type: 'string'
        },
        qrSize: {
          name: 'qrSize',
          type: 'string'
        },
        organizationId: {
          name: 'organizationId',
          type: 'string'
        },
        img: {
          name: 'img',
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
