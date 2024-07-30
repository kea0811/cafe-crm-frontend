import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_CAFE_REQUEST,
  SAVE_CAFE_REQUEST,
  FETCH_LOCATIONS_REQUEST,
  DELETE_ITEM_REQUEST,
  FETCH_CAFES_BY_LOCATION_REQUEST,
  fetchLocationsSuccess,
  fetchCafeRequest,
  fetchCafeSuccess,
  fetchLocationsFailure,
  fetchCafeFailure,
  saveCafeSuccess,
  saveCafeFailure,
  deleteItemSuccess,
  deleteItemFailure,
  fetchLocationsRequest
} from '../actions/cafeActions';

function* fetchCafeSaga(action) {
    try {
        const url = action.payload.id 
        ? `http://localhost:3001/api/cafes/${action.payload.id}`
        : `http://localhost:3001/api/cafes`;

        const response = yield call(axios.get, url);
        yield put(fetchCafeSuccess(response.data));
    } catch (error) {
        yield put(fetchCafeFailure(error.message));
    }
}

function* saveCafeSaga(action) {
    try {
        const method = action.payload.id ? 'put' : 'post';
        const url = action.payload.id ? `http://localhost:3001/api/cafes/${action.payload.id}` : 'http://localhost:3001/api/cafes';
        yield call(axios[method], url, action.payload.cafe);
        yield put(saveCafeSuccess());
    } catch (error) {
        yield put(saveCafeFailure(error.message));
    }
}

function* fetchLocationsSaga() {
    try {
        const response = yield call(axios.get, 'http://localhost:3001/api/cafes/locations');
        yield put(fetchLocationsSuccess(response.data));
    } catch (error) {
        yield put(fetchLocationsFailure(error.message));
    }
}

function* deleteItemSaga(action) {
    try {
        yield call(axios.delete, `http://localhost:3001/api/cafes/${action.payload.id}`);
        yield put(deleteItemSuccess());
        yield put(fetchCafeRequest());
        yield put(fetchLocationsRequest());
    } catch (error) {
        yield put(deleteItemFailure(error.message));
    }
}

function* fetchCafesByLocation(action) {
    try {
        const location = action.payload;
        const response = yield call(axios.get, `http://localhost:3001/api/cafes?location=${location}`);
        yield put(fetchCafeSuccess(response.data));  
    } catch (error) {
        yield put(fetchCafeFailure(error.message)); 
    }
}

export function* watchCafeSagas() {
    yield takeLatest(FETCH_CAFES_BY_LOCATION_REQUEST, fetchCafesByLocation);
    yield takeLatest(DELETE_ITEM_REQUEST, deleteItemSaga);
    yield takeLatest(FETCH_CAFE_REQUEST, fetchCafeSaga);
    yield takeLatest(SAVE_CAFE_REQUEST, saveCafeSaga);
    yield takeLatest(FETCH_LOCATIONS_REQUEST, fetchLocationsSaga);
}
