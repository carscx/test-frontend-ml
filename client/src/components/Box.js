import React from "react";
import styled from "styled-components";
import { cWhite } from "../styles/colors";

const BoxSt = styled.div`
  background: ${cWhite};
  margin: 0 auto 20px auto;
  padding: 16px;
  width: calc(100% - 40px);
  @media only screen and (min-width: 1080px) {
    width: 1020px;
  }
`;

function Box({ children }) {
  return <BoxSt>{children}</BoxSt>;
}
export default Box;
