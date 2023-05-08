import Head from "next/head";

import styles from "@/styles/Home.module.css";

import FilterBar from "@/components/FilterBar";
import OverAllStats from "@/components/OverallStats";
import MainContainer from "@/components/MainContainer";

import { useEffect, useState } from "react";

import AllData from "../pages/api/product-array-files/AllFiles.json";

export default function Home() {
  const [filteredData, setFilteredData] = useState(AllData);
  const [filterCheck, setFilter] = useState({
    location: "",
    productType: "",
    searchCompany: "",
    searchProduct: "",
    searchGrams: "",
    sortSort: "",
    salesSort: "",
  });
  // FILTER FUNCTIONS
  const handleFilterSelect = async (data, vals) => {
    setFilter({
      ...filterCheck,
      location: vals.location,
      productType: vals.productType,
    });

    if (vals.location === "" && vals.productType === "") {
      return data;
    }

    var filtered = await data.filter((item) => {
      for (const key in vals) {
        if (vals[key] === "") {
          continue;
        }
        if (item[key] != vals[key]) {
          return false;
        }
      }
      return true;
    });
    // SET
    return filtered;
  };
  const handleFilterSearch = async (data, vals) => {
    if (
      vals.searchCompany === "" &&
      vals.searchProduct === "" &&
      vals.searchGrams === ""
    ) {
      return data;
    }
    var searched = await data.filter((item) => {
      if (vals.searchCompany != filterCheck.searchCompany) {
        // console.log("company");
        return (
          item.productCompany
            .toLowerCase()
            .search(vals.searchCompany.toLowerCase()) > -1
        );
      } else if (vals.searchProduct != filterCheck.searchProduct) {
        // console.log("product");
        return (
          item.productName
            .toLowerCase()
            .search(vals.searchProduct.toLowerCase()) > -1
        );
      } else if (vals.searchGrams != filterCheck.searchGrams) {
        // console.log("grams");
        return (
          vals.searchGrams.toLowerCase() ==
          item.productGrams.slice(0, vals.searchGrams.length).toLowerCase()
        );
      }
    });
    // SET
    // THIS IS AT THE BOTTOM BECAUSE OF CHECKS IN FILTER FUNCTION
    setFilter({
      ...filterCheck,
      searchCompany: vals.searchCompany,
      searchProduct: vals.searchProduct,
      searchGrams: vals.searchGrams,
    });
    return searched;
  };
  const handleFilterSort = async (data, vals) => {
    setFilter({
      ...filterCheck,
      priceSort: vals.priceSort,
      salesSort: vals.salesSort,
    });
    if (vals.priceSort === "" && vals.salesSort === "") {
      return data;
    }

    var sorted = data;

    if (vals.salesSort === "yes") {
      sorted = await sorted.filter((d) => {
        if (d.anyOnSale === true) {
          return d;
        }
      });
    } else if (vals.salesSort === "no") {
      sorted = await sorted.filter((d) => {
        if (d.anyOnSale === null) {
          return d;
        }
      });
    }

    if (vals.priceSort === "low") {
      sorted = await sorted.sort((a, b) => {
        return a.averagePrice - b.averagePrice;
      });
    } else if (vals.priceSort === "high") {
      sorted = await sorted.sort((a, b) => {
        return b.averagePrice - a.averagePrice;
      });
    } else if (vals.priceSort === "") {
      return sorted;
    }

    // SET
    return sorted;
  };

  const handleAllFilters = async (valsOne, valsTwo, valsThree) => {
    console.log(valsOne, valsTwo, valsThree);
    const oneData = await handleFilterSelect(AllData, valsOne);
    const twoData = await handleFilterSearch(oneData, valsTwo);
    const threeData = await handleFilterSort(twoData, valsThree);
    setFilteredData(threeData);
  };
  return (
    <>
      <Head>
        <title>California Markets</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.stickyContainer}>
          <FilterBar handleAllFilters={handleAllFilters} />
          <OverAllStats data={filteredData} filter={filterCheck} />
        </div>
        <MainContainer data={filteredData} />
      </main>
    </>
  );
}
