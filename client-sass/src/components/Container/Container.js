import React from "react";
import "./Container.scss";

function Container({ children, row }) {
  return (
    <div className={`container ${row ? "row" : "column"}`} row={row}>
      {children}
    </div>
  );
}
export default Container;
