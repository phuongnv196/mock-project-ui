import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import itemApi from 'api/itemApi';
import { ItemCreateModel } from 'models/item-create.model';

const createItem = createAsyncThunk(
    'item/create',
    async (item: ItemCreateModel) => {
      const response = await itemApi.createItem(item);
      return response;
    }
  );

const itemSlice = createSlice({
    name: 'item',
    initialState: {
        itemId: undefined,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(createItem.fulfilled, (state, action) => {
            
        })
      },
})

const { actions, reducer } = itemSlice;
export {createItem};
export default reducer
