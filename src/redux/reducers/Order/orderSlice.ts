import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import orderApi from 'api/orderApi';

const getOrderById = createAsyncThunk(
    'order/getOrderById',
    async (orderId: any) => {
        return await orderApi.getOrderById(orderId);
    }
);

const updateStatus = createAsyncThunk(
    'order/updateStatus',
    async (updateStatus: any) => {
        const response = await orderApi.changeStatus(updateStatus.orderId, updateStatus.customerId, updateStatus.orderStatus, updateStatus.shopId);
        if (!response.isSuccess) {
            message.error(response.errorMessage);
        }
        return response;
    }
);

const cancelOrder = createAsyncThunk(
    'order/cancelOrder',
    async (updateStatus: any) => {
        const response = await orderApi.cancelOrder(updateStatus.orderId, updateStatus.customerId);
        if (!response.isSuccess) {
            message.error(response.errorMessage);
        }
        return response;
    }
);

const orderSlice = createSlice({
    name: 'cart',
    initialState: {
        order: {} as any
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.order = action.payload;
            })
            .addCase(updateStatus.fulfilled, (state, action) => {
                const oldOrderState = state.order;
                state.order = {
                    ...oldOrderState,
                    status: action.payload.newStatus
                }
            })
    },
})

const { actions, reducer } = orderSlice;
export { getOrderById, updateStatus, cancelOrder};
export default reducer
