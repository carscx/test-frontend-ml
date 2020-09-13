import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import formatMoney from "../utils/formatMoney";
import icoFreeShipping from "../assets/images/ic_shipping.png";
import { cGreyE } from "../styles/colors";

const ItemSt = styled.div`
  border-bottom: 1px solid ${cGreyE};
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  cursor: pointer;
  @media only screen and (min-width: 1080px) {
    flex-direction: row;
  }
`;
const ColLeftSt = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 190px;
  margin-right: 16px;
  width: 100%;
  @media only screen and (min-width: 1080px) {
    width: 190px;
  }
`;
const ColRightSt = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 180px;

  align-items: flex-start;
  justify-content: flex-start;
`;
const ColEndSt = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  max-height: 190px;
`;
const ImgSt = styled.img`
  border-radius: 4px;
  height: 100%;
  object-fit: contain;
  min-width: 180px;
  width: 100%;
`;
const Price = styled.h2`
  font-weight: 300;
  margin: 0px 0 0;
  img {
    margin-left: 10px;
  }
`;
const Title = styled.h3`
  font-weight: 300;
  margin: 32px 0 0;
`;
const Address = styled.p`
  margin-left: auto;
  margin-right: 20px;
`;

function Item({ data }) {
  const navigate = useNavigate();
  const goToDetail = (idItem) => {
    navigate(`/items/${idItem}`);
  };
  return (
    <>
      {data && (
        <ItemSt onClick={() => goToDetail(data.id)}>
          <ColLeftSt>
            <ImgSt src={data.picture} alt={data.title} title={data.title} />
          </ColLeftSt>
          <ColRightSt>
            <Price>
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
            </Price>
            <Title>{data.title}</Title>
          </ColRightSt>
          <ColEndSt>
            <Address>{data.address}</Address>
          </ColEndSt>
        </ItemSt>
      )}
    </>
  );
}

export default Item;
