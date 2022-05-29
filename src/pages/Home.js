import { useEffect, useState } from "react";
import Conventer from "../components/Conventer";
import Graph from "../components/Graphs";
import MyButton from "../components/UI/MyButton";
import MySelect from "../components/UI/MySelect";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";

const chartDays = [
  {
    label: "24 H",
    value: 1,
  },
  {
    label: "7 D",
    value: 7,
  },
  {
    label: "14 D",
    value: 14,
  },
  {
    label: "30 D",
    value: 30,
  },
];

const currency = [
  {
    id: "bitcoin",
    name: "Bitcoin(BTC)",
    symbol: "btc",
    avatar: "",
  },
  {
    id: "ethereum",
    name: "Ethereum(ETH)",
    symbol: "eth",
    avatar: "",
  },
  {
    id: "usd",
    name: "US Dollar(USD) ",
    symbol: "usd",
    avatar: "",
  },
];

const pair = [
  { id: "BTC/USD", name: "BTC/USD", from: "bitcoin", to: "usd" },
  { id: "ETH/USD", name: "ETH/USD", from: "ethereum", to: "usd" },
  { id: "BTC/ETH", name: "BTC/ETH", from: "bitcoin", to: "eth" },
  { id: "ETH/BTC", name: "ETH/BTC", from: "ethereum", to: "btc" },
];

export default function Home() {
  const [days, setDays] = useState(1);
  const [active, setActive] = useState(1);
  const [chart, setChart] = useState([]);
  const [pairValue, setPairValue] = useState(pair[0]);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    async function fetchChart() {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${
          pairValue.from
        }/market_chart?vs_currency=${pairValue.to}&days=${days}&interval=${
          days === 1 ? "hours" : "daily"
        }`
      );
      const data = await response.data.prices;
      setChart(data);
      setIsLoad(false);
    }

    fetchChart();
  }, [days, pairValue]);

  return (
    <>
      <div className="max-w-5xl m-auto py-6 px-6">
        <div className="mb-10">
          <Conventer currency={currency} />
        </div>
        <div className="flex flex-col bg-white py-6 px-6 shadow-xl">
          <div className="flex flex-col justify-center items-center md:flex md:flex-row  md:justify-between">
            <div>
              {chartDays.map((day) => (
                <MyButton
                  onClick={() => {
                    setDays(day.value);
                    setActive(day.value);
                  }}
                  key={day.value}
                  selected={day.value === days}
                  type="button"
                  styles={
                    active === day.value
                      ? "md:text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-xs md:px-5 md:py-2.5 px-4 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      : "md:text-sm text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:px-5 md:py-2.5 px-4 py-2 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                  }
                >
                  {day.label}
                </MyButton>
              ))}
            </div>

            <div>
              <MySelect
                option={pair}
                selected={pairValue}
                setSelected={setPairValue}
              />
            </div>
          </div>
          {isLoad ? (
            <div className="flex justify-center items-center h-50">
              <ScaleLoader color="#3773f5" size={50} />
            </div>
          ) : (
            <div>
              <Graph chartData={chart} days={days} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
