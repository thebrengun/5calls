import * as React from 'react';

import { Contact, ContactList, Issue } from '../../common/models';
import { CallState } from '../../redux/callState';
import { UserStatsState } from '../../redux/userStats';

interface Props {
  readonly currentIssue: Issue;
  readonly callState: CallState;
  readonly userStatsState: UserStatsState;
  readonly contactList: ContactList;
  readonly currentContact?: Contact;
  readonly selectContact: (index: number) => void;
}

export const ContactProgress: React.StatelessComponent<Props> = ({
  currentIssue,
  callState,
  userStatsState,
  contactList,
  currentContact,
  selectContact
}: Props) => {
  // this component can handle the click to avoid complexity upstream
  const selectIndirect = (
    e: React.MouseEvent<HTMLAnchorElement>,
    index: number
  ) => {
    e.preventDefault();
    selectContact(index);
  };

  const contactCalled = (contact: Contact): Boolean => {
    if (userStatsState.all) {
      let completed = userStatsState.all.filter(result => {
        return (
          result.contactid === contact.id &&
          result.issueid === currentIssue.id.toString()
        );
      });
      if (completed.length > 0) {
        return true;
      }
    }

    return false;
  };

  const repPhoto = (contact: Contact | undefined): string => {
    if (contact) {
      // contact has been called for this issue
      if (contactCalled(contact)) {
        return '/img/contacted.png';
      } else if (contact.photoURL) {
        return contact.photoURL;
      }
    }

    return '/img/no-rep.png';
  };

  const listItem = (
    area: string,
    areaContact: Contact | undefined,
    active: boolean,
    index: number
  ) => {
    return (
      <li key={index} className={active ? 'active' : ''}>
        <a href="#" onClick={e => selectIndirect(e, index)}>
          <img alt="" src={repPhoto(areaContact)} />
        </a>
        <h4>
          {areaContact ? (
            <a href="#" onClick={e => selectIndirect(e, index)}>
              {areaContact.name}
            </a>
          ) : (
            area
          )}
        </h4>
        <p>
          {/* change this text if you've called too so we're extra clear */}
          {areaContact
            ? areaContact.reason
            : 'Location not accurate enough to find this representative'}
        </p>
      </li>
    );
  };

  // each string is a area identifier, plus a contact if we have one
  const contactsForArea = (areas: string[]): [string, Contact?][] => {
    let contactsWanted: [string, Contact?][] = [];

    for (let area of currentIssue.contactAreas) {
      switch (area) {
        case 'US Senate':
          contactsWanted.push([
            area,
            contactList.senate.length > 0 ? contactList.senate[0] : undefined
          ]);
          contactsWanted.push([
            area,
            contactList.senate.length > 1 ? contactList.senate[1] : undefined
          ]);
          break;
        case 'US House':
          // deal with this: multiple house reps might return if we don't know which district
          contactsWanted.push([
            area,
            contactList.house.length > 0 ? contactList.house[0] : undefined
          ]);
          break;
        case 'Governor':
          contactsWanted.push([area, contactList.governor]);
          break;
        case 'StateUpper':
          contactsWanted.push([area, contactList.stateUpper]);
          break;
        case 'StateLower':
          contactsWanted.push([area, contactList.stateLower]);
          break;
        default:
          break;
      }
    }

    return contactsWanted;
  };

  if (currentIssue.contactAreas.length === 0) {
    return <span />;
  }

  return (
    <div className="contact-progress">
      <h3>Contacts for this topic:</h3>
      <ul>
        {contactsForArea(currentIssue.contactAreas).map((areaMap, index) => {
          const isActiveContact = areaMap[1] === currentContact;
          return listItem(areaMap[0], areaMap[1], isActiveContact, index);
        })}
      </ul>
      <p className="help">
        <a href="#">Where are the rest of my representatives?</a>
      </p>
    </div>
  );
};
