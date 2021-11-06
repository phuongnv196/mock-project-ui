import shopReducer from '../redux/reducers/Shop/shopSlice';
import homeReducer from '../redux/reducers/Home/homeSlice';
import { combineReducers } from "redux";
import customerReducer from 'redux/reducers/Customer/customerSlice';
import itemReducer from 'redux/reducers/Item/itemSlice';

const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    shopReducer,
    homeReducer,
    customerReducer,
    itemReducer
});


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export default store
export type RootState = ReturnType<typeof rootReducer>
