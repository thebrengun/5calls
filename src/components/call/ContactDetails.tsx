import * as React from 'react';

import { Issue, Contact } from '../../common/model';
import { ContactOffices } from './index';
import { makePhoneLink } from '../shared/jsxUtils';

interface Props {
  readonly currentIssue: Issue;
  readonly currentContact: Contact;
}

const contactDisplay = (contact: Contact): String => {
  return contact.name + 
         (contact.party ? `${contact.party.substring(0, 1)}-${contact.state}` : '');
};

const ContactDetails: React.StatelessComponent<Props> = ({ currentIssue, currentContact }: Props) => {
  return (
    <div className="call__contact" id="contact">
      <div className="call__contact__image"><img alt="" src={currentContact.photoURL} /></div>
      <h3 className="call__contact__type">Call this office:</h3>
      <p className="call__contact__name">
        {contactDisplay(currentContact)}
      </p>
      <p className="call__contact__phone">{makePhoneLink(currentContact.phone)}</p>
      <ContactOffices
        currentIssue={currentIssue}
        currentContact={currentContact}
      />
      { currentContact.reason ?
      <div>
        <h3 className="call__contact__reason__header">Why you’re calling this office:</h3>
        <p className="call__contact__reason">{currentContact.reason}</p>
      </div>
      : <span/> }
    </div>
  );
};

export default ContactDetails;
