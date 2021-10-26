import userReducer from '../redux/reducers/Auth/userSlice';
import shopReducer from '../redux/reducers/Shop/shopSlice';

import {combineReducers} from "redux";
const { configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
        userReducer,
        shopReducer
    });

const store = configureStore({
    reducer: rootReducer,
})

export default store
export type RootState = ReturnType<typeof rootReducer>
