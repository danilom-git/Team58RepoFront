import { combineReducers } from 'redux';
import clinicInfoReducer from './clinicInfoReducer';

export default combineReducers({
    clinicInfo: clinicInfoReducer
});