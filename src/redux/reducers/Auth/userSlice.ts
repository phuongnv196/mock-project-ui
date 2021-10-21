import { createSlice } from '@reduxjs/toolkit';
import userApi from '../../../api/userApi';
import StorageKeys from '../../../constants/storage-keys';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem(StorageKeys.user) || '{}'),
        settings: {},
    },
    reducers: {
        signIn(state, action) {
            userApi.login(action).then(data => {
                console.log(data);
            });
        },
        signUpUser(state, action) {
            userApi.register(action.payload).then(data => {
                console.log(data);
            }).catch(error => {
                console.log(error);
            })
        },
    },
})

const { actions, reducer } = userSlice
export const { signUpUser, signIn } = actions
export default reducer
