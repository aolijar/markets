import styles from "../styles/FilterBar.module.css";

import { useState, useEffect } from "react";

const FilterBar = ({ handleFilter }) => {
  const [location, setLocation] = useState("");
  const [productType, setProductType] = useState("");
  const [search, setSearch] = useState("");
  const [amountSearch, setAmountSearch] = useState("");
  const [sort, setSort] = useState("none");

  useEffect(() => {
    var obj = {
      location: location,
      productType: productType,
      search: search,
      amountSearch: amountSearch,
      sort: sort,
    };

    handleFilter(obj);
  }, [location, productType, search, amountSearch, sort]);

  return (
    <div className={styles.container}>
      <h2>Filter</h2>
      <form className={styles.form}>
        <div>
          <label>City (200 Mile Radius)</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Of California</option>
            <option value="San Diego">San Diego</option>
            <option value="Fresno">Fresno</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Sacramento">Sacramento</option>
            <option value="Redding">Redding</option>
          </select>
        </div>
        <div>
          <label>Product Type</label>
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
          >
            <option value="">All</option>
            <option value="Flower">Flower</option>
            <option value="Vape">Vape</option>
            <option value="Extract">Extract</option>
            <option value="Edible">Edible</option>
            <option value="Pre-roll">Pre-roll</option>
          </select>
        </div>
        <div>
          <label>Search Product</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <label>Amount In g/mg</label>
          <input
            value={amountSearch}
            onChange={(e) => setAmountSearch(e.target.value)}
            type="text"
          />
        </div>
        <div className={styles.radioBtns}>
          <label>Sort By Price</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="none">None</option>
            <option value="high">High</option>
            <option value="low">Low</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default FilterBar;
