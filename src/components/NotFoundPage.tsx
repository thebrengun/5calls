import * as React from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import { LocationState } from '../redux/location/reducer';
import { CallState } from '../redux/callState/reducer';
import { Issue } from '../common/model';

import { SidebarHeader, Sidebar, Footer, Header } from './layout';

import { callStateContext, remoteStateContext } from '../contexts';

const NotFoundPage: React.StatelessComponent<Props> = (props: Props) => {
  return (
    <div>
      <Helmet>
        <title>5 Calls: Make your voice heard</title>
      </Helmet>
      <Header />
      <div className="layout">
        <aside id="nav" role="contentinfo" className="layout__side">
          <div className="issues">
            <SidebarHeader />
            <remoteStateContext.Consumer>
              {remoteState => (
                <callStateContext.Consumer>
                  {callState => (
                    <Sidebar
                      issues={remoteState.issues}
                      currentIssue={undefined}
                      completedIssueIds={callState.completedIssueIds}
                    />
                  )}
                </callStateContext.Consumer>
              )}
            </remoteStateContext.Consumer>
          </div>
        </aside>
        <main
          id="content"
          role="main"
          aria-live="polite"
          className="layout__main"
        >
          <h1>There's nothing here 😢</h1>
          <p>
            Looks like you visited a page that doesn't exist. Pick one of the
            issues on the sidebar or <Link to="/">go back to the homepage</Link>
            .
          </p>
        </main>
      </div>
      <Footer />
    </div>
  );
};

// interface OwnProps {
//   readonly issueId?: string;
//   readonly issues?: Issue[];
// }

interface Props {
  readonly issues: Issue[];
  readonly currentIssue?: Issue;
  readonly completedIssueIds: string[];
  readonly callState: CallState;
  readonly locationState: LocationState;
}

// interface DispatchProps {
//   readonly onSelectIssue: (issueId: string) => void;
//   readonly setLocation: (location: string) => void;
//   readonly clearLocation: () => void;
// }

// const mapStateToProps = (
//   state: ApplicationState,
//   ownProps: OwnProps
// ): Props => {
//   let currentIssue: Issue | undefined = undefined;
//   if (state.remoteDataState.issues) {
//     currentIssue = find(
//       state.remoteDataState.issues,
//       i => i.id.toString() === ownProps.issueId
//     );
//   }

//   let issues: Issue[] = [];
//   // overrise issues from above the layout container if needed
//   issues = ownProps.issues ? ownProps.issues : state.remoteDataState.issues;

//   return {
//     issues: issues,
//     currentIssue: currentIssue,
//     completedIssueIds: state.callState.completedIssueIds,
//     callState: state.callState,
//     locationState: state.locationState
//   };
// };

export default NotFoundPage;
