import { createSlice } from "@reduxjs/toolkit";

const portfolioSlice = createSlice({
  name: "Bitcoin",
  initialState: {
    portfolio: [
      {
        name: "Bitcoin",
        symbol: "BTC",
        prices: 29065.22,
        active: 2,
      },

      {
        name: "Ethereum",
        symbol: "ETH",
        prices: 1794.41,
        active: 30,
      },
    ],
  },

  reducers: {
    addActive(state, actions) {
      state.portfolio.forEach((item) =>
        item.name === actions.payload.selectValue.id
          ? (item.active = actions.payload.num += item.active)
          : (item.active = item.active)
      );
    },
    removeActive(state, actions) {
      state.portfolio.forEach((item) => {
        item.name === actions.payload.selectValue.id
          ? (item.active =
              item.active !== 0
                ? (item.active -= actions.payload.num)
                : (item.active = 0))
          : (item.active = item.active);
      });
    },
  },
});
export const { addActive, removeActive } = portfolioSlice.actions;

export default portfolioSlice.reducer;
