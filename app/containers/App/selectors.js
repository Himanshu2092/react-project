import { createSelector } from 'reselect';
import { initialState } from './reducer';
import config from './config';

/**
 * Direct selector to the create state domain
 */

const selectAppDomain = state => state.get(config.reducer.name, initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Create
 */

const makeSelectStore = () =>
  createSelector(selectAppDomain, substate => substate.toJS());

export { selectAppDomain, makeSelectStore };
