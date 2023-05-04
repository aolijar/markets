import { useState, useEffect } from "react";
import styles from "../styles/OverAllStats.module.css";

const OverAllStats = ({ filter, data }) => {
  const [average, setAverage] = useState(0);
  const [sale, salePrice] = useState(0);
  //   const [average, setAverage] = useState(0);

  useEffect(() => {
    if (data.length <= 0) return;
    var arr = [];
    var idx = 0;
    data.map((x) => {
      if (Number(x.averagePrice) === 0) {
        idx++;
        return;
      }

      arr.push(Number(x.averagePrice));
    });
    setAverage(arr.reduce((a, b) => a + b / (data.length - idx)));
  }, [data]);
  return (
    <div className={styles.container}>
      <p>
        Product Location:{" "}
        {filter.location === "" ? "All California" : filter.location}
      </p>
      <p>
        Product Type:{" "}
        {filter.productType === "" ? "All Products" : filter.productType}
      </p>
      <p>Average Price: ${average.toFixed(2)}</p>
      <p>Total Items: {data.length}</p>
      <p></p>
    </div>
  );
};

export default OverAllStats;
