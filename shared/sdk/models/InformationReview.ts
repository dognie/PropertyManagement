/* tslint:disable */
import {
  OrganizationInformation
} from '../index';

declare var Object: any;
export interface InformationReviewInterface {
  id?: string;
  title?: string;
  visibility?: number;
  isDraft?: boolean;
  context?: string;
  informationId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  creatorId?: string;
  creatorName?: string;
  updatorId?: string;
  updatorName?: string;
  information?: OrganizationInformation;
}

export class InformationReview implements InformationReviewInterface {
  id: string;
  title: string;
  visibility: number;
  isDraft: boolean;
  context: string;
  informationId: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  creatorName: string;
  updatorId: string;
  updatorName: string;
  information: OrganizationInformation;
  constructor(data?: InformationReviewInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `InformationReview`.
   */
  public static getModelName() {
    return "InformationReview";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of InformationReview for dynamic purposes.
  **/
  public static factory(data: InformationReviewInterface): InformationReview{
    return new InformationReview(data);
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
      name: 'InformationReview',
      plural: 'InformationReviews',
      properties: {
        id: {
          name: 'id',
          type: 'string'
        },
        title: {
          name: 'title',
          type: 'string'
        },
        visibility: {
          name: 'visibility',
          type: 'number'
        },
        isDraft: {
          name: 'isDraft',
          type: 'boolean'
        },
        context: {
          name: 'context',
          type: 'string'
        },
        informationId: {
          name: 'informationId',
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
        information: {
          name: 'information',
          type: 'OrganizationInformation',
          model: 'OrganizationInformation'
        },
      }
    }
  }
}
