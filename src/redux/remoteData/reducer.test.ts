import { Issue } from './../../common/models';
import {
  RemoteDataState,
  remoteDataReducer,
  IssuesAction,
  CallCountAction,
  RemoteDataActionType
} from './index';

let defaultState;
beforeEach(() => {
  defaultState = {
    issues: [],
    callTotal: 0,
    errorMessage: ''
  };
});

test('Remote Data reducer processes GET_ISSUES action correctly', () => {
  const issues = [new Issue(), new Issue()];
  const state: RemoteDataState = Object.assign({}, defaultState, issues);
  const action: IssuesAction = {
    type: RemoteDataActionType.GET_ISSUES,
    payload: issues
  };
  const newState = remoteDataReducer(state, action);
  expect(newState.issues).toEqual(issues);
});

test('Remote Data reducer processes GET_CALL_TOTAL action correctly', () => {
  const callTotal = 99999;
  const state: RemoteDataState = Object.assign({}, defaultState, callTotal);
  const action: CallCountAction = {
    type: RemoteDataActionType.GET_CALL_TOTAL,
    payload: callTotal
  };
  const newState = remoteDataReducer(state, action);
  expect(newState.callTotal).toEqual(callTotal);
});
