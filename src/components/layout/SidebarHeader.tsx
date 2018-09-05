import * as React from 'react';
import { Link } from 'react-router-dom';

import i18n from '../../services/i18n';
import { LocationTranslatable } from '../location';
import { Group } from '../../common/model';
import { locationStateContext } from '../../contexts';

interface Props {
  readonly currentGroup?: Group;
}

const SidebarHeader: React.StatelessComponent<Props> = (props: Props) => {
  let headerIntro = <h2>{i18n.t('issues.whatsImportantToYou')}</h2>;

  if (props.currentGroup) {
    headerIntro = (
      <h3>
        <Link to={`/team/${props.currentGroup.groupID}`}>{props.currentGroup.name} Home</Link>
      </h3>
    );
  }

  return (
    <header className="issues__header" role="banner">
      <div className="issues__location">
        <locationStateContext.Consumer>
        { locationState =>
          <LocationTranslatable
            locationState={locationState}
            t={i18n.t}
          />
        }
        </locationStateContext.Consumer>
      </div>
      {headerIntro}
    </header>
  );
};

export default SidebarHeader;
