import * as React from 'react';
import { CallState } from '../redux/callState';
import { Group } from '../common/model';

const defaultCallState: CallState  = {
  currentIssueId: '',
  contactIndexes: {},
  completedIssueIds: [],
  group: new Group(''),
};

export const callStateContext = React.createContext<CallState>(defaultCallState);
