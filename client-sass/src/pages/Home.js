import React, { useEffect, useContext } from "react";
import { ItemsContext } from "../providers/Items.context";
import { BreadcrumbsContext } from "../providers/Breadcrumbs.context";
import { Box, Breadcrumbs } from "../components";

function Home() {
  const [, setData] = useContext(ItemsContext);
  const [, setDataBreadcrumbs] = useContext(BreadcrumbsContext);
  useEffect(() => {
    setData({});
    setDataBreadcrumbs({});
  }, [setData, setDataBreadcrumbs]);
  return (
    <div>
      <Breadcrumbs />
      <Box>Busca en miles de productos</Box>
    </div>
  );
}
export default Home;
