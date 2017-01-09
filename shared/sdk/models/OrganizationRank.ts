/* tslint:disable */

declare var Object: any;
export interface OrganizationRankInterface {
  id: string;
  ranking?: number;
  description?: string;
}

export class OrganizationRank implements OrganizationRankInterface {
  id: string;
  ranking: number;
  description: string;
  constructor(data?: OrganizationRankInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OrganizationRank`.
   */
  public static getModelName() {
    return "OrganizationRank";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OrganizationRank for dynamic purposes.
  **/
  public static factory(data: OrganizationRankInterface): OrganizationRank{
    return new OrganizationRank(data);
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
      name: 'OrganizationRank',
      plural: 'OrganizationRanks',
      properties: {
        id: {
          name: 'id',
          type: 'string'
        },
        ranking: {
          name: 'ranking',
          type: 'number'
        },
        description: {
          name: 'description',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
