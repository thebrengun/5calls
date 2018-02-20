import * as React from 'react';
import { Redirect } from 'react-router';
// import { bindActionCreators } from 'redux';
// import { connect, Dispatch } from 'react-redux';

import Auth from './shared/loginUtil';
// import { ApplicationState } from '../redux/root';
// import { UserAuth, setAuthTokenActionCreator } from './redux/userState';

interface InternalState {
  doneRedirect: boolean;
}

interface StateProps {
  readonly totalCount: number;
}

interface DispatchProps {
  readonly onGotToken: () => void;//(userAuth: UserAuth) => void;
}

class Auth0Callback extends React.Component<StateProps, InternalState> {
  constructor(props: StateProps & DispatchProps) {
    super(props);
    this.state = {doneRedirect: false};
  }

  componentDidMount() {
    new Auth().handleAuthentication();
    // this.setState({ doneRedirect: true });
  }

  render() {
    if (this.state.doneRedirect) {
      return <Redirect to="/"/>;
    } else {
      return <h1>Logging you in...</h1>;
    }
  }
}

// const mapStateToProps = (state: ApplicationState): StateProps => {
//   return {
//     totalCount: 0,
//   };
// };

// const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>): DispatchProps => {
//   return bindActionCreators(
//     {
//       onGotToken: () => {},//setAuthTokenActionCreator,
//     },
//     dispatch);
// };

// WARNING THIS IS NOT CONNECTED
// export default connect<StateProps, DispatchProps, InternalState>(mapStateToProps, mapDispatchToProps)(Auth0Callback);
export default Auth0Callback;