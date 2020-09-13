import React, { useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { ErrorsContext } from "../providers/Errors.context";
import { cError, cErrorLight, cGreyE } from "../styles/colors";

const FadeIn = keyframes`
	from { opacity: 0; }
	to { opacity: 1; }
`;

const AlertSt = styled.div`
  animation: ${FadeIn} 1s ease-in-out 0s;
  background: ${cErrorLight};
  border: 1px solid ${cError};
  border-radius: 4px;
  color: ${cGreyE};
  display: flex;
  flex-direction: row;
  margin: 16px auto;
  padding: 16px 0 16px 16px;
  width: calc(100% - 40px);
  @media only screen and (min-width: 1080px) {
    width: 1020px;
  }
`;

function Alert() {
  const [dataErrors] = useContext(ErrorsContext);

  useEffect(() => {}, [dataErrors]);
  return <>{dataErrors.error && <AlertSt>{dataErrors.error}.</AlertSt>}</>;
}

export default Alert;
