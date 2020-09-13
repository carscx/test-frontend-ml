import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Search } from "../components";
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
  const navigate = useNavigate();
  const goToHome = () => {
    navigate(`/`);
  };

  // const [dataErrors, setDataErrors] = useContext(ErrorsContext);
  // useEffect(() => {
  //   setDataErrors({});
  // }, [setDataErrors]);

  return (
    <>
      <HeaderSt>
        <Container row>
          <LogoSt onClick={goToHome}>
            <img src={logoMl} alt="Mercado Libre" title="Mercado Libre" />
          </LogoSt>
          <Search />
        </Container>
      </HeaderSt>
      <Alert />
    </>
  );
}
export default Header;
