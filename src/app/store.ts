import shopReducer from '../redux/reducers/Shop/shopSlice';
import homeReducer from '../redux/reducers/Home/homeSlice';
import {combineReducers} from "redux";
import customerSlice from 'redux/reducers/Customer/customerSlice';

const { configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
        shopReducer,
        homeReducer,
        customerSlice
    });

const store = configureStore({
    reducer: rootReducer,
})

export default store
export type RootState = ReturnType<typeof rootReducer>
