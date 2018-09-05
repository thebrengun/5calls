import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { TranslationFunction } from 'i18next';
import { translate } from 'react-i18next';
import {
  submitOutcome,
} from '../../redux/callState';
// import { store } from '../../redux/store';
import { Issue } from '../../common/model';

interface Props { readonly currentIssue: Issue; readonly currentContactId: string;
  readonly numberContactsLeft: number;
  readonly t: TranslationFunction;
}
interface State { }

// tslint:disable-next-line:no-any
class Outcomes extends React.Component<Props & RouteComponentProps<any>, State>  {

  dispatchOutcome(e: React.MouseEvent<HTMLButtonElement>, outcome: string) {
    /* e.target.blur() called in Choo version
      for details on use of currentTarget see:
      https://github.com/DefinitelyTyped/DefinitelyTyped/pull/12239
    */
    e.currentTarget.blur();

    submitOutcome(
      {
        outcome: outcome,
        numberContactsLeft: this.props.numberContactsLeft,
        issueId: this.props.currentIssue.id,
        contactId: this.props.currentContactId,
      }
    );

    // navigate to /done when finished
    if (this.props.numberContactsLeft === 0 && this.props.history) {
      // it feels like this history push should be further up (maybe in onsubmitoutcome?)
      if (this.props.match.params.groupid) {
        this.props.history.push(`/team/${this.props.match.params.groupid}`);
      } else {
        this.props.history.push(`/done/${this.props.currentIssue.id}`);
      }

      window.scroll(1, 1);
    } else {
      // scroll to the contact element
      const contact = document.getElementById('contact');
      const yOffset = contact ? (contact.getBoundingClientRect().top * -1) + 200 : 1;
      window.scroll(1, yOffset);
    }

    return true;
  }

  render() {
    if (this.props.currentIssue) {
      if (this.props.currentIssue.contactType === 'ACTION') {
        return (
          <div className="call__outcomes">
            <div className="call__outcomes__items">
              <button onClick={(e) => this.dispatchOutcome(e, 'completed')}>
                I Did It!
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <div className="call__outcomes">
            <h3 className="call__outcomes__header">
              {this.props.t('outcomes.enterYourCallResult')}
            </h3>
            <div className="call__outcomes__items">
              {this.props.currentIssue.outcomeModels.map((outcome, index) =>
                <button key={index} onClick={(e) => this.dispatchOutcome(e, outcome.label)}>
                  {this.props.t('outcomes.' + outcome.label)}
                </button>
              )}
            </div>
          </div>
        );
      }
    } else {
      return <span />;
    }
  }
}

export default translate()(withRouter(Outcomes));
