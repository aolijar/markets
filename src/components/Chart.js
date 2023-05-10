import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import styles from "../styles/Chart.module.css";

const Chart = ({ data }) => {
  console.log(data);
  const [arr, setArr] = useState([]);
  useEffect(() => {
    var test = [];
    var flower = { name: "Flower", y: 0 };
    var edible = { name: "Edible", y: 0 };
    var preRoll = { name: "Pre-roll", y: 0 };
    var extract = { name: "Extract", y: 0 };
    var vape = { name: "Vape", y: 0 };
    data.map((d) => {
      switch (d.productType) {
        case "Flower":
          flower.y++;
          break;
        case "Edible":
          edible.y++;
          break;
        case "Vape":
          vape.y++;
          break;
        case "Pre-roll":
          preRoll.y++;
          break;
        case "Extract":
          extract.y++;
          break;
      }
    });
    test.push(flower, vape, extract, edible, preRoll);
    setArr(test);
    console.log(test);
  }, [data]);
  const options = {
    chart: {
      backgroundColor: "none",
    },
    title: {
      text: "Market Share",
    },
    series: [
      {
        type: "pie",
        data: arr,
      },
    ],
  };
  return (
    <div className={styles.container}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
