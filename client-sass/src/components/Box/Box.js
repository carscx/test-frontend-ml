import React from "react";
import "./Box.scss";

function Box({ children }) {
  return <div className="box">{children}</div>;
}
export default Box;
