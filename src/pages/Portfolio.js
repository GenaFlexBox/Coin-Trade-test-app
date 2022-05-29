import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addActive, removeActive } from "../store/portfolioSlice";
import MyModal from "../components/UI/MyModal";
import MyInput from "../components/UI/MyInput";
import MySelect from "../components/UI/MySelect";
import MyButton from "../components/UI/MyButton";
import DouGraph from "../components/DounGraph";

const headTable = [
  { name: "Монета" },
  { name: "" },
  { name: "Цена" },
  { name: "Активы" },
];

const currency = [
  {
    id: "Bitcoin",
    name: "Bitcoin(BTC)",
    symbol: "btc",
  },
  {
    id: "Ethereum",
    name: "Ethereum(ETH)",
    symbol: "eth",
  },
];

const Portfolio = () => {
  const [value, setValue] = useState("");
  const [total, setTotal] = useState();
  const [selectValue, setSelectValue] = useState(currency[0]);
  const [showBuy, setShowBuy] = useState(false);
  const [showSell, setShowSell] = useState(false);
  const portfolio = useSelector((state) => state.portfolio.portfolio);

  const dispatch = useDispatch();

  const addActives = (e) => {
    e.preventDefault();
    const num = Math.abs(Number(value));
    dispatch(addActive({ num, selectValue }));
    setShowBuy(false);
  };

  const decrementActives = (e) => {
    e.preventDefault();
    setShowSell(false);
    const num = Math.abs(Number(value));
    dispatch(removeActive({ num, selectValue }));
  };

  useEffect(() => {
    const totalPrice = () => {
      const prices = portfolio.map((item) => item.prices * item.active);
      const getTottal = prices.reduce(
        (previousValue, currentValue) => previousValue + currentValue
      );
      setTotal(getTottal);
    };
    totalPrice();
  }, [portfolio]);

  return (
    <div className="max-w-5xl m-auto py-6 px-6 flex gap-8 flex-col">
      <h2 className="text-3xl font-medium mb-2">Мой Портфель</h2>
      <div className="bg-white py-6 px-6 shadow-xl w-max sm:rounded-lg">
        <div className="text-2xl mb-2">{total} $</div>
        <div className="text-sm">Текущий баланс</div>
      </div>
      <div className="bg-white py-6 px-6 shadow-xl sm:rounded-lg flex justify-center items-center flex-col">
        <div>Текущее распределение криптовалют</div>
        <div className=" w-[350px]">
          <DouGraph props={portfolio} />
        </div>
      </div>
      <div>
        <div className="bg-white p-7 relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => setShowBuy(true)}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-1 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Купить
            </button>
            <button
              onClick={() => setShowSell(true)}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-1 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Продать
            </button>
          </div>

          <table className="w-full text-sm text-left text-black">
            <thead className="text-xs text-black uppercase bg-gray-200">
              <tr>
                {headTable.map((item) => (
                  <th key={item.name} scope="col" className="px-6 py-3">
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {portfolio.map((item) => (
                <tr key={item.name} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.symbol}</td>
                  <td className="px-6 py-4">{item.prices} $</td>
                  <td className="px-6 py-4">
                    {item.prices * item.active + " $"}
                    <br />
                    {item.active + ` (${item.symbol})`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <MyModal
            visible={showBuy}
            setVisible={setShowBuy}
            styles="bg-opacity-50 bg-black fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center"
          >
            <form className="flex flex-col gap-4 justify-center">
              <div>
                <MySelect
                  option={currency}
                  selected={selectValue}
                  setSelected={setSelectValue}
                  labelSelector="Валюта"
                />
              </div>
              <div>
                <MyInput
                  type="number"
                  label="Кол-во"
                  value={value}
                  change={setValue}
                />
              </div>
              <MyButton
                onClick={addActives}
                styles="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-1 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Купить
              </MyButton>
            </form>
          </MyModal>
          <MyModal
            visible={showSell}
            setVisible={setShowSell}
            styles="bg-opacity-50 bg-black fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center"
          >
            <form className="flex flex-col gap-4 justify-center">
              <div>
                <MySelect
                  option={currency}
                  selected={selectValue}
                  setSelected={setSelectValue}
                  labelSelector="Валюта"
                />
              </div>
              <div>
                <MyInput
                  type="number"
                  label="Кол-во"
                  value={value}
                  change={setValue}
                />
              </div>
              <MyButton
                onClick={decrementActives}
                styles="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-1 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Продать
              </MyButton>
            </form>
          </MyModal>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
