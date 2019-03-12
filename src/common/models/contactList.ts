import { Contact } from './';

export class ContactList {
  public location: string;
  public representatives: Contact[];

  constructor() {
    this.location = '';
    this.representatives = [];
  }

  public senateReps(): Contact[] {
    return this.representatives.filter(contact => contact.area === 'US Senate');
  }

  public houseReps(): Contact[] {
    const houseReps = this.representatives.filter(
      contact => contact.area === 'US House'
    );
    return houseReps;
  }

  public governor(): Contact[] {
    return this.representatives.filter(contact => contact.area === 'Governor');
  }

  public stateUpper(): Contact[] {
    return this.representatives.filter(
      contact => contact.area === 'StateUpper'
    );
  }

  public stateLower(): Contact[] {
    return this.representatives.filter(
      contact => contact.area === 'StateLower'
    );
  }

  public secState(): Contact[] {
    return this.representatives.filter(
      contact => contact.area === 'SecretaryOfState'
    );
  }
  public attyGeneral(): Contact[] {
    return this.representatives.filter(
      contact => contact.area === 'AttorneyGeneral'
    );
  }
}
