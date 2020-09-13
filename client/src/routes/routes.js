import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import ItemsProvider from "../providers/Items.context";
import BreadcrumbsProvider from "../providers/Breadcrumbs.context";
import ErrorsProvider from "../providers/Errors.context";
import Home from "../pages/Home";
import Items from "../pages/Items";
import ItemDetail from "../pages/ItemDetail";
import { Header } from "../components";

function Router() {
  return (
    <BrowserRouter>
      <ErrorsProvider>
        <BreadcrumbsProvider>
          <ItemsProvider>
            <QueryParamProvider>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/items" element={<Items />} />
                <Route path="/items/:id" element={<ItemDetail />} />
              </Routes>
            </QueryParamProvider>
          </ItemsProvider>
        </BreadcrumbsProvider>
      </ErrorsProvider>
    </BrowserRouter>
  );
}

export default Router;
