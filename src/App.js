import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import HeroCardSection from "./components/HeroCardSection";
import DataTable from "./components/DataTable";

require("dotenv").config();

function App() {
  // eslint-disable-next-line
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [total, setTotal] = useState(0);
  const [savedData, setSavedData] = useState([]);
  const [savedPageData, setSavedPageData] = useState([]);
  const [savedPageNumber, setSavedPageNumber] = useState(0);
  const [savedTotal, setSavedTotal] = useState(0);
  const [savedList, setSavedList] = useState([]);
  const [search, setSearch] = useState("");
  const [dataCopy, setDataCopy] = useState([]);

  async function fetchData1() {
    try {
      const res1 = await axios(
        `https://api.nomics.com/v1/currencies/ticker?key=c52255d4adebeda8d05a7ec560cebd54e0a7ff80&interval=1d,30d&per-page=100&page=1`
      );
      const fetchData1 = res1.data;
      setData(fetchData1);
      setDataCopy(fetchData1);
      setPageData(fetchData1.slice(0, 5));
      setTotal(fetchData1.length);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData2() {
    try {
      const saved = await axios("https://mern-cryptowatch.herokuapp.com/api/");
      setSavedList(saved.data);
      if (saved.data.length) {
        const savedString = await saved.data.join(",");
        let res3;
        try {
          res3 = await axios(
            `https://api.nomics.com/v1/currencies/ticker?key=c52255d4adebeda8d05a7ec560cebd54e0a7ff80&ids=${savedString}&interval=1d,30d&per-page=100&page=1`
          );
          const fetchData3 = res3.data;
          setSavedData(fetchData3);
          setSavedPageData(fetchData3.slice(0, 5));
          setSavedTotal(fetchData3.length);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function updatePageData() {
    const updatedPageData = data.slice(pageNumber, pageNumber + 5);
    setPageData(updatedPageData);
  }

  function nextPage() {
    setPageNumber(pageNumber + 5);
  }

  function prevPage() {
    setPageNumber(pageNumber - 5);
  }

  function updateSavedPageData() {
    const updatedPageData = savedData.slice(
      savedPageNumber,
      savedPageNumber + 5
    );
    setSavedPageData(updatedPageData);
  }

  function nextSavedPage() {
    setSavedPageNumber(savedPageNumber + 5);
  }

  function prevSavedPage() {
    setSavedPageNumber(savedPageNumber - 5);
  }

  const handleSearch = () => {
    if (search) {
      const sortedData = dataCopy.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.symbol.toLowerCase().includes(search.toLowerCase())
      );
      setData(sortedData);
      setPageData(sortedData.slice(0, 5));
      setTotal(sortedData.length);
    } else {
      setData(dataCopy);
      setPageData(dataCopy.slice(0, 5));
      setTotal(dataCopy.length);
    }
  };

  useEffect(() => {
    fetchData1();
    fetchData2();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    updatePageData();
    // eslint-disable-next-line
  }, [pageNumber]);

  useEffect(() => {
    updateSavedPageData();
    // eslint-disable-next-line
  }, [savedPageNumber]);

  useEffect(() => {
    updateSavedPageData();
    // eslint-disable-next-line
  }, [savedData]);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [search]);

  const handleSave = async (symbol, item) => {
    const res = await axios.post(
      `https://mern-cryptowatch.herokuapp.com/api/add/${symbol}`
    );
    setSavedList([symbol, ...savedList]);
    setSavedData([item, ...savedData]);
    setSavedTotal(savedTotal + 1);
    console.log(res.data);
  };

  const handleDelete = async (symbol) => {
    const res = await axios.delete(
      `https://mern-cryptowatch.herokuapp.com/api/delete/${symbol}`
    );
    setSavedList(savedList.filter((item) => item !== symbol));
    setSavedData(savedData.filter((item) => item.symbol !== symbol));
    setSavedTotal(savedTotal - 1);
    console.log(res.data);
  };

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/view">
            <Header />
            <HeroCardSection />
            <DataTable
              home={false}
              pageData={savedPageData}
              pageNumber={savedPageNumber}
              nextPage={nextSavedPage}
              prevPage={prevSavedPage}
              total={savedTotal}
              savedList={savedList}
              setSavedList={setSavedList}
              handleDelete={handleDelete}
            />
          </Route>
          <Route path={"/" || "/home"}>
            <Header />
            <HeroCardSection />
            <DataTable
              home={true}
              pageData={pageData}
              pageNumber={pageNumber}
              nextPage={nextPage}
              prevPage={prevPage}
              total={total}
              savedList={savedList}
              setSavedList={setSavedList}
              handleSave={handleSave}
              setSearch={setSearch}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
