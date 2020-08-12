import {createStore, applyMiddleware} from 'redux' ;
import thunk from 'redux-thunk';
import allReducers from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    allReducers,
    initialState,
    applyMiddleware(...middleware));

export default store


