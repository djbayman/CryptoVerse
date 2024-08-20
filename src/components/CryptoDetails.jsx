import { useParams } from "react-router-dom";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import millify from "millify";
import { useEffect, useState } from "react";
import LineChart from "./LineChart";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCrypto,
  fetchHistoryCoin,
  selectAllHistory,
  selectCryptoById,
} from "../services/cryptoSlice";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimePeriod] = useState("3h");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchCrypto(
        "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&orderBy=marketCap&orderDirection=desc&limit=50&offset=0"
      )
    );
    dispatch(
      fetchHistoryCoin(
        `https://coinranking1.p.rapidapi.com/coin/${coinId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timeperiod}`
      )
    );
  }, [timeperiod, coinId, dispatch]);

  const cryptoDetails = useSelector((state) => selectCryptoById(state, coinId));
  const coinHistory = useSelector(selectAllHistory);

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails?.volume && millify(cryptoDetails?.["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "Sparkline",
      value: millify(cryptoDetails?.sparkline[0]),
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Tier of",
      value: cryptoDetails?.tier,
      icon: <NumberOutlined />,
    },
    {
      title: "Listed At",
      value: cryptoDetails?.listedAt,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Number Of Markets",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.change,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <div className="px-8 bg-gray-200">
      <div className="header text-center mb-8 py-8 border-b-2 border-slate-200">
        <h1 className="text-xl text-blue-500 font-bold">
          {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
        </h1>
        <p className=" mt-4 max-w-xl mx-auto font-semibold text-gray-400">
          {cryptoDetails?.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </div>
      <select
        className="w-40 bg-white px-2 py-1 rounded-md hover:outline-none font-semibold"
        defaultValue="3h"
        placeholder="Select Timeperiod"
        onChange={(e) => setTimePeriod(e.target.value)}
      >
        {time.map((date, ind) => (
          <option key={ind} value={date}>
            {date}
          </option>
        ))}
      </select>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails?.price)}
        coinName={cryptoDetails?.name}
      />
      <div className="flex justify-between mt-8">
        <div className="oneCol w-2/5">
          <h2 className="text-xl font-semibold mb-4">
            {cryptoDetails?.name} Value Statistics
          </h2>
          <p className="text-lg text-gray-600 ">
            An overview showing the statistics of {cryptoDetails?.name}, such as
            the base and quote currency, the rank, and trading volume.
          </p>
          <ul className=" my-4">
            {stats.map(({ icon, title, value }) => (
              <li
                key={title}
                className="flex items-center text-lg py-2 border-b-2 border-slate-400"
              >
                <p className="pb-2">
                  <span className="me-2 ">{icon}</span> {title}
                </p>
                <span className="ms-auto">{value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="oneCol w-2/5">
          <h2 className="text-xl font-semibold mb-4">Other Stats Info</h2>
          <p className="text-lg text-gray-600 ">
            An overview showing the statistics of {cryptoDetails?.name}, such as
            Number of markets, Number of exchanges and more...
          </p>
          <ul className=" my-4">
            {genericStats.map(({ icon, title, value }) => (
              <li
                key={title}
                className="flex items-center text-lg py-2 border-b-2 border-slate-400"
              >
                <p className="pb-2">
                  <span className="me-2 ">{icon}</span> {title}
                </p>
                <span className="ms-auto">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
