import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import formatMoney from "../utils/formatMoney";
import { BreadcrumbsContext } from "../providers/Breadcrumbs.context";
import { ErrorsContext } from "../providers/Errors.context";
import { Box, Breadcrumbs } from "../components";
import { cBlue, cBlueDark, cGrey, cWhite } from "../styles/colors";
const config = require("../config/config.json");
const pkg = require("./../../package.json");

const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  width: calc(100% - 40px);
  @media only screen and (min-width: 1080px) {
    flex-direction: row;
  }
`;
const ColDetailLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media only screen and (min-width: 1080px) {
    max-width: 680px;
    width: 65%;
  }
`;

const BoxDescription = styled.div`
  margin: 32px 0 0 22px;
  h2 {
    font-size: 28px;
    font-weight: 300;
    margin: 0;
  }
  p {
    color: ${cGrey};
    font-size: 16px;
    margin: 32px 0;
  }
`;
const ColDetailRight = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  @media only screen and (min-width: 1080px) {
    width: 35%;
  }
`;
const ImgDetailSt = styled.img`
  width: 100%;
  @media only screen and (min-width: 1080px) {
    max-width: 680px;
  }
`;
const HeaderInfo = styled.p`
  font-size: 14px;
  margin: 22px 0 16px 0;
`;
const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 32px;
  margin-top: 0px;
  width: 100%;
`;
const Price = styled.h3`
  font-size: 46px;
  font-weight: 300;
  margin-bottom: 32px;
  margin-top: 0px;
  width: 100%;
  sup {
    font-size: 20px;
  }
`;
const BtnCompra = styled.button`
  background: ${cBlue};
  color: ${cWhite};
  border: 0;
  border-radius: 4px;
  padding: 10px;
  width: 100%;

  @media only screen and (min-width: 1080px) {
    width: calc(100% - 12px);
  }
  transition: all 0.4s ease;
  &:hover {
    background: ${cBlueDark};
    cursor: pointer;
  }
`;

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
          <DetailBox>
            <ColDetailLeft>
              <ImgDetailSt
                src={data.picture}
                alt={data.title}
                title={data.title}
              />
              <BoxDescription>
                <h2>Descripción del producto</h2>
                {data.description && <p>{data.description.plain_text}</p>}
              </BoxDescription>
            </ColDetailLeft>
            <ColDetailRight>
              <HeaderInfo>
                {data.condition === "new" && "Nuevo"}
                {data.condition === "used" && "Usado"} - {data.sold_quantity}{" "}
                vendidos
              </HeaderInfo>
              <Title>{data.title}</Title>
              {data.price && (
                <Price>
                  {formatMoney(Number(data.price.amount), 0)}
                  <sup>
                    {data.price.decimals === 0 ? "00" : data.price.decimals}
                  </sup>
                </Price>
              )}
              <BtnCompra type="button">Comprar</BtnCompra>
            </ColDetailRight>
          </DetailBox>
        )}
      </Box>
    </>
  );
}

export default ItemDetail;
