import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import { UserRegisterModel } from 'models/user-register.model';
import { message } from 'antd';
import { useHistory } from 'react-router';
import { CustomerModel } from 'models/customer.model';


const createCustomer = createAsyncThunk(
  'customer/register',
  async (user: UserRegisterModel) => {
    try {
      const response = await userApi.register(user);
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

const login = createAsyncThunk(
  'customer/login',
  async (phoneNumber: string) => {
    const response = await userApi.login(phoneNumber);
    if (!response.customerId) {
      message.error('Sai thông tin đăng nhập!');
    }
    localStorage.setItem('userData', JSON.stringify(response));
    return response;
  }
);

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    customerId: undefined as any,
    customer: new CustomerModel(JSON.parse(localStorage.getItem('userData') || '{}'))
  },
  reducers: {
    customerLogOut(state) {
      state.customer = new CustomerModel();
      localStorage.removeItem('userData');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCustomer.fulfilled, (state, action) => {

      })
      .addCase(login.pending, (state) => {
        state.customerId = '';
        state.customer = new CustomerModel();
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          var customer = action.payload as CustomerModel;
          state.customerId = customer.customerId;
          state.customer = customer;
        }
      })
  },
})

const { actions, reducer } = customerSlice;
const { customerLogOut } = actions;
export { createCustomer, login, customerLogOut };
export default reducer
