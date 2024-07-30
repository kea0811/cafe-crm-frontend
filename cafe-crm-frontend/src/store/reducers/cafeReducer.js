import * as actions from '../actions/cafeActions';

const initialState = {
    cafe: null,
    loading: false,
    error: null
};

const cafeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_CAFE_REQUEST:
          return { ...state, loading: true, error: null };
        case actions.FETCH_CAFE_SUCCESS:
          return { ...state, loading: false, cafe: action.payload.cafe };
        case actions.FETCH_CAFE_FAILURE:
          return { ...state, loading: false, error: action.payload.error };
        case actions.SAVE_CAFE_REQUEST:
            return { ...state, loading: true, error: null };
        case actions.SAVE_CAFE_SUCCESS:
            return { ...state, loading: false };
        case actions.SAVE_CAFE_FAILURE:
            return { ...state, loading: false, error: action.payload.error };
        default:
            return state;
    }
};

export default cafeReducer;
