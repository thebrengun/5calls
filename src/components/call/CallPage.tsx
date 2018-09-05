import * as React from 'react';
import { isEqual } from 'lodash';
import { Helmet } from 'react-helmet';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router';

import * as Constants from '../../common/constants';

import { getIssue } from '../shared/utils';

import { CallTranslatable, FetchCall } from './index';
import { Layout } from '../layout';
import { Issue, Group } from '../../common/model';
import { GroupDisclaimer } from '../groups/GroupPage';

import {
  CallState,
  selectIssueActionCreator,
} from '../../redux/callState';
import { queueUntilRehydration } from '../../redux/rehydrationUtil';
import {
  getIssuesIfNeeded,
  RemoteDataState,
} from '../../redux/remoteData';
import { store } from '../../redux/store';
import { cacheGroup } from '../../redux/cache';
import { GroupState } from '../../redux/group';

import {
  remoteStateContext,
  callStateContext,
  groupStateContext,
} from '../../contexts';

interface RouteProps {
  readonly groupid: string;
  readonly issueid: string;
}

// tslint:disable-next-line:no-bitwise
type Props = RouteComponentProps<RouteProps> & {
  remoteState: RemoteDataState;
  callState: CallState;
  groupState: GroupState;
};

export interface State {
  currentIssue: Issue;
  currentIssueId: string;
  currentGroup: Group | undefined;
  hasBeenCached: boolean;
}

class CallPageView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = this.setStateFromProps(props);
  }

  setStateFromProps(props: Props) {
    let currentIssue = this.getCurrentIssue(props.remoteState);
    let currentGroup = this.getCurrentGroup(props.groupState);

    return {
      currentIssue: currentIssue,
      currentIssueId: currentIssue.id,
      currentGroup: currentGroup,
      hasBeenCached: false,
    };
  }

  componentDidMount() {
    // the user has clicked on an issue from the sidebar
    if (!this.state.currentIssueId && this.state.currentIssue) {
      selectIssueActionCreator(this.state.currentIssue.id);
    }
    this.determineCachedState(this.props.groupState);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.remoteState.issues) {
      if (!isEqual(this.props, prevProps)) {
        const curIssue = this.getCurrentIssue(this.props.remoteState);
        this.setState({
          ...this.state,
          currentIssue: curIssue,
          currentIssueId: curIssue.id,
        });
      }
    }
  }

  getCurrentIssue = (remoteState: RemoteDataState) => {
    let currIssue = new Issue();
    const path = this.props.location.pathname.split('/');
    let issueid = '';
    if (path.length > 2) {
      issueid = path[path.length - 1];
    }
    if (path) {
      if (!this.state || this.state.currentIssueId !== issueid) {
        store.dispatch(selectIssueActionCreator(issueid));
        currIssue = getIssue(remoteState, issueid);
      }
    } else {
      currIssue = getIssue(remoteState, this.state.currentIssueId);
    }

    return currIssue;
  }

  getCurrentGroup = (groupState: GroupState) => {
    return groupState.currentGroup ? groupState.currentGroup : undefined;
  }

  determineCachedState = (groupState: GroupState) => {
    let hasBeenCached = false;

    if (this.state.currentGroup && groupState.currentGroup) {
      hasBeenCached = this.state.currentGroup.groupID === groupState.currentGroup.groupID;
    }
    this.setState({ hasBeenCached: hasBeenCached });

    if (!hasBeenCached) {
      queueUntilRehydration(() => {
        if (groupState.currentGroup) {
          let group = groupState.currentGroup as Group;
          cacheGroup(group.groupID);
        }
      });
    }
  }

  getView = () => {
  //
    // get the current group and groupImage
    let groupImage = '/img/5calls-stars.png';
    if (this.state.currentGroup && this.state.currentGroup.photoURL) {
      groupImage = this.state.currentGroup.photoURL;
    }

    if (!this.props.remoteState.issues) {
      queueUntilRehydration(() => {
        getIssuesIfNeeded();
      });
    }

    let extraComponent;
    if (this.state.currentGroup) {
      extraComponent = <GroupDisclaimer/>;
    }

    let pageTitle = Constants.PAGETITLE;
    if (this.state.currentIssue) {
      if (this.state.currentGroup) {
        pageTitle = `${this.state.currentIssue.name} - ${this.state.currentGroup.name}: 5 Calls`;
      } else {
        pageTitle = `${this.state.currentIssue.name}: 5 Calls`;
      }
    }

    let canonicalURL: string | undefined = undefined;
    if (this.state.currentIssue) {
      let slug = this.state.currentIssue.slug;
      if (slug === '' || slug === undefined) {
        slug = this.state.currentIssue.id;
      }

      if (this.props.groupState.currentGroup) {
        canonicalURL = Constants.APP_URL + '/team/' + this.props.groupState.currentGroup.groupID + '/' + slug;
      } else {
        canonicalURL = Constants.APP_URL + '/issues/' + slug;
      }
    }

    if (this.state.currentIssue &&
        this.state.currentIssue.contactType &&
        this.state.currentIssue.contactType === 'FETCH') {
        return (
        <Layout
          extraComponent={extraComponent}
        >
          <Helmet>
            <title>{pageTitle}</title>
            {canonicalURL && <link rel="canonical" href={canonicalURL} />}
          </Helmet>
          { this.state.currentGroup ?
          <div className="page__group">
            <div className="page__header">
              <div className="page__header__image"><img alt={this.state.currentGroup.name} src={groupImage}/></div>
              <h1 className="page__title">{this.state.currentGroup.name}</h1>
              <h2 className="page__subtitle">{this.state.currentGroup.subtitle}&nbsp;</h2>
            </div>
            <FetchCall
              issue={this.state.currentIssue}
              currentGroup={this.state.currentGroup}
            />
          </div>
          :
          <FetchCall
            issue={this.state.currentIssue}
            currentGroup={this.state.currentGroup}
          />
          }
        </Layout>
      );
    } else {
      return (
        <Layout
          extraComponent={extraComponent}
        >
          <Helmet>
            <title>{pageTitle}</title>
            {canonicalURL && <link rel="canonical" href={canonicalURL} />}
          </Helmet>
          { this.state.currentGroup ?
          <div className="page__group">
            <div className="page__header">
              <div className="page__header__image"><img alt={this.state.currentGroup.name} src={groupImage}/></div>
              <h1 className="page__title">{this.state.currentGroup.name}</h1>
              <h2 className="page__subtitle">{this.state.currentGroup.subtitle}&nbsp;</h2>
            </div>
            <CallTranslatable
              issue={this.state.currentIssue}
              callState={this.props.callState}
            />
          </div>
          :
          <CallTranslatable
            issue={this.state.currentIssue}
            callState={this.props.callState}
          />
          }
        </Layout>
      );
    }
  }

  render() {
    return (
      <>
        {this.getView()}
      </>
    );
  }
}

export const CallPageWithRouter = withRouter(CallPageView);

export default class CallPage extends React.Component {
  render() {
    return (
      <remoteStateContext.Consumer>
      { remoteState =>
        <callStateContext.Consumer>
        { callState =>
          <groupStateContext.Consumer>
          { groupState =>
            <CallPageWithRouter
              remoteState={remoteState}
              callState={callState}
              groupState={groupState}
            />
          }
          </groupStateContext.Consumer>
          }
        </callStateContext.Consumer>
      }
      </remoteStateContext.Consumer>
    );
  }
}
