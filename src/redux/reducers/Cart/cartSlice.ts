import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartApi from 'api/cartApi';
import { message } from 'antd';
import { useHistory } from 'react-router';

const createCustomer = createAsyncThunk(
    'cart/create',
    async (cartCreateModel: any) => {
        try {
            const response = await cartApi.create(cartCreateModel.customerId, cartCreateModel.shopId);
            if (response.isSuccess) {
                message.success('Đăng ký thành công!');
            } else {
                message.error(response.errorMessage);
            }
            return response;
        } catch (error: any) {
            message.error(error.message);
            return null;
        }
    }
);



const customerSlice = createSlice({
    name: 'cart',
    initialState: {
        customerId: undefined as any,
        customer: new CustomerModel(JSON.parse(localStorage.getItem('userData') || '{}'))
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createCustomer.fulfilled, (state, action) => {

            })
    },
})

const { actions, reducer } = customerSlice;
// const { customerLogOut } = actions;
// export {createCustomer, login, customerLogOut};
export default reducer
