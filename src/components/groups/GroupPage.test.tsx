import * as React from 'react';
import { shallow } from 'enzyme';
import { GroupPage } from './';
import { AppCache } from '../../redux/cache';
import { GroupState } from '../../redux/group';
import { RemoteDataState } from '../../redux/remoteData';

test('Test Group Page loading', () => {
  const pageProps = initPage();
  const component = shallow(
    <GroupPage
      {...pageProps}
    />
  );
  expect(component).toMatchSnapshot();
});

const initPage = () => {
  const id = 'craig';
  return {
    match: {params: {groupid: id, issueid: '100'}, isExact: true, path: '', url: ''},
    appCache: AppCache,
    remoteState: {} as RemoteDataState,
    groupState: {} as GroupState,
  };
};
