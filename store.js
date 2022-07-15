import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./features/itemSlice";
import restaurantReducer from "./features/restaurantSlice";

export const store = configureStore({
  reducer: {
    item: itemReducer,
    restaurant: restaurantReducer,
  },
});
