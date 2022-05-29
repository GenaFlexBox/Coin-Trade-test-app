import axios from "axios";
import React, { useState } from "react";
import MyInput from "./UI/MyInput";
import MySelect from "./UI/MySelect";

const Conventer = ({ currency }) => {
  const [selectedOne, setSelectedOne] = useState(currency[0]);
  const [selectedTwo, setSelectedTwo] = useState(currency[2]);
  const [amount, setAmount] = useState();
  const [exchange, setExchange] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${selectedOne.id}&vs_currencies=${selectedTwo.symbol}`
      );
      const exchangeData = response.data[selectedOne.id][selectedTwo.symbol];
      const result = (Math.abs(amount) * Math.abs(exchangeData)).toFixed(4);
      setExchange({
        from: selectedOne,
        to: selectedTwo,
        amount: amount,
        price: exchangeData,
        result: result,
      });
    } catch (err) {
      console.log(`Unable to fetch curriencies: ${err}`);
    }
  };

  function swapConversion() {
    setSelectedOne(selectedTwo);
    setSelectedTwo(selectedOne);
  }

  function checkObj(obj) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return obj;
  }

  return (
    <section className="pt-14 bg-white pb-14 px-6 shadow">
      <h1 className="text-black text-2xl mb-10 font-semibold">
        Курс Обмена Криптовалюты
      </h1>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col justify-center md:flex md:flex-row mb-6 gap-9 md:items-center sm:flex sm:flex-col ">
          <div className="flex-1">
            <MyInput
              type="number"
              label="Сумма"
              value={amount}
              change={setAmount}
            />
          </div>
          <div className="flex-1">
            <MySelect
              option={currency}
              selected={selectedOne}
              setSelected={setSelectedOne}
              labelSelector="Валюта"
            />
          </div>
          <div className="flex items-center justify-center">
            <div
              onClick={swapConversion}
              className="border-2 border-blue-100 rounded-full p-4 cursor-pointer hover:border-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 17"
                aria-hidden="true"
                className="w-4 h-4 text-indigo-500 miscellany___StyledIconSwap-sc-1r08bla-1 fZJuOo"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M11.726 1.273l2.387 2.394H.667V5h13.446l-2.386 2.393.94.94 4-4-4-4-.94.94zM.666 12.333l4 4 .94-.94L3.22 13h13.447v-1.333H3.22l2.386-2.394-.94-.94-4 4z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <MySelect
              option={currency}
              selected={selectedTwo}
              setSelected={setSelectedTwo}
              labelSelector="Валюта"
            />
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex md:flex-row md:justify-between mt-10 gap-5  items-center">
          <div>
            {checkObj(exchange) ? (
              <div>
                <div className="flex justify-center items-center">
                  <div
                    className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
                <p className="flex items-center text-xs font-regular text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  &nbsp; Даннай конвентер использует обменный курс от CoinGecko
                </p>
              </div>
            ) : (
              <>
                <div>
                  <div className="flex gap-1 mb-1">
                    <p className="font-semibold text-sm text-gray-500">
                      {exchange.amount} &nbsp;
                      {exchange.from.name} =
                    </p>
                  </div>
                  <div className="flex gap-1 font-normal items-baseline">
                    <p className="text-3xl font-bold">
                      {exchange.result} {exchange.to.name}
                    </p>
                  </div>
                  <div className="flex mt-4 gap-1 font-normal items-baseline">
                    <p className="font-regular text-sm text-gray-500">
                      1 &nbsp;
                      {exchange.from.name} = {exchange.price}&nbsp;
                      {exchange.to.name}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <button
            className={
              !amount
                ? "cursor-not-allowed pointer-events-none inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-md font-bold rounded-md text-white bg-gray-300"
                : "inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-md font-bold rounded-md text-white bg-green-500 hover:bg-green-600"
            }
          >
            Конверт
          </button>
        </div>
      </form>
    </section>
  );
};

export default Conventer;
