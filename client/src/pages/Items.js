import React, { useContext } from "react";
import { ItemsContext } from "../providers/Items.context";
import { Box, Breadcrumbs, Item } from "../components";

function Items() {
  const [data] = useContext(ItemsContext);
  const products = (data && data.products_list) || [];

  if (!products || products.length === 0) {
    return <Box>Busca en miles de productos</Box>;
  }
  return (
    <>
      <Breadcrumbs />
      <Box>
        {products.map((t) => (
          <Item key={t.id} data={t} />
        ))}
      </Box>
    </>
  );
}

export default Items;
