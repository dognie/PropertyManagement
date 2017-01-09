/* tslint:disable */
import {
  OrganizationAccount
} from '../index';

declare var Object: any;
export interface AccountInterface {
  id?: string;
  mobile?: string;
  mobileVerified?: boolean;
  name?: string;
  username?: string;
  email?: string;
  isAdmin?: boolean;
  realm?: string;
  password: string;
  challenges?: any;
  emailVerified?: boolean;
  verificationToken?: string;
  status?: string;
  picture?: string;
  defaultOrganizationId?: number;
  roles?: Array<string>;
  _perms?: Array<string>;
  accessTokens?: Array<any>;
  defaultOrganization?: OrganizationAccount;
  organizations?: Array<OrganizationAccount>;
}

export class Account implements AccountInterface {
  id: string;
  mobile: string;
  mobileVerified: boolean;
  name: string;
  username: string;
  email: string;
  isAdmin: boolean;
  realm: string;
  password: string;
  challenges: any;
  emailVerified: boolean;
  verificationToken: string;
  status: string;
  picture: string;
  defaultOrganizationId: number;
  roles: Array<string>;
  _perms: Array<string>;
  accessTokens: Array<any>;
  defaultOrganization: OrganizationAccount;
  organizations: Array<OrganizationAccount>;
  constructor(data?: AccountInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Account`.
   */
  public static getModelName() {
    return "Account";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Account for dynamic purposes.
  **/
  public static factory(data: AccountInterface): Account{
    return new Account(data);
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
      name: 'Account',
      plural: 'Accounts',
      properties: {
        id: {
          name: 'id',
          type: 'string'
        },
        mobile: {
          name: 'mobile',
          type: 'string'
        },
        mobileVerified: {
          name: 'mobileVerified',
          type: 'boolean'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        username: {
          name: 'username',
          type: 'string'
        },
        email: {
          name: 'email',
          type: 'string'
        },
        isAdmin: {
          name: 'isAdmin',
          type: 'boolean'
        },
        realm: {
          name: 'realm',
          type: 'string'
        },
        password: {
          name: 'password',
          type: 'string'
        },
        credentials: {
          name: 'credentials',
          type: 'any'
        },
        challenges: {
          name: 'challenges',
          type: 'any'
        },
        emailVerified: {
          name: 'emailVerified',
          type: 'boolean'
        },
        verificationToken: {
          name: 'verificationToken',
          type: 'string'
        },
        status: {
          name: 'status',
          type: 'string'
        },
        picture: {
          name: 'picture',
          type: 'string'
        },
        defaultOrganizationId: {
          name: 'defaultOrganizationId',
          type: 'number'
        },
        roles: {
          name: 'roles',
          type: 'Array&lt;string&gt;'
        },
        _perms: {
          name: '_perms',
          type: 'Array&lt;string&gt;'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'Array<any>',
          model: ''
        },
        defaultOrganization: {
          name: 'defaultOrganization',
          type: 'OrganizationAccount',
          model: 'OrganizationAccount'
        },
        organizations: {
          name: 'organizations',
          type: 'Array<OrganizationAccount>',
          model: 'OrganizationAccount'
        },
      }
    }
  }
}
