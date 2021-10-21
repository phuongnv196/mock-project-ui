import userReducer from '../redux/reducers/Auth/userSlice'
import {combineReducers} from "redux";
const { configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
        userReducer
    });

const store = configureStore({
    reducer: rootReducer,
})

export default store
export type RootState = ReturnType<typeof rootReducer>
