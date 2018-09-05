import * as React from 'react';
import { shallow } from 'enzyme';
import { IssuesListItem } from './index';
import { Issue } from '../../common/model';

test('IssuesListItem issue click passes issue id', () => {
  const id = 'id';
  const issue = Object.assign({}, new Issue(), {id});
  const isIssueComplete = false;
  const isIssueActive = false;
  const onSelectIssue = jest.fn();

  const component = shallow(
    <IssuesListItem
      key={issue.id}
      issue={issue}
      isIssueComplete={isIssueComplete}
      isIssueActive={isIssueActive}
    />
    );
  const link = component.find('Link');
  link.simulate('click');
  expect(onSelectIssue).toBeCalledWith(id);
});
