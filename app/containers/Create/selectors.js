import { createSelector } from 'reselect';
import { initialState } from './reducer';
import config from './config';

/**
 * Direct selector to the create state domain
 */

const selectCreateDomain = state =>
  state.get(config.reducer.name, initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Create
 */

const makeSelectStore = () =>
  createSelector(selectCreateDomain, substate => substate.toJS());

export { selectCreateDomain, makeSelectStore };
