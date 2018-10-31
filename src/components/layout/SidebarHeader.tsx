import * as React from 'react';

import { LocationTranslatable } from '../location';
import { locationStateContext } from '../../contexts';

interface Props {
}

const SidebarHeader: React.StatelessComponent<Props> = (props: Props) => {
  return (
    <header className="issues__header" role="banner">
      <div className="issues__location">
        <locationStateContext.Consumer>
        { locationState =>
          <LocationTranslatable
            locationState={locationState}
          />
        }
        </locationStateContext.Consumer>
      </div>
      <h2>What’s important to you?</h2>
    </header>
  );
};

export default SidebarHeader;
