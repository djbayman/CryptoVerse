import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCrypto, selectAllCrypto } from "../services/cryptoSlice";
import CryptoExcerpt from "./CryptoExcerpt";

const Cryptocurrencies = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCrypto("coins"));
  }, []);

  const cryptoList = useSelector(selectAllCrypto);

  const [cryptos, setCryptos] = useState(cryptoList);
  const [termSearch, setTermSearch] = useState("");

  useEffect(() => {
    const filteredList = cryptoList?.filter((coin) =>
      coin.name.toLowerCase().includes(termSearch.toLowerCase())
    );
    setCryptos(filteredList);
  }, [termSearch, cryptoList]);

  if (!cryptoList) return "Loading currencies...";

  return (
    <>
      {location.pathname === "/Cryptocurrencies" ? (
        <div className="mx-4">
          <div className="w-1/3 mx-auto my-8">
            <input
              type="text"
              className="w-full  py-3 px-2  border-slate-600 border-2 rounded-md hover:outlint-none text-lg font-semibold"
              placeholder="Search For Currencies"
              onChange={(e) => setTermSearch(e.target.value)}
            />
          </div>
          <div className="grid md:grid-cols-4 gap-4 grid-cols-2">
            {cryptos?.map((currency) => (
              <Link to={`crypto/${currency.uuid}`} key={currency.uuid}>
                <CryptoExcerpt currency={currency} />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 gap-4 grid-cols-2">
          {cryptos?.slice(0, 10).map((currency) => (
            <Link to={`crypto/${currency.uuid}`} key={currency.uuid}>
              <CryptoExcerpt currency={currency} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Cryptocurrencies;
