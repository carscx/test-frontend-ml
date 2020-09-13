import React from "react";
import { useNavigate } from "react-router-dom";
import formatMoney from "../../utils/formatMoney";
import icoFreeShipping from "../../assets/images/ic_shipping.png";
import "./Item.scss";

function Item({ data }) {
  const navigate = useNavigate();
  const goToDetail = (idItem) => {
    navigate(`/items/${idItem}`);
  };
  return (
    <>
      {data && (
        <div className="item" onClick={() => goToDetail(data.id)}>
          <div className="col__left">
            <img
              className="col__left__img"
              src={data.picture}
              alt={data.title}
              title={data.title}
            />
          </div>
          <div className="col__right">
            <h2 className="col__right__price">
              {Number("0." + data.price.decimals) > 0
                ? formatMoney(
                    Number(data.price.amount) +
                      Number("0." + data.price.decimals)
                  )
                : formatMoney(Number(data.price.amount), 0)}
              {data.free_shipping && (
                <img
                  src={icoFreeShipping}
                  alt={data.title}
                  title="Envío gratis"
                />
              )}
            </h2>
            <h3 className="col__right__title">{data.title}</h3>
          </div>
          <div className="col__end">
            <p className="col__end__address">{data.address}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Item;
