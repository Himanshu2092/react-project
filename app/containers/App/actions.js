/*
 *
 *App actions
 *
 */

import { SAVE, EDIT } from './constants';

export function save(data, qType) {
  return {
    type: SAVE,
    payload: {
      data,
      qType,
    },
  };
}
export function edit(data) {
  return {
    type: EDIT,
    payload: {
      data,
    },
  };
}
