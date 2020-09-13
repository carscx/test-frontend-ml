import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryParam, StringParam } from "use-query-params";

const ItemsContext = createContext();
function ItemsProvider({ children }) {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const [, setQuerySearch] = useQueryParam("q", StringParam);

  useEffect(() => {
    if (data && data.products_list && data.products_list.length > 0) {
      navigate(`/items?q=${data.query}`);
    }
  }, [data, navigate, setQuerySearch]);
  return (
    <ItemsContext.Provider value={[data, setData]}>
      {children}
    </ItemsContext.Provider>
  );
}

export { ItemsContext };
export default ItemsProvider;
