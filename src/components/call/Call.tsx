import * as React from 'react';
import { isEqual } from 'lodash';

import { Issue, Contact } from '../../common/model';
import { CallState } from '../../redux/callState';
import CallHeader from './CallHeader';
import { ContactList } from '../../common/contactList';
import { ContactDetails } from '.';
import { locationStateContext } from '../../contexts';
import Script from './Script';
import { ContactProgress } from './ContactProgress';
import { getContactsIfNeeded } from '../../redux/remoteData/asyncActionCreator';

// This defines the props that we must pass into this component.
export interface Props {
  issue: Issue;
  contacts: ContactList;
  callState: CallState;
}

export interface State {
  currentContact: Contact | undefined;
  currentContactIndex: number;
  numberContactsLeft: number;
}

export class Call extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // set initial state
    this.state = this.setStateFromProps(props);
  }

  componentDidMount() {
    getContactsIfNeeded();
  }

  /**
   * Set state from props when props
   * are initialized or refreshed
   *
   * @param {Props} props
   * @returns {State}
   */
  setStateFromProps(props: Props): State {
    let currentContactIndex = 0;
    if (props.issue && props.callState.contactIndexes && props.callState.contactIndexes[props.issue.slug]) {
      currentContactIndex = props.callState.contactIndexes[props.issue.slug];
    }

    const numberContactsLeft = props.issue && props.issue.numberOfContacts(this.props.contacts);
    const currentContact = props.issue.currentContact(this.props.contacts, currentContactIndex);

    return {
      currentContact: currentContact,
      currentContactIndex: currentContactIndex,
      numberContactsLeft: numberContactsLeft,
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (!isEqual(prevProps, this.props)) {
      this.setState(this.setStateFromProps(this.props));
    }
  }

  selectContact(index: number) {
    const currentContact = this.props.issue.currentContact(this.props.contacts, index);
    this.setState({ currentContactIndex: index, currentContact: currentContact });
  }

  render() {
    return (
      <section className="call">
        <CallHeader
          currentIssue={this.props.issue}
        />
        <ContactProgress
          currentIssue={this.props.issue}
          contactList={this.props.contacts}
          callState={this.props.callState}
          currentContact={this.state.currentContact}
          selectContact={(index) => { this.selectContact(index); }}
        />
        {this.state.currentContact &&
          <>
          <ContactDetails
            currentIssue={this.props.issue}
            currentContact={this.state.currentContact}
          />
          <locationStateContext.Consumer>
            {locationState =>
              <>
              {/* this is sort of weird, right? Should be implicit from above */}
              {this.state.currentContact &&
              <Script
                issue={this.props.issue}
                currentContact={this.state.currentContact}
                locationState={locationState}
              />
              }
              </>
            }
          </locationStateContext.Consumer>
          </>
        }

{/* //           {this.missingContacts(this.props.issue) ?
//           <NoContactSplitDistrict
//             splitDistrict={locationState.splitDistrict}
//           /> :
//           <IssueLink
//             issue={this.state.issue}
//           />
//           { this.missingContacts(this.props.issue) ? <span/> :
//           <userStateContext.Consumer>
//             {userState =>
//               <eventContext.Consumer>
//                 {eventManager =>
//                   <Outcomes
//                     currentIssue={this.state.issue}
//                     userState={userState}
//                     eventEmitter={eventManager.ee}
//                     numberContactsLeft={this.state.numberContactsLeft}
//                     currentContactId={(this.state.currentContact ? this.state.currentContact.id : '')}
//                   />                
//                 }
//               </eventContext.Consumer>
//             }
//           </userStateContext.Consumer> */}
      </section>
    );
  }
}
