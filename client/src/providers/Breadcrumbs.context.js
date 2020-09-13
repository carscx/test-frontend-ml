import React, { createContext, useState } from "react";

const BreadcrumbsContext = createContext();
function BreadcrumbsProvider({ children }) {
  const [dataBreadcrumb, setDataBreadcrumb] = useState({});
  return (
    <BreadcrumbsContext.Provider value={[dataBreadcrumb, setDataBreadcrumb]}>
      {children}
    </BreadcrumbsContext.Provider>
  );
}

export { BreadcrumbsContext };
export default BreadcrumbsProvider;
