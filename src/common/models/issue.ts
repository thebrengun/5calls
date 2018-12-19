import { Outcome, Contact, ContactList } from './';

export class Issue {
  public id: number;
  public name: string;
  public contactType: string;
  public contactAreas: string[];
  public reason: string;
  public script: string;
  public categories: Category[];
  public active: boolean;
  public createdAt: string;
  public slug: string;
  public outcomeModels: Outcome[];
  public link: string;
  public linkTitle: string;
  public stats: IssueStats;

  public slugOrID(): string {
    if (this.slug !== '') {
      return this.slug;
    }

    return this.id.toString();
  }

  public numberOfContacts(contactList: ContactList): number {
    return this.filteredContacts(contactList).length;
  }

  public currentContact(
    contactList: ContactList,
    contactIndex: number
  ): Contact | undefined {
    const contacts = this.filteredContacts(contactList);

    if (contactIndex <= contacts.length) {
      return contacts[contactIndex];
    }

    return undefined;
  }

  public filteredContacts(contactList: ContactList): Contact[] {
    const contacts: Contact[] = [];

    for (const contactArea of this.contactAreas) {
      if (contactArea === 'US Senate') {
        contacts.push(...contactList.senate);
      } else if (contactArea === 'US House') {
        contacts.push(...contactList.house);
      } else if (contactArea === 'Governor' && contactList.governor) {
        contacts.push(contactList.governor);
      } else if (contactArea === 'StateUpper' && contactList.stateUpper) {
        contacts.push(contactList.stateUpper);
      } else if (contactArea === 'StateLower' && contactList.stateLower) {
        contacts.push(contactList.stateLower);
      }
    }

    return contacts;
  }

  public listItemLabel(): string {
    switch (this.contactType) {
      case 'REPS':
        return 'Call reps' + this.countLabel();
      case 'ACTION':
        return 'Take action' + this.countLabel();
      default:
        return '???';
    }
  }

  public countLabel(): string {
    if (this.stats.calls < 10) {
      return '';
    }

    switch (this.contactType) {
      case 'REPS':
        return ' ⋆ ' + this.stats.calls + ' calls made';
      case 'ACTION':
        return ' ⋆ ' + this.stats.calls + ' actions taken';
      default:
        return '???';
    }
  }
}

export interface IssueStats {
  completion: number;
  calls: number;
}

export interface Category {
  name: string;
}

export const mockIssue = Object.assign(new Issue(), {
  id: 123,
  name: 'Issue Name',
  contactType: 'REPS',
  contactAreas: [],
  reason: 'reason',
  script: 'issue *mock script*',
  active: true,
  createdAt: '',
  slug: 'issue-name',
  outcomeModels: [],
  link: '',
  linkTitle: '',
  stats: { completion: 0, calls: 10 }
});
