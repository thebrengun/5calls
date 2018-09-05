import { Dispatch } from 'redux';
import { fetchAllIssues } from '../../redux/remoteData';
import { setLocation, setUiState } from './index';
import { ApplicationState } from '../root';
import { LocationUiState, Group } from '../../common/model';
import { fetchGroupIssues } from '../remoteData/asyncActionCreator';

export function setAddress(address: string) {
  return (dispatch: Dispatch<ApplicationState>) => {
    // tslint:disable-next-line:no-any
    return dispatch<any>(fetchAllIssues(address))
      .then(() => {
        dispatch(setLocation(address));
      });
  };
}

export function newLocationLookup(location: string, group?: Group) {
  return (dispatch: Dispatch<ApplicationState>) => {
    if (group) {
      // tslint:disable-next-line:no-any
      return dispatch<any>(fetchGroupIssues(group.groupID, location))
      .then(() => {
        dispatch(setUiState(LocationUiState.LOCATION_FOUND));
      })
      .catch((error) => {
        dispatch(setUiState(LocationUiState.LOCATION_ERROR));
      });
    } else {
      // tslint:disable-next-line:no-any
      return dispatch<any>(fetchAllIssues(location))
      .then(() => {
        dispatch(setUiState(LocationUiState.LOCATION_FOUND));
      })
      .catch((error) => {
        dispatch(setUiState(LocationUiState.LOCATION_ERROR));
      });
    }
  };
}
