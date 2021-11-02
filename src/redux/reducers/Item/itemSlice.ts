import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { ItemCreateModel } from 'models/item-create.model';
import { Item } from 'models/item.model';
import itemApi from 'api/itemApi';


const createItem = createAsyncThunk(
  'item/create',
  async (item: ItemCreateModel) => {
    try{
      const response = await itemApi.createItem(item);
      const itemModel = new Item(item);
      itemModel.itemId = response.itemId;
      message.success('Tạo sản phẩm thành công!');
      return response;
    }catch(error: any){
      message.error(error.message);
    }
    return {};
  }
);

const updateItem = createAsyncThunk(
  'item/',
  async (item: ItemCreateModel) => {
    try{
      const response = await itemApi.updateItem(item);
      message.success('Chỉnh sửa sản phẩm thành công!');
      return response;
    }catch(error: any){
      message.error(error.message);
    }
  }
);


const itemSlice = createSlice({
  name: 'item',
  initialState: {
    itemId: undefined as any,
    item: new Item(JSON.parse(localStorage.getItem('userData') || '{}'))
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    .addCase(createItem.fulfilled, (state, action) => {
      if (action.payload) {
        state.item = action.payload;
      }
    })
    .addCase(updateItem.fulfilled, (state, action) => {
      if (action.payload) {
        state.item = action.payload;
      }
    })
  },
})

const { actions, reducer } = itemSlice;
export {createItem, updateItem};
export default reducer
