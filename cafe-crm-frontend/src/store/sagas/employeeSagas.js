import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    FETCH_EMPLOYEE_REQUEST,
    SAVE_EMPLOYEE_REQUEST,
    DELETE_EMPLOYEE_REQUEST,
    fetchEmployeeSuccess,
    fetchEmployeeFailure,
    fetchEmployeeRequest,
    saveEmployeeSuccess,
    saveEmployeeFailure,
    deleteEmployeeSuccess,
    deleteEmployeeFailure
} from '../actions/employeeActions';

function* fetchEmployeeSaga(action) {
    try {
        const url = action.payload.id 
        ? `http://localhost:3001/api/employees/${action.payload.id}`
        : `http://localhost:3001/api/employees`;
       
        const response = yield call(axios.get, url);
        yield put(fetchEmployeeSuccess(response.data));
    } catch (error) {
        yield put(fetchEmployeeFailure(error.message));
    }
}

function* saveEmployeeSaga(action) {
    try {
        const method = action.payload.id ? 'put' : 'post';
        const url = action.payload.id ? `http://localhost:3001/api/employees/${action.payload.id}` : 'http://localhost:3001/api/employees';
        yield call(axios[method], url, action.payload.employee);
        yield put(saveEmployeeSuccess());
    } catch (error) {
        yield put(saveEmployeeFailure(error.message));
    }
}

function* deleteEmployeeSaga(action) {
    try {
        yield call(axios.delete, `http://localhost:3001/api/employees/${action.payload.id}`);
        yield put(deleteEmployeeSuccess());
        yield put(fetchEmployeeRequest());
    } catch (error) {
        yield put(deleteEmployeeFailure(error.message));
    }
}

export function* watchEmployeeSagas() {
    yield takeLatest(DELETE_EMPLOYEE_REQUEST, deleteEmployeeSaga);
    yield takeLatest(FETCH_EMPLOYEE_REQUEST, fetchEmployeeSaga);
    yield takeLatest(SAVE_EMPLOYEE_REQUEST, saveEmployeeSaga);
}
