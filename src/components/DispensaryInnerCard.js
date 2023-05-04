import styles from "../styles/DisInnerCard.module.css";

const DispensaryInnerCard = ({ data }) => {
  // console.log(data, "thissss");
  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainInfo}>
          <p>{data.dispensary} --- </p>{" "}
          <p className={styles.priceCont}> ${data.price}</p>{" "}
        </div>
        <div className={styles.onSaleCont}>
          {data.onSale === true && (
            <>
              <p>
                <u>On Sale - </u>
              </p>

              <p className={styles.beforeSale}>
                <u>Price Before Sale: ${data.priceBeforeSale}</u>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DispensaryInnerCard;
