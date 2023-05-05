import { useState, useEffect } from "react";
import styles from "../styles/OverAllStats.module.css";

const OverAllStats = ({ filter, data }) => {
  const [average, setAverage] = useState(0);
  const [sale, salePrice] = useState(0);
  //   const [average, setAverage] = useState(0);

  useEffect(() => {
    // console.log(data, "data");

    if (data.length <= 0) return;
    var arr = [];
    data.map((x) => {
      arr.push(Number(x.averagePrice));
    });
    setAverage(arr.reduce((a, b) => a + b) / data.length);
  }, [data.length]);

  return (
    <div className={styles.container}>
      <p>
        Product Location: {filter.location === "" ? "All" : filter.location}
      </p>
      <p>
        Product Type: {filter.productType === "" ? "All" : filter.productType}
      </p>
      <p>Average Price: ${average.toFixed(2)}</p>
      <p>Total Items: {data.length}</p>
      <p></p>
    </div>
  );
};

export default OverAllStats;
