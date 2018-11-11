/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import { SAVE, EDIT } from './constants';
import { defaultStates } from './config';
import { makeSelectStore } from './selectors';
export const initialState = fromJS({
  questionDetails: [],
  isEdit: false,
});

function questReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE:
      return state.set('questionDetails', action.payload.data);
    case EDIT:
      return state.set('isEdit', action.payload.data);
    default:
      return state;
  }
}

export default questReducer;
