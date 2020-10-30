import React from "react";
import { Route, Switch } from "react-router-dom";
import AddProductPage from "./pages/addProduct/Addproduct.component";
import AddSellerPage from "./pages/addSeller/Addseller.component";
import Productspage from "./pages/products/products.components";

const ROUTES = [
  { path: "/", key: "HOME", exact: true, component: Productspage },
  { path: "/new/product", key: "NEW_PRODUCT", exact: true, component: AddProductPage },
  { path: "/new/seller", key: "NEW_SELLER", exact: true, component: AddSellerPage },

  //nested example

  {
    path: "/app",
    key: "APP",
    component: RenderRoutes, 
    routes: [
      {
        path: "/app",
        key: "APP_ROOT",
        exact: true,
        component: () => <h1>App Index</h1>,
      },
      {
        path: "/app/page",
        key: "APP_PAGE",
        exact: true,
        component: () => <h1>App Page</h1>,
      },
    ],
  },
];
export default ROUTES;

export function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}
