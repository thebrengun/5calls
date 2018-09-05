import * as React from 'react';
import {
  RouteComponentProps,
  withRouter,
} from 'react-router';
import * as ReactMarkdown from 'react-markdown';
import { isEqual } from 'lodash';

import { Layout } from '../layout';
import {
  Group,
  Issue,
  getDefaultGroup,
} from '../../common/model';
import { CallCount } from '../shared';
import { queueUntilRehydration } from '../../redux/rehydrationUtil';
import {
  GroupLoadingActionStatus,
  updateGroup,
  GroupState,
} from '../../redux/group';
import { getGroupIssuesIfNeeded } from '../../redux/remoteData';
import {
  findCacheableGroup,
  AppCache,
} from '../../redux/cache';
import { joinGroupActionCreator } from '../../redux/callState';
import { RemoteDataState } from '../../redux/remoteData';
import { store } from '../../redux/store';
import {
  remoteStateContext,
  appCacheContext,
  groupStateContext,

} from '../../contexts';

interface RouteProps {
  issueid: string;
}

// tslint:disable-next-line:no-bitwise
type Props = RouteComponentProps<RouteProps> & {
  readonly remoteState: RemoteDataState;
  readonly appCache: AppCache;
  readonly groupState: GroupState;
};

export interface State {
  issues: Issue[];
  loadingState: GroupLoadingActionStatus;
  group?: Group;
  groupId: string;
  hasBeenCached: boolean;
}

export const GroupDisclaimer = () => {
  return (
    /*tslint:disable-next-line:max-line-length*/
    <div className="extraDisclaimer"><p>Content on this page is the responsibility of the Team owner and is not endorsed by 5 Calls. <a href="mailto:make5calls@gmail.com">Report abusive behavior</a></p></div>
  );
};

class GroupPageView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // set initial state
    this.state = this.setStateFromProps(props);
  }

  setStateFromProps(props: Props): State {
    const groupStatus = this.getCurrentGroup();
    const groupIssues = this.getGroupIssues(groupStatus.currentGroup);

    return {
      issues: groupIssues,
      loadingState: groupStatus.loadingStatus,
      group: groupStatus.currentGroup,
      groupId: groupStatus.groupid,
      hasBeenCached: false
    };
  }

  getCurrentGroup = () => {
    let loadingStatus: GroupLoadingActionStatus = GroupLoadingActionStatus.LOADING;
    const path = this.props.location.pathname.split('/');
    let groupid = '';

    if (path.length > 2) {
      groupid = path[path.length - 1];
    }

    const cgroup = findCacheableGroup(groupid, this.props.appCache);
    if (cgroup) {
      loadingStatus = GroupLoadingActionStatus.FOUND;
    }

    let currentGroup = cgroup ? cgroup.group : getDefaultGroup(groupid);
    if (loadingStatus !== GroupLoadingActionStatus.FOUND &&
       this.props.groupState.groupLoadingStatus) {
       loadingStatus = this.props.groupState.groupLoadingStatus;
    }
    return {
      currentGroup: currentGroup,
      groupid: groupid,
      loadingStatus: loadingStatus,
    };
  }

  getGroupIssues = (currentGroup: Group) => {
    const groupIssues = this.props.remoteState.groupIssues;
    let groupPageIssues: Issue[] = [];
    if (groupIssues && groupIssues.length > 0 && currentGroup.customCalls) {
      groupPageIssues = groupIssues;
    } else {
      groupPageIssues = this.props.remoteState.issues;
    }
    return groupPageIssues;
  }

  componentDidUpdate(prevProps: Props) {
    if (!isEqual(this.props, prevProps)) {
      // tslint:disable-next-line:no-console
      console.log('did update state', this.state);
      let newState = this.setStateFromProps(this.props);
      if (!this.state.hasBeenCached && newState.group) {
        newState.hasBeenCached = true;
        queueUntilRehydration(() => {
          let group = newState.group as Group;
          updateGroup(group);
        });
      }

      if (!this.props.remoteState.issues || this.props.remoteState.issues.length === 0) {
        queueUntilRehydration(() => {
          getGroupIssuesIfNeeded(this.state.groupId);
        });
      }

      this.setState(newState);
    }
  }

  componentDidMount() {
    if (!this.props.remoteState.issues || this.props.remoteState.issues.length === 0) {
      queueUntilRehydration(() => {
        getGroupIssuesIfNeeded(this.state.groupId);
      });
    }
  }

  joinTeam = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();

    if (this.state.group) {
      store.dispatch(joinGroupActionCreator(this.state.group));
    }
  }

  wrapWithLayout(wrappedHeader: JSX.Element, group?: Group, ...additionalComponents: JSX.Element[]) {
    return (
      <Layout
        extraComponent={<GroupDisclaimer/>}
      >
        <div className="page__group">
          {wrappedHeader}
          {...additionalComponents}
        </div>
      </Layout>
    );
  }

  render() {
    let group = this.state.group;
    switch (this.state.loadingState) {
      case GroupLoadingActionStatus.LOADING:
        const wrappedLoading = (
          <h2 className="page__title">Getting team...</h2>
        );
        return (
          this.wrapWithLayout(wrappedLoading, group)
        );
      case GroupLoadingActionStatus.FOUND:

        const groupImage = group && group.photoURL ? group.photoURL : '/img/5calls-stars.png';
        const wrappedFound = (
          <div>
            <div className="page__header">
              <div className="page__header__image"><img alt={group ? group.name : ''} src={groupImage}/></div>
              <h1 className="page__title">{group ? group.name : ''}</h1>
              <h2 className="page__subtitle">{group ? group.subtitle : ''}&nbsp;</h2>
            </div>
          </div>
        );
        // Keys are needed to prevent React key warnings
        // when wrapWithLayout() is called.
        const count: JSX.Element = (
          <span key={1}>
            <CallCount
              totalCount={group ? group.totalCalls : 0}
              minimal={true}
            />
          </span>
        );
        const markdown: JSX.Element =  (
          <div key={2}>
            <ReactMarkdown source={group ? group.description : ''}/>
          </div>
        );

        return (
          this.wrapWithLayout(wrappedFound, group, count, markdown)
        );
      case GroupLoadingActionStatus.NOTFOUND:
        const wrappedNotFound = (
          <h2 className="page__title">There's no team with an ID of '{this.state.groupId}' 😢</h2>
        );
        return (
          this.wrapWithLayout(wrappedNotFound, group)
        );
      default:
        const wrappedDefault = (
          <h2 className="page__title">
            An error occurred during a request for team '{this.state.groupId}' 😢
          </h2>
        );
        return (
          this.wrapWithLayout(wrappedDefault, group)
        );
    }
  }
}

export const GroupPageWithRouter = withRouter(GroupPageView);

export default class GroupPage extends React.Component {
  render() {
    return (
      <remoteStateContext.Consumer>
      { remoteState =>
        <appCacheContext.Consumer>
        { appCache =>
          <groupStateContext.Consumer>
          { groupState =>
            <GroupPageWithRouter
              remoteState={remoteState}
              appCache={appCache}
              groupState={groupState}
            />
          }
          </groupStateContext.Consumer>
        }
        </appCacheContext.Consumer>
      }
      </remoteStateContext.Consumer>
    );
  }
}
