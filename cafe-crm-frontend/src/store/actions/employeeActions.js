export const FETCH_EMPLOYEE_REQUEST = 'FETCH_EMPLOYEE_REQUEST';
export const FETCH_EMPLOYEE_SUCCESS = 'FETCH_EMPLOYEE_SUCCESS';
export const FETCH_EMPLOYEE_FAILURE = 'FETCH_EMPLOYEE_FAILURE';
export const SAVE_EMPLOYEE_REQUEST = 'SAVE_EMPLOYEE_REQUEST';
export const SAVE_EMPLOYEE_SUCCESS = 'SAVE_EMPLOYEE_SUCCESS';
export const SAVE_EMPLOYEE_FAILURE = 'SAVE_EMPLOYEE_FAILURE';
export const DELETE_EMPLOYEE_REQUEST = 'DELETE_EMPLOYEE_REQUEST';
export const DELETE_EMPLOYEE_SUCCESS = 'DELETE_EMPLOYEE_SUCCESS';
export const DELETE_EMPLOYEE_FAILURE = 'DELETE_EMPLOYEE_FAILURE';

export const fetchEmployeeRequest = (id) => ({
    type: FETCH_EMPLOYEE_REQUEST,
    payload: { id }
});

export const fetchEmployeeSuccess = (employee) => ({
    type: FETCH_EMPLOYEE_SUCCESS,
    payload: { employee }
});

export const fetchEmployeeFailure = (error) => ({
    type: FETCH_EMPLOYEE_FAILURE,
    payload: { error }
});

export const saveEmployeeRequest = (employee, id) => ({
    type: SAVE_EMPLOYEE_REQUEST,
    payload: { employee, id }
});

export const saveEmployeeSuccess = () => ({
    type: SAVE_EMPLOYEE_SUCCESS
});

export const saveEmployeeFailure = (error) => ({
    type: SAVE_EMPLOYEE_FAILURE,
    payload: { error }
});

export const deleteEmployeeRequest = (id) => ({
    type: DELETE_EMPLOYEE_REQUEST,
    payload: { id }
});

export const deleteEmployeeSuccess = () => ({
    type: DELETE_EMPLOYEE_SUCCESS
});

export const deleteEmployeeFailure = (error) => ({
    type: DELETE_EMPLOYEE_FAILURE,
    payload: { error }
});