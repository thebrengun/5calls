import * as React from 'react';

import { ContactList } from '../../common/contactList';
import { Contact } from '../../common/model';
import { CallState } from '../../redux/callState';

interface Props {
  readonly callState: CallState;
  readonly contactList: ContactList;
  readonly currentContact?: Contact;
}

export const ContactProgress: React.StatelessComponent<Props> = ({ callState, contactList, currentContact }: Props) => {
  return (
    <h3>Contacts for this topic:</h3>
  );
};