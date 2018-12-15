import { CallCountAction, IssuesAction, RemoteDataActionType } from './index';
import { Issue } from '../../common/model';
import { ContactList } from '../../common/contactList';
import { ContactsAction } from './action';

export const issuesActionCreator = (issues: Issue[]): IssuesAction => {
  return {
    type: RemoteDataActionType.GET_ISSUES,
    payload: issues
  };
};

export const callCountActionCreator = (callTotal: number): CallCountAction => {
  return {
    type: RemoteDataActionType.GET_CALL_TOTAL,
    payload: callTotal
  };
};

export const contactsActionCreator = (
  contacts: ContactList
): ContactsAction => {
  return {
    payload: contacts,
    type: RemoteDataActionType.GET_CONTACTS
  };
};
