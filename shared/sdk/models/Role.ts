/* tslint:disable */

declare var Object: any;
export interface RoleInterface {
  id?: string;
  name: string;
  description?: string;
  created?: Date;
  modified?: Date;
  title?: string;
  principals?: Array<any>;
}

export class Role implements RoleInterface {
  id: string;
  name: string;
  description: string;
  created: Date;
  modified: Date;
  title: string;
  principals: Array<any>;
  constructor(data?: RoleInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Role`.
   */
  public static getModelName() {
    return "Role";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Role for dynamic purposes.
  **/
  public static factory(data: RoleInterface): Role{
    return new Role(data);
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
      name: 'Role',
      plural: 'Roles',
      properties: {
        id: {
          name: 'id',
          type: 'string'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        description: {
          name: 'description',
          type: 'string'
        },
        created: {
          name: 'created',
          type: 'Date'
        },
        modified: {
          name: 'modified',
          type: 'Date'
        },
        title: {
          name: 'title',
          type: 'string'
        },
      },
      relations: {
        principals: {
          name: 'principals',
          type: 'Array<any>',
          model: ''
        },
      }
    }
  }
}
