import React from "react";
import "./DataTable.css";
import { Link } from "react-router-dom";

export default function DataTable({
  home,
  pageData,
  pageNumber,
  nextPage,
  prevPage,
  total,
  savedList,
  setSavedList,
  handleSave,
  handleDelete,
  setSearch,
}) {
  function formatMarketCap(mk) {
    const len = mk.split(".")[0];
    mk = Number(mk);
    if (len.length > 9) {
      return "$ " + (mk / 1000000000).toFixed(2) + "B";
    } else if (len.length > 6) {
      return "$ " + (mk / 1000000).toFixed(2) + "M";
    } else if (len.length > 3) {
      return "$ " + (mk / 1000).toFixed(2) + "K";
    }
    return "$ " + mk.toFixed(2);
  }

  function formatPrice(price) {
    const len = price.split(".")[0];
    price = Number(price);
    if (len.length > 9) {
      return "$ " + (price / 1000000000).toFixed(2) + "B";
    } else if (len.length > 6) {
      return "$ " + (price / 1000000).toFixed(2) + "M";
    } else if (len.length > 3) {
      return "$ " + (price / 1000).toFixed(2) + "K";
    }
    return "$ " + price.toFixed(2);
  }

  return (
    <div className="dataTable__container">
      <div className="dataTable">
        <div className="dataTable__header">
          <div className="dataTable__heading">
            {home ? "Crypto details" : "Saved Crypto details"}
          </div>
          {home ? (
            <div className="dataTable__search">
              <input
                placeholder="search"
                type="text"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          ) : null}
        </div>
        <div className="dataTable__data">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Symbol</th>
                <th>Market Cap</th>
                <th>Current Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length
                ? pageData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.symbol}</td>
                      <td>{formatMarketCap(item.market_cap)}</td>
                      <td>{formatPrice(item.price)}</td>
                      {home ? (
                        <td>
                          {savedList && savedList.includes(item.symbol) ? (
                            <Link to="/view">
                              <button className="table__buttons viewbtn">
                                View
                              </button>
                            </Link>
                          ) : (
                            <button
                              className="table__buttons"
                              onClick={() => handleSave(item.symbol, item)}
                            >
                              Save Data
                            </button>
                          )}
                        </td>
                      ) : (
                        <td>
                          <button
                            className="table__buttons removebtn"
                            onClick={() => handleDelete(item.symbol)}
                          >
                            Remove
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
        <div className="dataTable__footer">
          <div className="dataTable__rowCount">
            {pageNumber + 1 < total ? pageNumber + 1 : total} -{" "}
            {pageNumber + 5 < total ? pageNumber + 5 : total} of {total}
          </div>
          <div className="dataTable__footerButtons">
            <button onClick={prevPage} disabled={pageNumber === 0 ? 1 : 0}>
              ◀
            </button>
            <button
              onClick={nextPage}
              disabled={pageNumber >= total - 5 ? 1 : 0}
            >
              ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
