import { BaseService } from '../lib/base.service';

export class UserService extends BaseService {
  constructor() {
    super('users');
  }

  // Add any user-specific methods here
  async findByPhoneNumber(phone_number: string) {
    return this.findByProperty('phone_number', phone_number);
  }
}