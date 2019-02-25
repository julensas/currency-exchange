import { takeEvery, take, call, put, fork, cancel } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { Api } from 'utils/api';
import * as C from './constants';

function* fetchRates({ payload }) {
  try {
    yield put({ type: C.STOP_LISTEN });
    const params = new URLSearchParams();
    params.append('base', payload);
    const { data } = yield call(Api.get, 'latest.json', { params });
    yield put({ type: C.FETCH_RATES_SUCCESS, payload: data });
    yield put({ type: C.LISTEN_TO_RATES, payload });
  } catch (e) {
    yield put({ type: C.FETCH_RATES_FAIL, payload: e });
  }
}

export function* listenToRateTask(base) {
  try {
    while (true) {
      yield call(delay, 10000);
      const params = new URLSearchParams();
      params.append('base', base);
      // const { data } = yield call(Api.get, 'latest.json', { params });
      // yield put({ type: C.FETCH_RATES_SUCCESS, payload: data });
      console.log('new rates', base);
    }
  } catch (e) {
    yield put({ type: C.FETCH_RATES_FAIL, payload: e });
  }
}

export function* listenToRate({ payload }) {
  const updateRatesTask = yield fork(listenToRateTask, payload);
  yield take(C.STOP_LISTEN);
  yield cancel(updateRatesTask);
}

// Individual exports for testing
export default function* exchangePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(C.FETCH_RATES, fetchRates);
  yield takeEvery(C.LISTEN_TO_RATES, listenToRate);
}
