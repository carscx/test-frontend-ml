import React from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Search } from "../../components";
import logoMl from "../../assets/images/Logo_ML.png";

import "./Header.scss";

function Header() {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate(`/`);
  };

  return (
    <>
      <div className="header">
        <Container row>
          <div className="header__logo" onClick={goToHome}>
            <img src={logoMl} alt="Mercado Libre" title="Mercado Libre" />
          </div>
          <Search />
        </Container>
      </div>
      <Alert />
    </>
  );
}
export default Header;
