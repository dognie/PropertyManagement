/* tslint:disable */
import {
  Service,
  Organization
} from '../index';

declare var Object: any;
export interface OrganizationServiceInterface {
  name: string;
  title?: string;
  description?: string;
  settings?: any;
  id: string;
  serviceId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  creatorId?: string;
  creatorName?: string;
  updatorId?: string;
  updatorName?: string;
  organizationId?: string;
  visibility?: number;
  icon?: string;
  service?: Service;
  organization?: Organization;
}

export class OrganizationService implements OrganizationServiceInterface {
  name: string;
  title: string;
  description: string;
  settings: any;
  id: string;
  serviceId: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  creatorName: string;
  updatorId: string;
  updatorName: string;
  organizationId: string;
  visibility: number;
  icon: string;
  service: Service;
  organization: Organization;
  constructor(data?: OrganizationServiceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OrganizationService`.
   */
  public static getModelName() {
    return "OrganizationService";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OrganizationService for dynamic purposes.
  **/
  public static factory(data: OrganizationServiceInterface): OrganizationService{
    return new OrganizationService(data);
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
      name: 'OrganizationService',
      plural: 'OrganizationServices',
      properties: {
        name: {
          name: 'name',
          type: 'string'
        },
        title: {
          name: 'title',
          type: 'string'
        },
        description: {
          name: 'description',
          type: 'string'
        },
        settings: {
          name: 'settings',
          type: 'any'
        },
        id: {
          name: 'id',
          type: 'string'
        },
        serviceId: {
          name: 'serviceId',
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
        organizationId: {
          name: 'organizationId',
          type: 'string'
        },
        visibility: {
          name: 'visibility',
          type: 'number',
          default: 0
        },
        icon: {
          name: 'icon',
          type: 'string'
        },
      },
      relations: {
        service: {
          name: 'service',
          type: 'Service',
          model: 'Service'
        },
        organization: {
          name: 'organization',
          type: 'Organization',
          model: 'Organization'
        },
      }
    }
  }
}
