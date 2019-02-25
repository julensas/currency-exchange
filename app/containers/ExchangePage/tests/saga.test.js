/**
 * Tests for HomePage sagas
 */

import { put, take, takeLatest } from 'redux-saga/effects';

import * as C from '../constants';

import exchangeSaga, {
  fetchRates,
  listenToRate,
  listenToRateTask,
} from '../saga';

/* eslint-disable redux-saga/yield-effects */
describe('fetchRates Saga', () => {
  let getInitDataGenerator;

  beforeEach(() => {
    getInitDataGenerator = fetchRates({ payload: 'USD' });

    const selectDescriptor = getInitDataGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getInitDataGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the GET_DATA_SUCCESS action if it requests the data successfully', () => {
    const response = { data: {} };
    const putDescriptor = getInitDataGenerator.next(response).value;
    expect(putDescriptor).toEqual(
      put({
        type: C.FETCH_RATES_SUCCESS,
        payload: {},
      }),
    );
    const putNextDescriptor = getInitDataGenerator.next().value;
    expect(putNextDescriptor).toEqual(
      put({
        type: C.LISTEN_TO_RATES,
        payload: 'USD',
      }),
    );
  });

  it('should call the GET_DATA_FAIL action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getInitDataGenerator.throw(response).value;
    expect(putDescriptor).toEqual(
      put({
        type: C.FETCH_RATES_FAIL,
        payload: response,
      }),
    );
  });
});

describe('listenToRateTask Saga', () => {
  let getInitDataGenerator;

  beforeEach(() => {
    getInitDataGenerator = listenToRateTask({ payload: 'USD' });

    const selectDescriptor = getInitDataGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getInitDataGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the GET_DATA_SUCCESS action if it requests the data successfully', () => {
    const response = { data: {} };
    const putDescriptor = getInitDataGenerator.next(response).value;
    expect(putDescriptor).toEqual(
      put({
        type: C.FETCH_RATES_SUCCESS,
        payload: {},
      }),
    );
  });

  it('should call the GET_DATA_FAIL action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getInitDataGenerator.throw(response).value;
    expect(putDescriptor).toEqual(
      put({
        type: C.FETCH_RATES_FAIL,
        payload: response,
      }),
    );
  });
});

describe('listenToRate Saga', () => {
  let getInitDataGenerator;

  beforeEach(() => {
    getInitDataGenerator = listenToRate({ payload: 'USD' });

    const selectDescriptor = getInitDataGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should take the STOP_LISTEN and cancel listenTask', () => {
    const response = { data: {} };
    const takeDescriptor = getInitDataGenerator.next(response).value;
    expect(takeDescriptor).toEqual(take(C.STOP_LISTEN));
  });
});

describe('products Saga', () => {
  const saga = exchangeSaga();

  it('should start task to watch for FETCH_RATES action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(C.FETCH_RATES, fetchRates));
    const takeNextLatestDescriptor = saga.next().value;
    expect(takeNextLatestDescriptor).toEqual(
      takeLatest(C.LISTEN_TO_RATES, listenToRate),
    );
  });
});
