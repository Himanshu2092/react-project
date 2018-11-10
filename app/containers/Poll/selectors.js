import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the poll state domain
 */

const selectPollDomain = state => state.get('poll', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Poll
 */

const makeSelectPoll = () =>
  createSelector(selectPollDomain, substate => substate.toJS());

export default makeSelectPoll;
export { selectPollDomain };
