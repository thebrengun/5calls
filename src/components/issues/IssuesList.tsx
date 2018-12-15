import * as React from 'react';
import i18n from '../../services/i18n';
import { Link } from 'react-router-dom';
import { find } from 'lodash';

import { Issue } from '../../common/model';
import { IssuesListItem } from './index';
import { getIssuesIfNeeded } from '../../redux/remoteData';

interface Props {
  issues: Issue[];
  currentIssue?: Issue;
  completedIssueIds: string[];
}

export class IssuesList extends React.Component<Props> {
  componentDidMount() {
    getIssuesIfNeeded();
  }

  listFooter = () => {
    return (
      <li>
        <Link to={`/more`} className={`issues__footer-link`}>
          <span>{i18n.t('issues.viewAllActiveIssues')}</span>
        </Link>
      </li>
    );
  };

  listItems = () => {
    let currentIssueId = this.props.currentIssue
      ? this.props.currentIssue.id
      : 0;

    if (this.props.issues && this.props.issues.map) {
      return this.props.issues.map(issue => (
        <IssuesListItem
          key={issue.id}
          issue={issue}
          isIssueComplete={
            this.props.completedIssueIds &&
            find(
              this.props.completedIssueIds,
              (issueId: string) => issue.slug === issueId
            ) !== undefined
          }
          isIssueActive={currentIssueId === issue.id}
        />
      ));
    } else {
      return (
        <div style={{ textAlign: 'center' }}>{i18n.t('noCalls.title')}</div>
      );
    }
  };

  render() {
    return (
      <ul className="issues-list" role="navigation">
        {this.listItems()}
        {this.listFooter()}
      </ul>
    );
  }
}
