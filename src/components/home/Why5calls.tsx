import * as React from 'react';
// import i18n from '../../services/i18n';
import { TranslationFunction } from 'i18next';
import { translate } from 'react-i18next';
import { Tracker } from '../stance/Tracker';
// import { CallCount } from '../shared';
// import * as Constants from '../../common/constants';

interface Props {
  totalCount: number;
  t: TranslationFunction;
}

export const Why5calls: React.StatelessComponent<Props> = (props: Props) => (
  <div className="hypothesis" >
    <header className="hypothesis__header">
      <h1 className="hypothesis__title">{props.t('hypothesis.title')}</h1>
      <h2 className="hypothesis__subtitle">
        {/*tslint:disable-next-line:max-line-length*/}
        <strong>5 Calls</strong> is the easiest and most effective way for citizens to make an impact in national and local politics
      </h2>
    </header>
    <div className="hypothesis__text">
      {/* <CallCount
        totalCount={props.totalCount}
        t={i18n.t}
      /> */}
      <Tracker
        includeList={true}
      />
    </div>
  </div>
);

export const Why5callsTranslatable = translate()(Why5calls);
