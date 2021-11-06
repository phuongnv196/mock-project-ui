import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { ShopRegisterModel } from 'models/shop-register.model';
import { ShopModel } from 'models/shop.model';
import { Item } from 'models/item.model';
import shopApi from '../../../api/shopApi';

const getShopById = createAsyncThunk(
    'shop/getShopById',
    async (id: string) => {
        const response = await shopApi.getById(id);
        if (response) {
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
        return new ShopModel({});
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
        shop: new ShopModel({}),
        currentShop: new ShopModel(JSON.parse(localStorage.getItem('shopData') || '{}'))
    },
    reducers: {
        pushItem(state, action) {
            console.log('add Item', action.payload);
            state.shop.items.push(new Item(action.payload));
        },
        shopLogOut(state) {
            state.currentShop = new ShopModel();
            localStorage.removeItem('shopData');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getShopById.pending, (state) => {
                state.shop = new ShopModel();
            })
            .addCase(getShopById.fulfilled, (state, action) => {
                state.shop = action.payload;
            })
            .addCase(createShop.fulfilled, (state, action) => {
                if (action.payload) {
                    state.shop = action.payload;
                }
            })
            .addCase(shopLogin.pending, (state) => {
                state.currentShop = new ShopModel();
            })
            .addCase(shopLogin.fulfilled, (state, action) => {
                if (action.payload) {
                    state.currentShop = action.payload;
                }
            })
    },
})

const { actions, reducer } = shopSlice;
const { pushItem, shopLogOut } = actions;
export { getShopById, createShop, shopLogin, pushItem, shopLogOut };
export default reducer
