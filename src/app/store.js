import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "../services/cryptoSlice";

export default configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});
