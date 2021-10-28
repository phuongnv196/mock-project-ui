import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import { UserRegisterModel } from 'models/user-register.model';

const createCustomer = createAsyncThunk(
    'customer/register',
    async (user: UserRegisterModel) => {
      const response = await userApi.register(user);
      return response;
    }
  );

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        customerId: undefined,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(createCustomer.fulfilled, (state, action) => {
            
        })
      },
})

const { actions, reducer } = customerSlice;
export {createCustomer};
export default reducer
