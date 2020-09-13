import React, { useContext } from "react";
import { BreadcrumbsContext } from "../../providers/Breadcrumbs.context";
import "./Breadcrumbs.scss";

function Breadcrumbs() {
  const [data] = useContext(BreadcrumbsContext);
  return (
    <div className="breadcrumbs__box">
      {data.breadcrumbs && (
        <ul className="breadcrumbs__ul">
          {data.breadcrumbs.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Breadcrumbs;
