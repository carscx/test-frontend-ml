import React, { useContext } from "react";
// import { ItemsContext } from "../providers/Items.context";
import styled from "styled-components";
import { cGrey } from "../styles/colors";
import { BreadcrumbsContext } from "../providers/Breadcrumbs.context";

const BreadcrumbsBox = styled.div`
  margin: 0 auto;
  padding: 0;
  min-height: 32px;
  display: flex;
  width: calc(100% - 40px);
  @media only screen and (min-width: 1080px) {
    width: 1040px;
  }
`;
const BreadcrumbsUl = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 16px 0;
  padding: 0;
  li {
    display: flex;
    color: ${cGrey};
    &:after {
      content: ">";
      margin: 0 5px;
    }
    &:last-child {
      font-weight: 600;
      &:after {
        content: "";
      }
    }
  }
`;

function Breadcrumbs() {
  const [data] = useContext(BreadcrumbsContext);
  return (
    <BreadcrumbsBox>
      {data.breadcrumbs && (
        <BreadcrumbsUl>
          {data.breadcrumbs.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </BreadcrumbsUl>
      )}
    </BreadcrumbsBox>
  );
}

export default Breadcrumbs;
