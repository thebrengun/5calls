import * as React from 'react';
import {
  GroupState,
  GroupLoadingActionStatus,
} from '../redux/group';
import { Group } from '../common/model';

const defaultGroupState: GroupState = {
  currentGroup: new Group(''),
  groupLoadingStatus: GroupLoadingActionStatus.LOADING,
};

export const groupStateContext = React.createContext<GroupState>(defaultGroupState);
