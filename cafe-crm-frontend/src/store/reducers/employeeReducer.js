import * as actions from '../actions/employeeActions';

const initialState = {
    employee: null,
    loading: false,
    error: null
};

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_EMPLOYEE_REQUEST:
            return { ...state, loading: true, error: null };
        case actions.FETCH_EMPLOYEE_SUCCESS:
            return { ...state, loading: false, employee: action.payload.employee };
        case actions.FETCH_EMPLOYEE_FAILURE:
            return { ...state, loading: false, error: action.payload.error };
        case actions.SAVE_EMPLOYEE_REQUEST:
            return { ...state, loading: true, error: null };
        case actions.SAVE_EMPLOYEE_SUCCESS:
            return { ...state, loading: false };
        case actions.SAVE_EMPLOYEE_FAILURE:
            return { ...state, loading: false, error: action.payload.error };
        default:
            return state;
    }
};

export default employeeReducer;
