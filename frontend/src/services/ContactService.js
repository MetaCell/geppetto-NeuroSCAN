import { ContactApi } from '../rest';

export class ContactService {
  constructor() {
    this.api = new ContactApi();
  }

  async getContactById(id) {
    return this.api.contactsIdGet(id);
  }
}

export default new ContactService();
