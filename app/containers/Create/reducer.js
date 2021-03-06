/*
 *
 * Create reducer
 *
 */

import { fromJS } from 'immutable';
import { PENDING, FULLFILLED, REJECTED, SAVE } from './constants';
import { defaultStates } from './config';
import { makeSelectStore } from './selectors';
export const initialState = fromJS({
  questionDetails: [],
});

function createReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE:
      return state.set('questionDetails', action.payload.data);
    default:
      return state;
  }
}

export default createReducer;
