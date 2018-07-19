// import React from "react";
import Home from "./components/Home";
import Product from "./components/Product/Product";
import Pdp from "./components/PDP/PDP";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/product",
    exact: true,
    component: Product
  },
  {
    path: "/PDP",
    exact: true,
    component: Pdp
  },
  {
    component: Home
  }
];

export default routes;
