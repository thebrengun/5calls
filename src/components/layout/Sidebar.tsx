import * as React from 'react';
import { Issue, Group } from '../../common/model';
import { IssuesListTranslatable } from '../issues';

interface Props {
  readonly issues: Issue[];
  readonly currentIssue?: Issue;
  readonly currentGroup?: Group;
  readonly completedIssueIds: string[];
}

const Sidebar: React.StatelessComponent<Props> = (props: Props) => {
  return (
    <IssuesListTranslatable
      issues={props.issues}
      currentIssue={props.currentIssue}
      currentGroup={props.currentGroup}
      completedIssueIds={props.completedIssueIds}
    />
  );
};

export default Sidebar;
