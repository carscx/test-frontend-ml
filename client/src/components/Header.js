import React from "react";
import styled from "styled-components";

import { Container } from "../components";
import { cPrimary } from "../styles/colors";

import logoMl from "../assets/images/Logo_ML.png";

const HeaderSt = styled.div`
  background: ${cPrimary};
  display: flex;
  align-items: center;
  margin: 0;
  height: 70px;
  width: 100%;
`;
const LogoSt = styled.div`
  margin: 5px;
  display: flex;
  width: 50px;
  img {
    object-fit: contain;
    cursor: pointer;
  }
`;

function Header() {
  return (
    <HeaderSt>
      <Container row>HEader</Container>
    </HeaderSt>
  );
}
export default Header;
