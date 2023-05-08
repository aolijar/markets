import styles from "../styles/FilterBar.module.css";

import { useState, useEffect } from "react";

const FilterBar = ({ handleAllFilters }) => {
  const [selectBoxObjects, setSelectBoxObjects] = useState({
    location: "",
    productType: "",
  });
  const [sortObjects, setSortObjects] = useState({
    priceSort: "",
    salesSort: "",
  });
  const [searchObjects, setSearchObjects] = useState({
    searchCompany: "",
    searchProduct: "",
    searchGrams: "",
  });
  useEffect(() => {
    handleAllFilters(selectBoxObjects, searchObjects, sortObjects);
  }, [selectBoxObjects, searchObjects, sortObjects]);

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div>
          <div>
            <label>City (200 Mile Radius)</label>
            <select
              value={selectBoxObjects.location}
              onChange={(e) =>
                setSelectBoxObjects({
                  ...selectBoxObjects,
                  location: e.target.value,
                })
              }
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
              value={selectBoxObjects.productType}
              onChange={(e) =>
                setSelectBoxObjects({
                  ...selectBoxObjects,
                  productType: e.target.value,
                })
              }
            >
              <option value="">All</option>
              <option value="Flower">Flower</option>
              <option value="Vape">Vape</option>
              <option value="Extract">Extract</option>
              <option value="Edible">Edible</option>
              <option value="Pre-roll">Pre-roll</option>
            </select>
          </div>
          <div className={styles.radioBtns}>
            <label>Sort By Price</label>
            <select
              value={sortObjects.price}
              onChange={(e) =>
                setSortObjects({ ...sortObjects, priceSort: e.target.value })
              }
            >
              <option value="">None</option>
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div>
            <label>On Sale Items Included</label>
            <select
              value={sortObjects.sales}
              onChange={(e) =>
                setSortObjects({ ...sortObjects, salesSort: e.target.value })
              }
            >
              <option value="">Both</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <div>
          <div>
            <label>Search Company</label>
            <input
              value={searchObjects.companySearch}
              onChange={(e) =>
                setSearchObjects({
                  ...searchObjects,
                  searchCompany: e.target.value,
                })
              }
              type="text"
            />
          </div>
          <div>
            <label>Search Product</label>
            <input
              value={searchObjects.searchProduct}
              onChange={(e) =>
                setSearchObjects({
                  ...searchObjects,
                  searchProduct: e.target.value,
                })
              }
              type="text"
            />
          </div>
          <div>
            <label>Amount In g/mg</label>
            <input
              value={searchObjects.amountSearch}
              onChange={(e) =>
                setSearchObjects({
                  ...searchObjects,
                  searchGrams: e.target.value,
                })
              }
              type="text"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FilterBar;
