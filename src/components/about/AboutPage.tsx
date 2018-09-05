import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import i18n from '../../services/i18n';
import { AboutTranslatable } from './index';
import { Layout } from '../layout';

interface Props extends RouteComponentProps<{ id: string }> { }

const AboutPage: React.StatelessComponent<Props> = (props: Props) => (
  <Layout>
    <AboutTranslatable
      t={i18n.t}
    />
  </Layout>
);

export default withRouter(AboutPage);
