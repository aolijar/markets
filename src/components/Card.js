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
          <p>Company: {data.productCompany}</p>
          <p>Product Type: {data.productType}</p>
          <p>Product: {data.productName}</p>
          <p>Average Price: ${Number(data.averagePrice).toFixed(2)}</p>
          <p>
            Amount g/mg:{" "}
            {data.productGrams === "." ? "No Data" : data.productGrams}
          </p>
        </div>
        <div className={styles.dispensaryContainer}>
          <h5>
            {data.dispensaries.length == 1
              ? `At ${data.dispensaries.length} Dispensary`
              : `At ${data.dispensaries.length} Dispensaries`}{" "}
          </h5>
          <div className={styles.dispensaries}>
            {data.dispensaries.map((d) => {
              return <DispensaryInnerCard data={d} />;
            })}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Card;
