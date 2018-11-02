import { Reducer } from 'redux';
import { Issue } from '../../common/model';
import { RemoteDataAction, RemoteDataActionType } from './index';
import { ContactList } from '../../common/contactList';

export const defaultRemoteDataState: RemoteDataState = {
  issues: [],
  inactiveIssues: [],
  contacts: new ContactList(),
  callTotal: 0,
  errorMessage: '',
};

export interface RemoteDataState {
  issues: Issue[];
  inactiveIssues: Issue[];
  contacts: ContactList;
  callTotal: number;
  errorMessage: string;
}

export const remoteDataReducer: Reducer<RemoteDataState> = (
  state: RemoteDataState = {} as RemoteDataState,
  action: RemoteDataAction): RemoteDataState => {
  switch (action.type) {
    case RemoteDataActionType.GET_ISSUES:
      // filter all issues into active / inactive
      let activeIssues: Issue[] = [];
      let inactiveIssues: Issue[] = [];
      if (action && action.payload) {
        let issues = action.payload as Issue[];
        activeIssues = issues.filter((item) => { return item.active === true; }).map(item => new Issue(item));
        inactiveIssues = issues.filter((item) => { return item.active === false; });
      }

      const issuesState = Object.assign({}, state, {issues: activeIssues, inactiveIssues: inactiveIssues});
      return issuesState;
    case RemoteDataActionType.GET_CONTACTS:
      const contacts = action.payload as ContactList;
      return Object.assign({}, state, {contacts});
    case RemoteDataActionType.GET_CALL_TOTAL:
      return Object.assign({}, state, {callTotal: action.payload});
    case RemoteDataActionType.API_ERROR:
      return Object.assign({}, state, {errorMessage: action.payload});
    default:
      return state;
  }
};
