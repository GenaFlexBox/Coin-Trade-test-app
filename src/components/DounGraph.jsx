import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const DouGraph = ({ props }) => {
  const getLabels = props.map((item) => item.name);
  const getData = props.map((item) => item.active);
  const data = {
    labels: getLabels,
    datasets: [
      {
        data: getData,
        backgroundColor: [
          "rgba(255, 165, 0, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DouGraph;
