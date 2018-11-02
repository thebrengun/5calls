import * as React from 'react';

// import { ContactList } from '../../common/contactList';
import { Contact, Issue } from '../../common/model';
import { CallState } from '../../redux/callState';
import { ContactList } from '../../common/contactList';

interface Props {
  readonly currentIssue: Issue;
  readonly callState: CallState;
  readonly contactList: ContactList;
  readonly currentContact?: Contact;
}

export const ContactProgress: React.StatelessComponent<Props> = (
  { currentIssue, callState, contactList, currentContact }: Props) => {
  
  const listItem = (area: string, areaContact: Contact | undefined) => {
    return (
      <li key={area}>
        <a href="#">
          <img alt="" src={areaContact && areaContact.photoURL ? areaContact.photoURL : '/img/no-rep.png'} />
        </a>
        <h4>{areaContact ? <a href="#">{areaContact.name}</a> : area}</h4>
        <p>{areaContact ? areaContact.reason : 'Location not accurate enough to find this representative'}</p>
      </li>
    );
  };

  // each string is a area identifier, plus a contact if we have one
  const contactsForArea = (areas: string[]): [string, Contact?][] => {
    let contactsWanted: [string, Contact?][] = [];

    for (let area of currentIssue.contactAreas) {
      switch (area) {
        case 'US Senate':
          contactsWanted.push([area, contactList.senate.length > 0 ? contactList.senate[0] : undefined]);
          contactsWanted.push([area, contactList.senate.length > 1 ? contactList.senate[1] : undefined]);
          break;
        case 'US House':
          // deal with this: multiple house reps might return if we don't know which district
          contactsWanted.push([area, contactList.house.length > 0 ? contactList.house[0] : undefined]);
          break;
        case 'Governor':
          contactsWanted.push([area, contactList.governor]);
          break;
        default:
          break;
      }
    }

    return contactsWanted;
  };

  if (currentIssue.contactAreas.length === 0) {
    return <span/>;
  }

  return (
    <div className="contact-progress">
      <h3>Contacts for this topic:</h3>
      <ul>
        {contactsForArea(currentIssue.contactAreas).map(areaMap => listItem(areaMap[0], areaMap[1]))}
      </ul>
      <p className="help"><a href="#">Where are the rest of my representatives?</a></p>
    </div>
  );
};