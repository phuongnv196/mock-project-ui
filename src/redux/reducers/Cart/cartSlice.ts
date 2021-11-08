import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartApi from 'api/cartApi';
import { message } from 'antd';
import { useHistory } from 'react-router';
import { CartModel } from 'models/cart.model';

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
        cartIds: new Array<string>()
    },
    reducers: {
        pushCartId(state, action) {
            if (state.cartIds.indexOf(action.payload) == -1) {
                state.cartIds.push(action.payload);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCustomer.fulfilled, (state, action) => {

            })
    },
})

const { actions, reducer } = customerSlice;
const { pushCartId } = actions;
export { pushCartId };
export default reducer
