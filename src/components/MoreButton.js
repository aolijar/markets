import styles from "../styles/MoreButton.module.css";

const MoreButton = ({ handlePagination }) => {
  return (
    <button onClick={handlePagination} className={styles.button}>
      Load More
    </button>
  );
};

export default MoreButton;
