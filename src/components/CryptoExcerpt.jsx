import millify from "millify";

const CryptoExcerpt = ({ currency }) => {
  return (
    <div className="bg-white rounded-md p-3 ">
      <div className="flex items-center justify-between pb-2 mb-3 border-b-2">
        <h2 className="text-lg font-bold">
          {currency?.rank}. {currency?.name}
        </h2>
        <img
          src={currency?.iconUrl}
          alt={currency?.name}
          className="w-20 h-20"
        />
      </div>
      <p className="font-medium pb-2 ps-2">
        Price : {millify(currency?.price)}
      </p>
      <p className="font-medium pb-2 ps-2">
        MarketCap : {millify(currency?.marketCap)}
      </p>
      <p className="font-medium pb-2 ps-2">
        Change : {millify(currency?.change)}
      </p>
    </div>
  );
};

export default CryptoExcerpt;
