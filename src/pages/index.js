import Head from "next/head";

import styles from "@/styles/Home.module.css";

import FilterBar from "@/components/FilterBar";
import OverAllStats from "@/components/OverallStats";
import MainContainer from "@/components/MainContainer";

import { useEffect, useState } from "react";

import AllData from "../pages/api/product-array-files/AllFiles.json";
import MoreButton from "@/components/MoreButton";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [filteredData, setFilteredData] = useState(AllData);
  const [sortedCheck, setSortedCheck] = useState(false);
  const [filterCheck, setFilter] = useState({
    location: "",
    productType: "",
    searchCompany: "",
    searchProduct: "",
    searchGrams: "",
    priceSort: "",
    salesSort: "",
  });
  const [renderLimit, setRenderLimit] = useState(50);
  // SEE MORE BUTTIN FUNCTION
  const handlePagination = () => {
    setRenderLimit(renderLimit + 50);
  };
  // HANDLE PASSWORD

  const handlePassword = (e) => {
    e.preventDefault();
    console.log(password);
  };

  //HANDLE LOADING
  const handleLoading = () => {
    console.log(loading);
    setLoading(!loading);
  };
  useEffect(() => {
    setLoading(false);
  }, []);
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
      } else {
        return (
          item.location === vals.location &&
          item.productType === vals.productType
        );
      }
    });
    // BETTER WEAY TO LOOP OVER KEYS AND SUCH
    // for (var key in vals) {
    //   console.log(item[key], vals[key]);
    //   if (vals[key] === "") continue;
    //   if (item[key].toLowerCase().search(vals[key].toLowerCase()))
    //     return true;
    // }
    // return false;
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
    var searched = data;
    if (vals.searchCompany != "") {
      // console.log("company");
      searched = await searched.filter((item) => {
        return (
          item.productCompany
            .toLowerCase()
            .search(vals.searchCompany.toLowerCase()) > -1
        );
      });
    }
    if (vals.searchProduct != "") {
      searched = await searched.filter((item) => {
        // console.log("product");
        return (
          item.productName
            .toLowerCase()
            .search(vals.searchProduct.toLowerCase()) > -1
        );
      });
    }
    if (vals.searchGrams != "") {
      searched = await searched.filter((item) => {
        // console.log("grams");
        return (
          vals.searchGrams.toLowerCase() ==
          item.productGrams.slice(0, vals.searchGrams.length).toLowerCase()
        );
      });
    }
    // THIS IS AT THE BOTTOM BECAUSE OF CHECKS IN FILTER FUNCTION
    return searched;
  };
  const handleFilterSort = async (data, vals) => {
    if (vals.priceSort === "" && vals.salesSort === "") {
      setSortedCheck(!sortedCheck);
      console.log(vals.priceSort);
      // HIGH LOWS
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
    } // HIGH LOWS
    else if (vals.priceSort === "low") {
      sorted = await sorted.sort((a, b) => {
        return a.averagePrice - b.averagePrice;
      });
      setSortedCheck(!sortedCheck);
    } else if (vals.priceSort === "high") {
      sorted = await sorted.sort((a, b) => {
        return b.averagePrice - a.averagePrice;
      });
      setSortedCheck(!sortedCheck);
    } else if (vals.priceSort === "") {
      setSortedCheck(!sortedCheck);
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
        {password !== "aeroponic123" ? (
          <div className={styles.password}>
            <form onSubmit={(e) => handlePassword(e)}>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
              />
              <input type="submit" />
            </form>
          </div>
        ) : (
          <>
            <div className={styles.stickyContainer}>
              <FilterBar handleAllFilters={handleAllFilters} />
              <OverAllStats data={filteredData} filter={filterCheck} />
            </div>
            {loading ? (
              <p className={styles.empty}>Loading</p>
            ) : (
              <>
                {filteredData.length <= 0 ? (
                  <p className={styles.empty}>No Data</p>
                ) : (
                  <>
                    <MainContainer
                      handleLoading={handleLoading}
                      sortedCheck={sortedCheck}
                      renderLimit={renderLimit}
                      data={filteredData}
                    />
                    {filteredData.length > renderLimit && (
                      <MoreButton handlePagination={handlePagination} />
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}
