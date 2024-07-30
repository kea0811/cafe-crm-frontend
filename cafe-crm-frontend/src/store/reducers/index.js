import { combineReducers } from '@reduxjs/toolkit';
import employeeReducer from './employeeReducer';
import locationReducer from './locationReducer';
import cafeReducer from './cafeReducer';

const rootReducer = combineReducers({
  employee: employeeReducer,
  cafe: cafeReducer,
  location: locationReducer,
});

export default rootReducer;
