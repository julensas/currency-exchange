import { takeEvery, call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { Api } from 'utils/api';
import * as C from './constants';

function* fetchRates() {
  try {
    const { data } = yield call(Api.get, 'latest.json');
    yield put({ type: C.FETCH_RATES_SUCCESS, payload: data });
    yield call(listenToRate);
  } catch (e) {
    yield put({ type: C.FETCH_RATES_FAIL, payload: e });
  }
}

export function* listenToRate() {
  try {
    yield call(delay, 10000);
    while (true) {
      const t0 = performance.now();
      const { data } = yield call(Api.get, 'latest.json');
      yield put({ type: C.FETCH_RATES_SUCCESS, payload: data });
      const t1 = performance.now();
      yield call(delay, 10000 - (t1 - t0));
    }
  } catch (e) {
    yield put({ type: C.FETCH_RATES_FAIL, payload: e });
  }
}

// Individual exports for testing
export default function* exchangePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(C.FETCH_RATES, fetchRates);
}
