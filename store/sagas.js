import { call, put, takeEvery, delay } from 'redux-saga/effects';
import { fetchDataSuccess, fetchDataFailure } from '../cacheSlice';

function* handleFetchData(action) {
  const { fetchFunction, organizeFunction, key, refreshRate } = action;

  while (true) {
    try {
      const result = yield call(fetchFunction);

      if (result.error) {
        throw new Error(result.error);
      }

      const organizedData = organizeFunction(result.data);

      yield put(fetchDataSuccess({ key, data: organizedData }));

      yield delay(refreshRate);
    } catch (error) {
      yield put(fetchDataFailure({ error: error.message }));
    }
  }
}

function* watchFetchData() {
  yield takeEvery('FETCH_DATA_REQUEST', handleFetchData);
}

export default function* rootSaga() {
  yield watchFetchData();
}
