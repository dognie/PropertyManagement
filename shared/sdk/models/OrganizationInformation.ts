/* tslint:disable */
import {
  Organization,
  InformationReview
} from '../index';

declare var Object: any;
export interface OrganizationInformationInterface {
  id?: string;
  slug?: string;
  title?: string;
  replyable?: boolean;
  isCat?: boolean;
  isDraft?: boolean;
  contextType?: number;
  context?: string;
  parentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  creatorId?: string;
  creatorName?: string;
  updatorId?: string;
  updatorName?: string;
  organizationId?: string;
  visibility?: number;
  picture?: string;
  parent?: OrganizationInformation;
  organization?: Organization;
  reviews?: Array<InformationReview>;
}

export class OrganizationInformation implements OrganizationInformationInterface {
  id: string;
  slug: string;
  title: string;
  replyable: boolean;
  isCat: boolean;
  isDraft: boolean;
  contextType: number;
  context: string;
  parentId: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  creatorName: string;
  updatorId: string;
  updatorName: string;
  organizationId: string;
  visibility: number;
  picture: string;
  parent: OrganizationInformation;
  organization: Organization;
  reviews: Array<InformationReview>;
  constructor(data?: OrganizationInformationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OrganizationInformation`.
   */
  public static getModelName() {
    return "OrganizationInformation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OrganizationInformation for dynamic purposes.
  **/
  public static factory(data: OrganizationInformationInterface): OrganizationInformation{
    return new OrganizationInformation(data);
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
      name: 'OrganizationInformation',
      plural: 'OrganizationInformations',
      properties: {
        id: {
          name: 'id',
          type: 'string'
        },
        slug: {
          name: 'slug',
          type: 'string'
        },
        title: {
          name: 'title',
          type: 'string'
        },
        replyable: {
          name: 'replyable',
          type: 'boolean'
        },
        isCat: {
          name: 'isCat',
          type: 'boolean'
        },
        isDraft: {
          name: 'isDraft',
          type: 'boolean',
          default: false
        },
        contextType: {
          name: 'contextType',
          type: 'number'
        },
        context: {
          name: 'context',
          type: 'string'
        },
        parentId: {
          name: 'parentId',
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
        picture: {
          name: 'picture',
          type: 'string'
        },
      },
      relations: {
        parent: {
          name: 'parent',
          type: 'OrganizationInformation',
          model: 'OrganizationInformation'
        },
        organization: {
          name: 'organization',
          type: 'Organization',
          model: 'Organization'
        },
        reviews: {
          name: 'reviews',
          type: 'Array<InformationReview>',
          model: 'InformationReview'
        },
      }
    }
  }
}
