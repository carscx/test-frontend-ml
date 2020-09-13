import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ItemsContext } from "../../providers/Items.context";
import { BreadcrumbsContext } from "../../providers/Breadcrumbs.context";
import { ErrorsContext } from "../../providers/Errors.context";
import { useInput } from "../../hooks/useInput.hook";
import icoSearch from "../../assets/images/ic_Search.png";
import "./Search.scss";

const config = require("../../config/config.json");
const pkg = require("./../../../package.json");

function Search() {
  const { value, bind } = useInput("");
  const navigate = useNavigate();
  const [, setData] = useContext(ItemsContext);
  const [, setDataBreadcrumbs] = useContext(BreadcrumbsContext);
  const [, setDataErrors] = useContext(ErrorsContext);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const [qUrlSearch, setQUrlSearch] = useState(urlParams.get("q"));
  const url = `${config.URL_BACKEND}items?q=`;

  function submitSearch(e) {
    e.preventDefault();
    setQUrlSearch(value);
  }

  useEffect(() => {
    setData({});
    setQUrlSearch();

    if (qUrlSearch !== undefined && qUrlSearch !== null) {
      if (!qUrlSearch.startsWith("MLA")) {
        if (qUrlSearch !== null) {
          const FetchData = async () => {
            try {
              const res = await fetch(`${url}${qUrlSearch}`, {
                method: "get",
                headers: new Headers({
                  "X-Author-Name": pkg.author.name,
                  "X-Author-Lastname": pkg.author.lastname,
                }),
              });
              const json = await res.json();
              setData({
                products_list: json.items,
                query: qUrlSearch,
              });
              setDataBreadcrumbs({
                breadcrumbs: json.breadcrumbs,
              });
              setDataErrors({});
            } catch (error) {
              setDataErrors({ error: `${error}` });
            }
          };
          FetchData();
        }
      } else {
        console.log("IDPRODUCTO", qUrlSearch);
        navigate(`/items/${qUrlSearch}`);
      }
    }
  }, [setData, setDataErrors, qUrlSearch, url, navigate, setDataBreadcrumbs]);

  return (
    <div className="search__box">
      <form onSubmit={submitSearch}>
        <input
          type="search"
          name="q"
          placeholder="Nunca dejes de buscar"
          {...bind}
        />
        <button type="submit">
          <img src={icoSearch} alt="Buscar" />
        </button>
      </form>
    </div>
  );
}
export default Search;
