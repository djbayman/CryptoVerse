import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import millify from "millify";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCrypto, selectAllStats } from "../services/cryptoSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCrypto("coins"));
  }, []);

  const globalStats = useSelector(selectAllStats);

  return (
    globalStats && (
      <div
        className="container px-3 "
        style={{ minHeight: "calc(100vh - 72px)" }}
      >
        <h1 className="text-xl mb-8 pt-6 font-bold">Global Crypto Stats</h1>
        <div className="">
          <div className="stats grid grid-cols-2 gap-4">
            <div className="">
              <p className="text-gray-500 text-md mb-2">
                Total Cryptocurrencies
              </p>
              <span className="text-md font-semibold ps-2">
                {globalStats[0]?.total}
              </span>
            </div>
            <div className="">
              <p className="text-gray-500 text-md mb-2">Total Exchanges</p>
              <span className="text-md font-semibold ps-2">
                {millify(globalStats[0]?.totalExchanges)}
              </span>
            </div>
            <div className="">
              <p className="text-gray-500 text-md mb-2">Total Market Cap:</p>
              <span className="text-md font-semibold ps-2">{`$${millify(
                globalStats[0]?.totalMarketCap
              )}`}</span>
            </div>
            <div className="">
              <p className="text-gray-500 text-md mb-2">
                Total Cryptocurrencies
              </p>
              <span className="text-md font-semibold ps-2">{`$${millify(
                globalStats[0]?.total24hVolume
              )}`}</span>
            </div>
            <div className="">
              <p className="text-gray-500 text-md mb-2">Total Markets</p>
              <span className="text-md font-semibold ps-2">
                {globalStats[0]?.total}
              </span>
            </div>
            <div className="">
              <p className="text-gray-500 text-md mb-2">Total Markets</p>
              <span className="text-md font-semibold ps-2">
                {millify(globalStats[0]?.totalMarkets)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl mb-9 pt-9 font-bold">Top 10 CryptoCurrency</h1>
          <Link to="/Cryptocurrencies">
            <h3 className="text-blue-500  font-semibold">Show More</h3>
          </Link>
        </div>
        <Cryptocurrencies />
        <div className="flex items-center justify-between">
          <h1 className="text-xl mb-9 pt-9 font-bold">Latest Crypto News</h1>
          <Link to="/news">
            <h3 className="text-blue-500  font-semibold">Show More</h3>
          </Link>
        </div>
        <News />
      </div>
    )
  );
};

export default Home;
