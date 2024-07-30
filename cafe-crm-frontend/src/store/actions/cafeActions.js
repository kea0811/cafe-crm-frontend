export const FETCH_CAFE_REQUEST = 'FETCH_CAFE_REQUEST';
export const FETCH_CAFE_SUCCESS = 'FETCH_CAFE_SUCCESS';
export const FETCH_CAFE_FAILURE = 'FETCH_CAFE_FAILURE';
export const FETCH_LOCATIONS_REQUEST = 'FETCH_LOCATIONS_REQUEST';
export const FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS';
export const FETCH_LOCATIONS_FAILURE = 'FETCH_LOCATIONS_FAILURE'
export const SAVE_CAFE_REQUEST = 'SAVE_CAFE_REQUEST';
export const SAVE_CAFE_SUCCESS = 'SAVE_CAFE_SUCCESS';
export const SAVE_CAFE_FAILURE = 'SAVE_CAFE_FAILURE';
export const DELETE_ITEM_REQUEST = 'DELETE_ITEM_REQUEST';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE';
export const FETCH_CAFES_BY_LOCATION_REQUEST = 'FETCH_CAFES_BY_LOCATION_REQUEST';

export const fetchCafeRequest = (id) => ({
    type: FETCH_CAFE_REQUEST,
    payload: { id }
});

export const fetchCafeSuccess = (cafe) => ({
    type: FETCH_CAFE_SUCCESS,
    payload: { cafe }
});

export const fetchCafeFailure = (error) => ({
    type: FETCH_CAFE_FAILURE,
    payload: { error }
});

export const saveCafeRequest = (cafe, id) => ({
    type: SAVE_CAFE_REQUEST,
    payload: { cafe, id }
});

export const saveCafeSuccess = () => ({
    type: SAVE_CAFE_SUCCESS
});

export const saveCafeFailure = (error) => ({
    type: SAVE_CAFE_FAILURE,
    payload: { error }
});

export const fetchLocationsRequest = () => ({
    type: FETCH_LOCATIONS_REQUEST
});

export const fetchLocationsSuccess = (locations) => ({
    type: FETCH_LOCATIONS_SUCCESS,
    payload: locations
});

export const fetchLocationsFailure = (error) => ({
    type: FETCH_LOCATIONS_FAILURE,
    payload: error
});

export const deleteItemRequest = (id) => ({
    type: DELETE_ITEM_REQUEST,
    payload: { id }
});

export const deleteItemSuccess = () => ({
    type: DELETE_ITEM_SUCCESS
});

export const deleteItemFailure = (error) => ({
    type: DELETE_ITEM_FAILURE,
    payload: { error }
});

export const fetchCafesByLocation = (location) => ({
    type: FETCH_CAFES_BY_LOCATION_REQUEST,
    payload: location
});