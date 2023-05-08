import styles from "../styles/MainContainer.module.css";

import Card from "./Card";

import { useState, useEffect } from "react";

const MainContainer = ({ data }) => {
  const [renderLimit, setRenderLimit] = useState(50);
  const [dataLength, setDataLength] = useState(0);
  const [renderHolder, setRenderHodler] = useState([]);

  useEffect(() => {
    // console.log(data, "maaaainin");
    handlePagination(data);
  }, [data]);

  const handlePagination = (data) => {
    var holder = [];
    var limit = renderLimit;
    console.log(data.length);
    if (data.length < renderLimit) {
      limit = data.length;
    }
    for (let i = 0; i < limit; i++) {
      holder.push(data[i]);
    }
    // console.log(holder);
    setDataLength(data.length);
    setRenderHodler(holder);
    // console.log(renderHolder);
  };

  const handleSeeMore = () => {
    setRenderLimit(renderLimit + 50);
    // console.log(renderLimit, "render limit");
  };

  return (
    <div className={styles.container}>
      {data.length <= 0 ? (
        <p className={styles.empty}>No Data</p>
      ) : (
        renderHolder.map((d) => {
          return <Card key={renderHolder.indexOf(d)} data={d} />;
        })
      )}
    </div>
  );
};

export default MainContainer;
