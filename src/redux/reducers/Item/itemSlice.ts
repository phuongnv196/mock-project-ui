import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import itemApi from 'api/itemApi';
import { ItemCreateModel } from 'models/item-create.model';
import { Item } from 'models/item.model';


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
        itemId: '',
        item: new Item({})
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(createItem.fulfilled, (state, action) => {
            if (action.payload && action.payload.itemId) {
              state.itemId = action.payload.itemId;
              state.item = action.payload;
            }
        })
      },
})

const { actions, reducer } = itemSlice;
export {createItem};
export default reducer
