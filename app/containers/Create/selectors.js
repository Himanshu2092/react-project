import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the create state domain
 */

const selectCreateDomain = state => state.get('create', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Create
 */

const makeSelectCreate = () =>
  createSelector(selectCreateDomain, substate => substate.toJS());

export default makeSelectCreate;
export { selectCreateDomain };
