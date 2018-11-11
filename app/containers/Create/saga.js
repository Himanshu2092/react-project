import { take, takeLatest, call, put, select } from 'redux-saga/effects';
import { PENDING } from './constants';
import { firebase } from '../../config';
import * as actions from './actions';
import { makeSelectStore } from './selectors';

// Individual exports for testing

export function* submitQuestion(action) {
  const { create } = yield select(makeSelectStore());

  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true,
  });
  if (action.payload.qType == 'add') {
    const questRef = db
      .collection('questions')
      .add({
        ...create.request,
      })
      .then(res => {
        let questions = getQuestions();
      })
      .catch(err => {
        dispatch(obj, 'success');
      });
  } else {
    const questRef = db.collection('questions').add({
      ...create.request,
    });
  }
}

export function* dispatch(data, type) {
  if (type == 'success') {
    yield put(actions.fullfilled(data));
  }
  if (type == 'error') {
    yield put(actions.rejected(data));
  }
}

function getQuestions() {
  const db = firebase.firestore();

  let questions = [];
  db.collection('questions')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.exists) {
          let obj = {
            id: doc.id,
            ...doc.data(),
          };
          questions.push(obj);
        }
      });

      dispatch(questions, 'success');
    })
    .catch(err => {
      dispatch('service error', 'error');
    });
}

// export function* saveQuestion(action) {
//
//   try {
//     const res = yield call(submitQuestion, action.payload.qType);
//
//     yield put(actions.fullfilled(res));
//
//   } catch (e) {
//
//     let error = e;
//     yield put(actions.rejected());
//   }
// }

export default function* createSaga() {
  //  yield takeLatest(PENDING, submitQuestion);
}
