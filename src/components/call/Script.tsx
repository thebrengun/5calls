import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';

import { Contact, Issue } from '../../common/model';
import { LocationState } from '../../redux/location/reducer';

interface Props {
  readonly issue: Issue;
  readonly currentContact: Contact;
  readonly locationState: LocationState;
}

// Replacement regexes, ideally standardize copy to avoid complex regexs
const titleReg = /\[REP\/SEN NAME\]|\[SENATOR\/REP NAME\]/gi;
const locationReg = /\[CITY,\s?ZIP\]|\[CITY,\s?STATE\]/gi;

function getContactNameWithTitle(contact: Contact) {
  let title = '';
  switch (contact.area) {
    case 'House':
      title = 'Rep. ';
      break;
    case 'Senate':
      title = 'Senator ';
      break;
    case 'StateLower':
    case 'StateUpper':
      title = 'Legislator ';
      break;
    case 'Governor':
      title = 'Governor ';
      break;
    case 'AttorneyGeneral':
      title = 'Attorney General ';
      break;
    case 'SecretaryOfState':
      title = 'Secretary of State ';
      break;
    default:
      title = '';
  }
  return title + contact.name;
}

function scriptFormat(
  issue: Issue,
  locationState: LocationState,
  contact: Contact
) {
  const location = locationState.cachedCity;
  let script = issue.script;
  if (location) {
    script = script.replace(locationReg, location);
  }

  const title = getContactNameWithTitle(contact);
  script = script.replace(titleReg, title);

  return script;
}

export const Script: React.StatelessComponent<Props> = ({
  issue,
  currentContact,
  locationState
}: Props) => {
  let formattedScript = scriptFormat(issue, locationState, currentContact);

  return (
    <div className="call__script">
      <div className="call__script__body">
        <ReactMarkdown source={formattedScript} />
      </div>
    </div>
  );
};

export default Script;

export { getContactNameWithTitle };
