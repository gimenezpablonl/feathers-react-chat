import { Params } from '@feathersjs/feathers';
import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';

// A type interface for our user (it does not validate any data)
interface UserData {
  _id?: string;
  email: string;
  password: string;
}

export class Users extends Service<UserData> {
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }
}
