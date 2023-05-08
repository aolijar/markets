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
    priceSort: "",
    salesSort: "",
  });
  const [searchCheck, setSearchCheck] = useState({
    searchCompany: "",
    searchProduct: "",
    searchGrams: "",
  });
  // FILTER FUNCTIONS
  const handleFilterSelect = async (data, vals) => {
    if (vals.location === "" && vals.productType === "") {
      return data;
    }
    var filtered = await data.filter((item) => {
      if (vals.location !== "" && vals.productType === "") {
        return item.location === vals.location;
      } else if (vals.location === "" && vals.productType !== "") {
        return item.productType === vals.productType;
      } else if (vals.location !== "" && vals.productType !== "") {
        return (
          item.location === vals.location &&
          item.productType === vals.productType
        );
      }
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
    } else if (
      vals.searchCompany === searchCheck.searchCompany &&
      vals.searchProduct === searchCheck.searchProduct &&
      vals.searchGrams === searchCheck.searchGrams
    ) {
      return data;
    }
    var searched = await data.filter((item) => {
      if (vals.searchCompany != searchCheck.searchCompany) {
        // console.log("company");
        return (
          item.productCompany
            .toLowerCase()
            .search(vals.searchCompany.toLowerCase()) > -1
        );
      } else if (vals.searchProduct != searchCheck.searchProduct) {
        // console.log("product");
        return (
          item.productName
            .toLowerCase()
            .search(vals.searchProduct.toLowerCase()) > -1
        );
      } else if (vals.searchGrams != searchCheck.searchGrams) {
        // console.log("grams");
        return (
          vals.searchGrams.toLowerCase() ==
          item.productGrams.slice(0, vals.searchGrams.length).toLowerCase()
        );
      }
    });
    // SET
    setSearchCheck({
      searchCompany: vals.searchCompany,
      searchProduct: vals.searchProduct,
      searchGrams: vals.searchGrams,
    });
    // THIS IS AT THE BOTTOM BECAUSE OF CHECKS IN FILTER FUNCTION
    return searched;
  };
  const handleFilterSort = async (data, vals) => {
    if (vals.priceSort === "" && vals.salesSort === "") {
      return data;
    }

    var sorted = data;
    // SALES
    if (vals.salesSort === "yes") {
      sorted = await data.filter((d) => {
        if (d.anyOnSale === true) {
          return d;
        }
      });
    } else if (vals.salesSort === "no") {
      sorted = await data.filter((d) => {
        if (d.anyOnSale === null) {
          return d;
        }
      });
    }
    // HIGH LOWS
    if (vals.priceSort === "low") {
      sorted = await sorted.sort((a, b) => {
        return a.averagePrice - b.averagePrice;
      });
    } else if (vals.priceSort === "high") {
      sorted = await sorted.sort((a, b) => {
        return b.averagePrice - a.averagePrice;
      });
    }

    // SET
    return sorted;
  };

  const handleAllFilters = async (valsOne, valsTwo, valsThree) => {
    // console.log(valsOne, valsTwo, valsThree);
    const oneData = await handleFilterSelect(AllData, valsOne);
    // console.log(oneData, "ONE DATA");
    const twoData = await handleFilterSearch(oneData, valsTwo);
    // console.log(twoData, "TWO DATA");
    const threeData = await handleFilterSort(twoData, valsThree);
    setFilteredData(threeData);
    setFilter({
      location: valsOne.location,
      productType: valsOne.productType,
      searchCompany: valsTwo.searchCompany,
      searchProduct: valsTwo.searchProduct,
      searchGrams: valsTwo.searchGrams,
      priceSort: valsThree.priceSort,
      salesSort: valsThree.salesSort,
    });
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
