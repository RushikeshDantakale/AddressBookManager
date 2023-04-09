import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./createSlice";

const store = configureStore({
  reducer: {
    rootReducer,
  },
});

export default store;
