import { configureStore } from "@reduxjs/toolkit";
import portfolioSlice from "./portfolioSlice";

export default configureStore({
  reducer: {
    portfolio: portfolioSlice,
  },
});
