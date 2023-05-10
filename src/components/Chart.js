import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import styles from "../styles/Chart.module.css";

const Chart = ({ data }) => {
  const [chartInfo, setChartInfo] = useState("Product Type");
  const [arr, setArr] = useState([]);
  useEffect(() => {
    var chartDataArr = [];
    if (chartInfo === "Product Type") {
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
      chartDataArr.push(flower, vape, extract, edible, preRoll);
      setArr(chartDataArr);
    } else if (chartInfo === "Company (Top 10)") {
      console.log("company");
      if (chartDataArr.length <= 0) {
        var obj = {
          name: data[0].productCompany,
          y: 1,
        };
        chartDataArr.push(obj);
      }
      for (var i = 1; i < data.length; i++) {
        var existsCheck = false;
        for (let j = 0; j < chartDataArr.length; j++) {
          if (data[i].productCompany === chartDataArr[j].name) {
            chartDataArr[j].y += 1;
            existsCheck = true;
            break;
          }
        }
        if (existsCheck === false) {
          var obj = {
            name: data[i].productCompany,
            y: 1,
          };
          chartDataArr.push(obj);
        }
      }
      setArr(chartDataArr.sort((a, b) => b.y - a.y).slice(0, 10));
    }
  }, [data, chartInfo]);
  const options = {
    chart: {
      backgroundColor: "none",
      type: "pie",
    },
    title: {
      text: `Market Share By ${chartInfo}`,
    },

    series: [
      {
        name: "Products",
        data: arr,
      },
    ],
  };
  return (
    <div className={styles.container}>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <div>
        <form onChange={(e) => setChartInfo(e.target.value)}>
          <label>
            <u>Select Chart Data</u>
          </label>
          <select>
            <option value="Product Type">Product Type</option>
            <option value="Company (Top 10)">Company</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default Chart;
