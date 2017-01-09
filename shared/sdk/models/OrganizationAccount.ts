/* tslint:disable */
import {
  Account,
  Organization
} from '../index';

declare var Object: any;
export interface OrganizationAccountInterface {
  visible?: number;
  id?: number;
  accountId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  creatorId?: string;
  creatorName?: string;
  updatorId?: string;
  updatorName?: string;
  organizationId?: string;
  visibility?: number;
  account?: Account;
  organization?: Organization;
}

export class OrganizationAccount implements OrganizationAccountInterface {
  visible: number;
  id: number;
  accountId: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  creatorName: string;
  updatorId: string;
  updatorName: string;
  organizationId: string;
  visibility: number;
  account: Account;
  organization: Organization;
  constructor(data?: OrganizationAccountInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OrganizationAccount`.
   */
  public static getModelName() {
    return "OrganizationAccount";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OrganizationAccount for dynamic purposes.
  **/
  public static factory(data: OrganizationAccountInterface): OrganizationAccount{
    return new OrganizationAccount(data);
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
      name: 'OrganizationAccount',
      plural: 'OrganizationAccounts',
      properties: {
        visible: {
          name: 'visible',
          type: 'number',
          default: 1
        },
        id: {
          name: 'id',
          type: 'number'
        },
        accountId: {
          name: 'accountId',
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
      },
      relations: {
        account: {
          name: 'account',
          type: 'Account',
          model: 'Account'
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
