import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export const fetchCrypto = createAsyncThunk(
  "crypto/fetchCrypto",
  async (param) => {
    await fetch(`https://coinranking1.p.rapidapi.com/${param}`, {
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_CURRENCIES_KEY,
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    }).then((res) => res.json());
  }
);

export const fetchHistoryCoin = createAsyncThunk(
  "crypto/fetchHistoryCoin",
  async (coinId, timeperiod) => {
    return await fetch(
      `https://coinranking1.p.rapidapi.com/coin/${coinId}/history?timeperiod=${timeperiod}`,
      {
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_HISTORY_KEY,
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      }
    ).then((res) => res.json());
  }
);

export const fetchNews = createAsyncThunk("crypto/fetchNews", async () => {
  return await fetch(`https://news67.p.rapidapi.com/v2/crypto`, {
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_NEWS_KEY,
      "X-RapidAPI-Host": "news67.p.rapidapi.com",
    },
  });
});

const cryptoAdapter = createEntityAdapter({
  selectId: (coins) => coins.uuid,
});
const statsAdapter = createEntityAdapter();
const historyAdapter = createEntityAdapter({
  selectId: (coin) => coin.id,
});
const newsAdapter = createEntityAdapter({
  selectId: (newsId) => newsId.id,
});

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: cryptoAdapter.getInitialState({
    loading: false,
    stats: statsAdapter.getInitialState(),
    history: historyAdapter.getInitialState(),
    news: newsAdapter.getInitialState(),
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCrypto.fulfilled, (state, { payload }) => {
        state.loading = false;
        payload.data.stats.id = 1;
        let statsResult = [payload.data.stats];
        // console.log(statsResult);
        statsAdapter.setAll(state.stats, statsResult);
        cryptoAdapter.setAll(state, payload.data.coins);
      })
      .addCase(fetchHistoryCoin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHistoryCoin.fulfilled, (state, { payload }) => {
        state.loading = false;
        // const historyId = uuid();
        payload.data.history.map((item) => {
          item.id = uuid();
          return item;
        });
        historyAdapter.setAll(state.history, payload.data.history);
      })
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, { payload }) => {
        console.log(payload.news);
        state.loading = false;
        payload.news.map((item) => {
          item.id = uuid();
          return item;
        });
        newsAdapter.setAll(state.news, payload.news);
      });
  },
});

export const { selectAll: selectAllCrypto, selectById: selectCryptoById } =
  cryptoAdapter.getSelectors((state) => state.crypto);

export const { selectAll: selectAllStats } = statsAdapter.getSelectors(
  (state) => state.crypto.stats
);
export const { selectAll: selectAllHistory } = historyAdapter.getSelectors(
  (state) => state.crypto.history
);
export const { selectAll: selectAllNews } = newsAdapter.getSelectors(
  (state) => state.crypto.news
);

export default cryptoSlice.reducer;
