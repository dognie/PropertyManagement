/* tslint:disable */

declare var Object: any;
export interface ServiceInterface {
  id: string;
  title?: string;
  settings?: any;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  creatorId?: string;
  creatorName?: string;
  updatorId?: string;
  updatorName?: string;
  enabled?: boolean;
  icon?: string;
}

export class Service implements ServiceInterface {
  id: string;
  title: string;
  settings: any;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  creatorName: string;
  updatorId: string;
  updatorName: string;
  enabled: boolean;
  icon: string;
  constructor(data?: ServiceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Service`.
   */
  public static getModelName() {
    return "Service";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Service for dynamic purposes.
  **/
  public static factory(data: ServiceInterface): Service{
    return new Service(data);
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
      name: 'Service',
      plural: 'Services',
      properties: {
        id: {
          name: 'id',
          type: 'string'
        },
        title: {
          name: 'title',
          type: 'string'
        },
        settings: {
          name: 'settings',
          type: 'any'
        },
        description: {
          name: 'description',
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
        enabled: {
          name: 'enabled',
          type: 'boolean',
          default: true
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
