import { Contact } from './';

export class ContactList {
  public location: string;
  public house: Contact[];
  public senate: Contact[];
  public governor?: Contact;
  public stateUpper?: Contact;
  public stateLower?: Contact;
  public secState?: Contact;
  public attorneyGeneral?: Contact;

  constructor() {
    this.location = '';
    this.house = [];
    this.senate = [];
  }
}
