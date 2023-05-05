import Head from "next/head";

import styles from "@/styles/Home.module.css";

import FilterBar from "@/components/FilterBar";
import OverAllStats from "@/components/OverallStats";
import MainContainer from "@/components/MainContainer";

import { useEffect, useState } from "react";

import AllData from "../pages/api/product-array-files/AllFilesNew.json";

export default function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({
    location: "",
    productType: "",
    search: "",
  });

  // SET AT LOAD
  useEffect(() => {
    setData(AllData);
    setFilteredData(AllData);
  }, []);

  const handleFilter = async (vals) => {
    setFilter(vals);
    // console.log(vals.search);
    // var arr = [];

    // // AllData.map((d) => {
    // //   // console.log(d.productName.search(`/${vals.search}/gi`));
    // //   if (d.productName.toLowerCase().search(vals.search) > -1) {
    // //     arr.push(d);
    // //   }
    // // });
    // console.log(arr, "THIS");

    if (vals.sort === "low") {
      data.sort(
        (a, b) => parseFloat(a.averagePrice) - parseFloat(b.averagePrice)
      );
    } else if (vals.sort === "high") {
      data.sort(
        (a, b) => parseFloat(b.averagePrice) - parseFloat(a.averagePrice)
      );
    }

    // BLANK
    if (
      vals.productType == "" &&
      vals.location == "" &&
      vals.search == "" &&
      vals.amountSearch == ""
    ) {
      setFilteredData(data);
      return;
    }
    // JUST SEARCH
    if (
      vals.location == "" &&
      vals.productType == "" &&
      vals.amountSearch == ""
    ) {
      const filterData = await data.filter((d) => {
        if (
          // vals.search.toLowerCase() ==
          // d.productName.slice(0, vals.search.length).toLowerCase()
          d.productName.toLowerCase().search(vals.search.toLowerCase()) > -1
        ) {
          return d;
        }
      });
      setFilteredData(filterData);
      return;
    }
    if (vals.location == "" && vals.productType == "" && vals.search == "") {
      const filterData = await data.filter((d) => {
        if (
          vals.amountSearch.toLowerCase() ==
          d.productGrams.slice(0, vals.amountSearch.length).toLowerCase()
        ) {
          return d;
        }
      });
      setFilteredData(filterData);
      return;
    }

    // FILTER STUFF
    var filteredData = data.filter((d) => {
      if (vals.location == "") {
        if (
          d.productType == vals.productType &&
          d.productName.toLowerCase().search(vals.search.toLowerCase()) > -1 &&
          vals.amountSearch.toLowerCase() ==
            d.productGrams.slice(0, vals.amountSearch.length).toLowerCase()
        ) {
          return d;
        }
      } else if (vals.productType == "") {
        if (
          d.location == vals.location &&
          d.productName.toLowerCase().search(vals.search.toLowerCase()) > -1 &&
          vals.amountSearch.toLowerCase() ==
            d.productGrams.slice(0, vals.amountSearch.length).toLowerCase()
        ) {
          return d;
        }
      } else if (vals.search == "") {
        if (
          d.productType == vals.productType &&
          d.location == vals.location &&
          vals.amountSearch.toLowerCase() ==
            d.productGrams.slice(0, vals.amountSearch.length).toLowerCase()
        ) {
          return d;
        }
      } else if (
        d.productType == vals.productType &&
        d.location == vals.location &&
        d.productName.toLowerCase().search(vals.search.toLowerCase()) > -1 &&
        vals.amountSearch.toLowerCase() ==
          d.productGrams.slice(0, vals.amountSearch.length).toLowerCase()
      ) {
        return d;
      } else if (
        vals.search == "" &&
        vals.location == "" &&
        vals.amountSearch.toLowerCase() == ""
      ) {
        if (d.productType == vals.productType) {
          return d;
        }
      } else if (
        vals.search == "" &&
        vals.productType == "" &&
        vals.amountSearch.toLowerCase() == ""
      ) {
        if (d.location == vals.location) {
          return d;
        }
      }
    });
    // SET IT
    setFilteredData(filteredData);
    // console.log(filteredData);
  };

  return (
    <>
      <Head>
        <title>California Markets</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <FilterBar handleFilter={handleFilter} />
        <OverAllStats data={filteredData} filter={filter} />
        <MainContainer data={filteredData} />
      </main>
    </>
  );
}
