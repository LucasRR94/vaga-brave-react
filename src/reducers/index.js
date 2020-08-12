import boxReducer from './boxReducer.js';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    boxes: boxReducer
});

export default allReducers;