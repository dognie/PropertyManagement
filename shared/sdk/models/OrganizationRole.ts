/* tslint:disable */
import {
  Organization
} from '../index';

declare var Object: any;
export interface OrganizationRoleInterface {
  title?: string;
  description?: string;
  name: string;
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  creatorId?: string;
  creatorName?: string;
  updatorId?: string;
  updatorName?: string;
  organizationId?: string;
  visibility?: number;
  roles?: Array<string>;
  _perms?: Array<string>;
  _roleRefs?: any;
  organization?: Organization;
}

export class OrganizationRole implements OrganizationRoleInterface {
  title: string;
  description: string;
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  creatorName: string;
  updatorId: string;
  updatorName: string;
  organizationId: string;
  visibility: number;
  roles: Array<string>;
  _perms: Array<string>;
  _roleRefs: any;
  organization: Organization;
  constructor(data?: OrganizationRoleInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OrganizationRole`.
   */
  public static getModelName() {
    return "OrganizationRole";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OrganizationRole for dynamic purposes.
  **/
  public static factory(data: OrganizationRoleInterface): OrganizationRole{
    return new OrganizationRole(data);
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
      name: 'OrganizationRole',
      plural: 'OrganizationRoles',
      properties: {
        title: {
          name: 'title',
          type: 'string'
        },
        description: {
          name: 'description',
          type: 'string'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        id: {
          name: 'id',
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
        roles: {
          name: 'roles',
          type: 'Array&lt;string&gt;'
        },
        _perms: {
          name: '_perms',
          type: 'Array&lt;string&gt;'
        },
        _roleRefs: {
          name: '_roleRefs',
          type: 'any'
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
