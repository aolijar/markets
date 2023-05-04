import styles from "../styles/MainContainer.module.css";

import Card from "./Card";

import { useState } from "react";

const MainContainer = ({ data }) => {
  return (
    <div className={styles.container}>
      {data.map((stuff) => {
        return (
          <Card
            key={stuff.productID + Math.random() * 10.123457}
            data={stuff}
          />
        );
      })}
    </div>
  );
};

export default MainContainer;
