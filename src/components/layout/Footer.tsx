import * as React from 'react';
import { Navigation } from './index';
import { TranslationFunction } from 'i18next';
import { translate } from 'react-i18next';

interface Props {
  t: TranslationFunction;
}

const Footer: React.StatelessComponent<Props> = (props: Props) => {
  return (
    <footer>
      <Navigation/>
    </footer>
  );
};

export default translate()(Footer);
