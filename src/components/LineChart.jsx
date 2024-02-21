import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchHistoryCoin, selectAllHistory } from "../services/cryptoSlice";
import { useDispatch, useSelector } from "react-redux";

const LineChart = ({ currentPrice, coinName, timeperiod }) => {
  const { coinId } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState();

  console.log({ coinId, timeperiod });

  useEffect(() => {
    dispatch(fetchHistoryCoin(coinId, timeperiod)).then((res) => setData(res));
  }, [timeperiod, coinId]);

  // console.log(data);

  const coinHistory = useSelector(selectAllHistory);

  const coinPrice = [];
  const coinTimestamp = [];

  console.log({ coinPrice, coinTimestamp });

  for (let i = 0; i < coinHistory?.length; i += 1) {
    coinPrice.push(coinHistory[i]?.price);
  }
  for (let i = 0; i < coinHistory?.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory[i]?.timestamp).toLocaleDateString()
    );
  }
  let myChart = null;

  if (myChart) {
    myChart.clear();
    myChart.destroy();
    myChart = async function () {
      new Chart(document.getElementById("currencyChart"), {
        type: "line",
        data: {
          labels: coinTimestamp,
          datasets: [
            {
              label: "Price in USD",
              data: coinPrice,
            },
          ],
        },
      });
    };
    myChart();
  } else {
    myChart = async function () {
      new Chart(document.getElementById("currencyChart"), {
        type: "line",
        data: {
          labels: coinTimestamp,
          datasets: [
            {
              label: "Price in USD",
              data: coinPrice,
            },
          ],
        },
      });
    };
    myChart();
  }

  return (
    <div className="">
      <div className="text-2xl font-semibold my-4 w-80 ms-auto">
        <h1 className="">{coinName} Price Chart </h1>
        <p>
          Current {coinName} Price: $ {currentPrice}
        </p>
      </div>

      <div className="">
        <canvas
          id="currencyChart"
          width="1200"
          style={{ width: "100%" }}
        ></canvas>
      </div>
    </div>
  );
};

export default LineChart;
