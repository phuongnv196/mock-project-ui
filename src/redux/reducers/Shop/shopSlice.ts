import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { ShopRegisterModel } from 'models/shop-register.model';
import { ShopModel } from 'models/shop.model';
import shopApi from '../../../api/shopApi';

const getShopById = createAsyncThunk(
'shop/getShopById',
async (id: string) => {
    const response = await shopApi.getById(id);
    if(response) {
        response.shopId = id;
    }
    return response;
}
);

const createShop = createAsyncThunk(
    'shop/createShop',
    async (shop: ShopRegisterModel) => {
        try {
            const response = await shopApi.createShop(shop);
            const shopModel = new ShopModel(shop);
            shopModel.shopId = response.shopId;
            message.success('Đăng ký thành công!');
            return shopModel;
        } catch (error: any) {
            message.error(error.message);
        }
        return {};
    }
);

const shopLogin = createAsyncThunk(
    'shop/login',
    async (phoneNumber: string) => {
        try {
            const response = await shopApi.login(phoneNumber);
            if (response.shopId) {
                message.success('Đăng nhập thành công!');
                const shop = await shopApi.getById(response.shopId);
                shop.shopId = response.shopId;
                localStorage.setItem('shopData', JSON.stringify(shop));
                return shop;
            }
        } catch (error: any) {
            message.error('Thông tin đăng nhập không đúng!');
        }
        return null;
    }
);

const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        shop: new ShopModel(JSON.parse(localStorage.getItem('shopData') || '{}')),
    },
    reducers: {
      
    },
    extraReducers: (builder) => {
        builder
        .addCase(getShopById.fulfilled, (state, action) => {
            state.shop = action.payload;
          })
        .addCase(createShop.fulfilled, (state, action) => {
            if (action.payload) {
                state.shop = action.payload;
            }
        })
        .addCase(shopLogin.fulfilled, (state, action) => {
            if (action.payload) {
                state.shop = action.payload;
            }
        })
      },
})

const { actions, reducer } = shopSlice;
export { getShopById, createShop, shopLogin};
export default reducer
