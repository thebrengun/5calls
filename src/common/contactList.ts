import { Contact } from './model';

export class ContactList {
  public house: Contact[];
  public senate: Contact[];
  public governor?: Contact;
  public stateUpper?: Contact;
  public stateLower?: Contact;

  constructor() {
    this.house = [];
    this.senate = [];
  }
}