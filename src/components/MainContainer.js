import styles from "../styles/MainContainer.module.css";

import Card from "./Card";

import { useState, useEffect } from "react";

const MainContainer = ({ data, renderLimit, sortedCheck }) => {
  const [renderHolder, setRenderHodler] = useState([]);

  useEffect(() => {
    // console.log(data, "maaaainin");
    handlePagination(data);
  }, [data, renderLimit, sortedCheck]);

  const handlePagination = (data) => {
    var holder = [];
    var limit = renderLimit;
    // console.log(data.length);
    if (data.length < renderLimit) {
      limit = data.length;
    }
    for (let i = 0; i < limit; i++) {
      holder.push(data[i]);
    }
    // console.log(holder);
    setRenderHodler(holder);
    // console.log(renderHolder);
  };

  return (
    <div className={styles.container}>
      {renderHolder.map((d) => {
        return <Card key={renderHolder.indexOf(d)} data={d} />;
      })}
    </div>
  );
};

export default MainContainer;
