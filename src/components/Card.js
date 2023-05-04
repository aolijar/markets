import styles from "../styles/Card.module.css";
import Link from "next/link";

import DispensaryInnerCard from "./DispensaryInnerCard";

const Card = ({ data }) => {
  return (
    <Link
      target="_blank"
      href={`https://www.iheartjane.com${data.productLink}`}
    >
      <div className={styles.cardContainer}>
        <div className={styles.dataContainer}>
          <p>Location: {data.location}</p>
          <p>Product Type: {data.productType}</p>
          <p>Product: {data.productName}</p>
          <p>Average Price: ${Number(data.averagePrice).toFixed(2)}</p>
          <p>
            Amount g/mg:{" "}
            {data.productGrams === "." ? "No Data" : data.productGrams}
          </p>
          {/* <p>Product ID: {data.productID}</p> */}
        </div>

        <div className={styles.dispensaryContainer}>
          {data.dispensaries.map((d) => {
            return <DispensaryInnerCard data={d} />;
          })}
        </div>
      </div>
    </Link>
  );
};
export default Card;
