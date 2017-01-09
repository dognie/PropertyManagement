/* tslint:disable */

declare var Object: any;
export interface OrganizationReplyInterface {
  id?: string;
  whatModel: string;
  whatId: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDraft?: boolean;
  creatorId?: string;
  creatorName?: string;
  updatorId?: string;
  updatorName?: string;
}

export class OrganizationReply implements OrganizationReplyInterface {
  id: string;
  whatModel: string;
  whatId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isDraft: boolean;
  creatorId: string;
  creatorName: string;
  updatorId: string;
  updatorName: string;
  constructor(data?: OrganizationReplyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OrganizationReply`.
   */
  public static getModelName() {
    return "OrganizationReply";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OrganizationReply for dynamic purposes.
  **/
  public static factory(data: OrganizationReplyInterface): OrganizationReply{
    return new OrganizationReply(data);
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
      name: 'OrganizationReply',
      plural: 'OrganizationReplies',
      properties: {
        id: {
          name: 'id',
          type: 'string'
        },
        whatModel: {
          name: 'whatModel',
          type: 'string'
        },
        whatId: {
          name: 'whatId',
          type: 'string'
        },
        content: {
          name: 'content',
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
        isDraft: {
          name: 'isDraft',
          type: 'boolean',
          default: false
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
      }
    }
  }
}
