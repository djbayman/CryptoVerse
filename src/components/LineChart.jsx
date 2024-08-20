import Chart from "chart.js/auto";
import { useEffect } from "react";

const LineChart = ({ currentPrice, coinName, coinHistory }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.length; i++) {
    coinPrice.push(coinHistory[i]?.price);
    coinTimestamp.push(
      new Date(coinHistory[i]?.timestamp).toLocaleDateString()
    );
  }

  useEffect(() => {
    let config = {
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
    };

    let myChart = new Chart(document.getElementById("currencyChart"), config);
    return () => myChart.destroy();
  }, [coinHistory]);

  return (
    <div className="">
      <div className="text-lg font-semibold text-right w-80 ms-auto ">
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
