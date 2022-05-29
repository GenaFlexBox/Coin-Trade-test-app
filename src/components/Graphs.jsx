import React from "react";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart } from "chart.js/auto";
import moment from "moment";

const Graph = ({ chartData, days }) => {
  const getDataLabel = chartData.map((item) => {
    return days !== 1
      ? moment(item[0]).format("L")
      : moment(item[0]).format("LT");
  });
  const getDataPrice = chartData.map((item) => item[1]);

  const data = {
    labels: getDataLabel,
    datasets: [
      {
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(145,174,237, 0.7)",
        borderColor: "#3773f5",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#3773f5",
        pointBackgroundColor: "#3773f5",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#3773f5",
        pointHoverBorderColor: "#3773f5",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: getDataPrice,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,

    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Line data={data} options={options} width={5} height={3} />;
};

export default Graph;
