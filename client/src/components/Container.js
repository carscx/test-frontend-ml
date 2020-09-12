import React from "react";
import styled from "styled-components";

const ContainerSt = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  width: 100%;
  @media only screen and (min-width: 1080px) {
    width: 1020px;
  }
`;

function Container({ children, row }) {
  return <ContainerSt row={row}>{children}</ContainerSt>;
}
export default Container;
