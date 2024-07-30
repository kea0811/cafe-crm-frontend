import { all } from 'redux-saga/effects';
import { watchEmployeeSagas } from './employeeSagas';
import { watchCafeSagas } from './cafeSagas'

export default function* rootSaga() {
    yield all([
        watchEmployeeSagas(),
        watchCafeSagas(),
    ]);
}
