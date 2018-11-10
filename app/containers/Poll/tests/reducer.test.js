import { fromJS } from 'immutable';
import pollReducer from '../reducer';

describe('pollReducer', () => {
  it('returns the initial state', () => {
    expect(pollReducer(undefined, {})).toEqual(fromJS({}));
  });
});
