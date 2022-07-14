import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    increaseItemCount: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    decreaseItemCount: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let newCart = [...state.items];

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Cant remove item (id: ${action.payload.id}) from cart as it is not in the cart!`
        );
      }

      state.items = newCart;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increaseItemCount, decreaseItemCount } = itemSlice.actions;

// Selectors
export const selectItems = (state) => state.item.items;

export const selectItemsWithId = (state, id) =>
  state.item.items.filter((object) => object.id === id);

export const selectItemsTotal = (state) =>
  state.item.items.reduce((total, item) => (total += item.price), 0);

export default itemSlice.reducer;
