/* tslint:disable */

declare var Object: any;
export interface OrganizationInterface {
  id: string;
  name: string;
  parentId?: string;
  description?: string;
  isInherited?: boolean;
  visibility?: number;
  icon?: string;
}

export class Organization implements OrganizationInterface {
  id: string;
  name: string;
  parentId: string;
  description: string;
  isInherited: boolean;
  visibility: number;
  icon: string;
  constructor(data?: OrganizationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Organization`.
   */
  public static getModelName() {
    return "Organization";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Organization for dynamic purposes.
  **/
  public static factory(data: OrganizationInterface): Organization{
    return new Organization(data);
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
      name: 'Organization',
      plural: 'Organizations',
      properties: {
        id: {
          name: 'id',
          type: 'string'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        parentId: {
          name: 'parentId',
          type: 'string'
        },
        description: {
          name: 'description',
          type: 'string'
        },
        isInherited: {
          name: 'isInherited',
          type: 'boolean',
          default: true
        },
        visibility: {
          name: 'visibility',
          type: 'number',
          default: 1
        },
        icon: {
          name: 'icon',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
