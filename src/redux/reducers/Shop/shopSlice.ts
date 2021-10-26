import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ShopModel } from 'models/shop.model';
import shopApi from '../../../api/shopApi';

const getAllShops = createAsyncThunk(
    'shop/getAllShops',
    async () => {
      const response = await shopApi.getAll();
      return response;
    }
  );

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

const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        shopDataList: new Array<ShopModel>(),
    },
    reducers: {
        getAllShop (state) {
            var datas = new Array<ShopModel>(); 
            shopApi.getAll().then(data => {
                datas = data;
            });
            console.log(datas);
            state.shopDataList = datas;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllShops.fulfilled, (state, action) => {
          state.shopDataList = action.payload;
        })
        .addCase(getShopById.fulfilled, (state, action) => {
            var shopDataList = state.shopDataList.map((item) => {
                var dataItem = item;
                if(item.shopId === action.payload.shopId) {
                    dataItem.items = action.payload.items;
                } else {
                    dataItem.items = dataItem.items;
                }

                return {
                    ...item,
                    items: dataItem.items
                };
            });
            console.log('shopDataList', shopDataList);
            state.shopDataList = shopDataList;
          })
      },
})

const { actions, reducer } = shopSlice;
export const { getAllShop } = actions;
export {getAllShops, getShopById};
export default reducer
