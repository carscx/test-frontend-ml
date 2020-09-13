import React, { useEffect, useContext } from "react";
import { ErrorsContext } from "../../providers/Errors.context";
import "./Alert.scss";

function Alert() {
  const [dataErrors] = useContext(ErrorsContext);

  useEffect(() => {}, [dataErrors]);
  return (
    <>{dataErrors.error && <div className="alert">{dataErrors.error}.</div>}</>
  );
}

export default Alert;
