import * as React from 'react';
import i18n from '../../services/i18n';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { find } from 'lodash';
import { Issue, Group } from '../../common/model';
import { IssuesListItem } from './index';

interface Props {
  issues: Issue[];
  currentIssue?: Issue;
  currentGroup?: Group;
  completedIssueIds: string[];
}

export const IssuesList: React.StatelessComponent<Props> = (props: Props) => {
  let currentIssueId: string = props.currentIssue ? props.currentIssue.id : '';

  const listFooter = () => {
    if (!props.currentGroup) {
      return (
        <li>
          <Link
            to={`/more`}
            className={`issues__footer-link`}
          >
            <span>{i18n.t('issues.viewAllActiveIssues')}</span>
          </Link>
        </li>
      );
    } else {
      return <span />;
    }
  };

  const listItems = () => {
    if (props.currentGroup && props.issues && props.issues.length === 0) {
      return <li><a className="issues__footer-link"><span>Getting your team calls...</span></a></li>;
    } else if (props.issues && props.issues.map) {
      return props.issues.map(issue =>
        (
        <IssuesListItem
          key={issue.id}
          issue={issue}
          isIssueComplete={
            props.completedIssueIds &&
            (find(props.completedIssueIds, (issueId: string) => issue.slug === issueId) !== undefined)
          }
          isIssueActive={currentIssueId === issue.id}
          currentGroup={props.currentGroup}
        />
      ));
    } else {
      return <div style={{ textAlign: 'center' }}>{i18n.t('noCalls.title')}</div>;
    }
  };

  return (
    <ul className="issues-list" role="navigation">
      {listItems()}
      {listFooter()}
    </ul>
  );
};

export const IssuesListTranslatable = translate()(IssuesList);
