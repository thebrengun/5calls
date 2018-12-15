import { ContactList } from './contactList';

export class Issue {
  public id: number;
  public name: string;
  public contactType: string;
  public contactAreas: string[];
  public reason: string;
  public script: string;
  public active: boolean;
  public createdAt: string;
  public slug: string;
  public outcomeModels: Outcome[];
  public link: string;
  public linkTitle: string;
  public stats: IssueStats;

  constructor(oldIssue: Issue) {
    this.id = oldIssue.id;
    this.name = oldIssue.name;
    this.contactType = oldIssue.contactType;
    this.contactAreas = oldIssue.contactAreas;
    this.reason = oldIssue.reason;
    this.script = oldIssue.script;
    this.active = oldIssue.active;
    this.createdAt = oldIssue.createdAt;
    this.slug = oldIssue.slug;
    this.outcomeModels = oldIssue.outcomeModels;
    this.link = oldIssue.link;
    this.linkTitle = oldIssue.linkTitle;
    this.stats = oldIssue.stats;
  }

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

export interface Outcome {
  label: string;
  status: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  photoURL?: string;
  party: Party;
  state: string;
  reason: string;
  area?: string;
  field_offices?: FieldOffice[];
}

export interface VoterContact {
  id: string;
  name: string;
  location: string;
  phone: string;
}

export interface Category {
  name: string;
}

export class CategoryMap {
  category: Category;
  issues: Issue[];
}

export type Party = 'Democrat' | 'Republican' | 'Independent' | '';

export const DefaultContact: Contact = {} as Contact;

export interface FieldOffice {
  city: string;
  phone: string;
}

export interface UserStat {
  all: string[];
  contactedCount: number;
  voiceMailCount: number;
  unavailableCount: number;
}

/**
 * Represents the place used to get location.
 * It may be one of three options:
 * 1. CACHED_ADDRESS - address stored in local storage
 * 2. BROWSER_GEOLOCATION - address obtained from the browser geolocation API
 * 3. IP_INFO - address obtained from ipinfo.io API
 */
export enum LocationFetchType {
  CACHED_ADDRESS = 'CACHED_ADDRESS', // 'address' in Choo version
  BROWSER_GEOLOCATION = 'BROWSER_GEOLOCATION', // 'browserGeolocation' in Choo version
  IP_INFO = 'IP_INFO' // 'ipAddress' in Choo version
}

/**
 * Encapsulates a location using latitude
 * and longitude. Undefined for either longitude
 * or latitude indicates that the geolocation has
 * has not been set.
 */
export interface GeolocationPosition {
  longitude: number | undefined;
  latitude: number | undefined;
}

/* 5 Calls API data */
export interface IssueData {
  issues: Issue[];
}

export interface GroupIssues {
  splitDistrict: boolean;
  invalidAddress: boolean;
  normalizedLocation: string | undefined;
  divisions: string[];
  issues: Issue[];
}

export interface CountData {
  count: number; // total call count
}

/* Data from iponfo.io API */
export interface IpInfoData {
  ip: string;
  hostname: string;
  city: string;
  region: string; // state
  country: string;
  loc: string; // long, lat - used in issue lookup
  org: string; // internet service provider
  postal: string; // zip code
}

export interface DonationGoal {
  goal: Donations; //
}

export interface Donations {
  count: number; // number of donors
  amount: number; // total collected (api===amount)
  total: number; // goal (api===total)
  kind: string; // denomincation (dollars)
}

export interface OutcomeButton {
  title: string;
  emoji: string;
  key: string;
}

export interface MidtermStats {
  week1: number;
  week2: number;
  week3: number;
  week4: number;
  week5: number;
  week6: number;
  week7: number;
  week8: number;
}
