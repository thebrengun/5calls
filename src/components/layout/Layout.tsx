import * as React from 'react';
import { Helmet } from 'react-helmet';

import { Issue, Group } from '../../common/model';
import { SidebarHeader, Sidebar, Footer, Header } from './index';

import { RemoteDataState } from '../../redux/remoteData';
import {
  groupStateContext,
  remoteStateContext,
  callStateContext,
  userStateContext,
} from '../../contexts';

interface Props {
  readonly children?: {};
  readonly extraComponent?: {};
  readonly postcards?: boolean;
  readonly currentIssue?: Issue;
}

function hideDonation(group?: Group): boolean {
  if (group && group.subscribed) {
    return true;
  }

  return false;
}

function getIssues(remoteState: RemoteDataState): Issue[] {
  if (remoteState.groupIssues) {
    return remoteState.groupIssues;
  }
  return remoteState.issues;
}

const Layout: React.StatelessComponent<Props> = (props: Props) => (
  <groupStateContext.Consumer>
  {groupState =>
    <div>
      <Helmet>
        <title>5 Calls: Make your voice heard</title>
      </Helmet>
      <userStateContext.Consumer>
      { userState =>
        <Header
          postcards={props.postcards}
          currentUser={userState}
          hideDonation={hideDonation(groupState.currentGroup)}
        />
      }
      </userStateContext.Consumer>
      <div className="layout">
        <aside id="nav" role="contentinfo" className="layout__side">
          <callStateContext.Consumer>
          { callState =>
            <remoteStateContext.Consumer>
            { remoteState =>
                <div className="issues">
                  <SidebarHeader currentGroup={groupState.currentGroup}/>
                  <Sidebar
                    issues={getIssues(remoteState)}
                    currentIssue={props.currentIssue ? props.currentIssue : undefined}
                    currentGroup={groupState.currentGroup}
                    completedIssueIds={callState.completedIssueIds}
                  />
                </div>
            }
            </remoteStateContext.Consumer>
          }
          </callStateContext.Consumer>
        </aside>
        <main id="content" role="main" aria-live="polite" className="layout__main">
          {props.children}
        </main>
      </div>
      {props.extraComponent}
      <Footer/>
    </div>
  }
  </groupStateContext.Consumer>
);

export default Layout;
