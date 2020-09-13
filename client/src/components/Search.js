import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ItemsContext } from "../providers/Items.context";
import { BreadcrumbsContext } from "../providers/Breadcrumbs.context";
import { ErrorsContext } from "../providers/Errors.context";
import { useInput } from "../hooks/useInput.hook";
import { cGrey } from "../styles/colors";
import icoSearch from "../assets/images/ic_Search.png";
const config = require("../config/config.json");
const pkg = require("./../../package.json");

const SearchBox = styled.div`
  display: flex;
  margin: 0 10px 0 auto;
  width: calc(100% - 80px);
  form {
    display: flex;
    margin: 0;
    width: 100%;
  }
  input {
    border: 0;
    border-radius: 4px 0 0 4px;
    font-size: 18px;
    padding: 5px 10px;
    height: 42px;
    width: 100%;
    transition: box-shadow 0.4s ease;
    &:focus,
    &:active {
      outline: 0;
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    }
  }
  button {
    border: 0;
    border-radius: 0 4px 4px 0;
    height: 42px;
    padding: 0 10px;
    &:focus,
    &:active {
      outline: 0;
      border: 1px dashed ${cGrey};
    }
    img {
      max-width: 100%;
    }
  }
`;

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
    <SearchBox>
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
    </SearchBox>
  );
}
export default Search;
