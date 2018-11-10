import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the stats state domain
 */

const selectStatsDomain = state => state.get('stats', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Stats
 */

const makeSelectStats = () =>
  createSelector(selectStatsDomain, substate => substate.toJS());

export default makeSelectStats;
export { selectStatsDomain };
