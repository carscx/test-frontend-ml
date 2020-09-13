import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import formatMoney from "../../utils/formatMoney";
import { BreadcrumbsContext } from "../../providers/Breadcrumbs.context";
import { ErrorsContext } from "../../providers/Errors.context";
import { Box, Breadcrumbs } from "../../components";
import "./ItemDetail.scss";
const config = require("../../config/config.json");
const pkg = require("../../../package.json");

function ItemDetail() {
  const [data, setData] = useState({});
  const [, setDataBreadcrumbs] = useContext(BreadcrumbsContext);
  const [, setDataErrors] = useContext(ErrorsContext);
  const url = `${config.URL_BACKEND}items/`;
  const { id } = useParams();

  useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await fetch(`${url}${id}`, {
          method: "get",
          headers: new Headers({
            "X-Author-Name": pkg.author.name,
            "X-Author-Lastname": pkg.author.lastname,
          }),
        });
        const json = await res.json();
        setData(json.item);
        setDataBreadcrumbs({ breadcrumbs: json.breadcrumbs });
      } catch (error) {
        console.log("error - ", error);
        setDataErrors({ error: `${error}` });
      }
    };
    FetchData();
  }, [id, setData, url, setDataBreadcrumbs, setDataErrors]);

  return (
    <>
      <Breadcrumbs />
      <Box>
        {data && (
          <div className="detail__box">
            <div className="detail__col__left">
              <img
                className="detail__img"
                src={data.picture}
                alt={data.title}
                title={data.title}
              />
              <div className="detail__box__description">
                <h2>Descripción del producto</h2>
                {data.description && <p>{data.description.plain_text}</p>}
              </div>
            </div>
            <div className="detail__col__right">
              <div className="detail__col__right__header-info">
                {data.condition === "new" && "Nuevo"}
                {data.condition === "used" && "Usado"} - {data.sold_quantity}{" "}
                vendidos
              </div>
              <h2 className="detail_col__right__title">{data.title}</h2>
              {data.price && (
                <h3 className="detail__col__right__price">
                  {formatMoney(Number(data.price.amount), 0)}
                  <sup>
                    {data.price.decimals === 0 ? "00" : data.price.decimals}
                  </sup>
                </h3>
              )}
              <button className="detail__col__right__btn-compra" type="button">
                Comprar
              </button>
            </div>
          </div>
        )}
      </Box>
    </>
  );
}

export default ItemDetail;
