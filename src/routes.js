// @material-ui/icons
import Group from "@material-ui/icons/Group";
import CategoryIcon from "@material-ui/icons/Category";
import Storefront from "@material-ui/icons/Storefront";
import EventNoteIcon from '@material-ui/icons/EventNote';

import LoginPage from "views/Auth/LoginPage.js";
import RegisterPage from "views/Auth/RegisterPage";
import UserIndex from "views/User/UserIndex";
import UserView from "views/User/UserView";
import UserCreate from "views/User/UserCreate";
import CategoryIndex from "views/Category/CategoryIndex";
import CategoryCreate from "views/Category/CategoryCreate";
import ProductIndex from "views/Product/ProductIndex";
import ProductView from "views/Product/ProductView";
import ProductCreate from "views/Product/ProductCreate";
import OrderIndex from "./views/Order/OrderIndex";
import OrderCreate from "./views/Order/OrderCreate";


var dashRoutes = [
  {
    hide: true,
    collapse: true,
    name: "Auth",
    views: [
      {
        path: "/login",
        name: "Login",
        component: LoginPage,
        layout: "/auth",
      },
      {
        path: "/register",
        name: "Register",
        component: RegisterPage,
        layout: "/auth",
      },
    ],
  },

  // =================================================================== USER
  {
    path: "/user/create",
    name: "Create User",
    component: UserCreate,
    layout: "/admin",
  },
  {
    path: "/user/edit/:id",
    name: "Edit user",
    component: UserCreate,
    layout: "/admin",
  },
  {
    path: "/user/:id",
    name: "User",
    component: UserView,
    layout: "/admin",
  },
  {
    isMenu: true,
    path: "/user",
    name: "User",
    component: UserIndex,
    layout: "/admin",
    icon: Group,
  },
  // =================================================================== CATEGORY
  {
    path: "/category/create",
    name: "Create Category",
    component: CategoryCreate,
    layout: "/admin",
  },
  {
    path: "/category/edit/:id",
    name: "Create Category",
    component: CategoryCreate,
    layout: "/admin",
  },
  {
    isMenu: true,
    path: "/category",
    name: "Category",
    component: CategoryIndex,
    layout: "/admin",
    icon: CategoryIcon,
  },
  // =================================================================== PRODUCTS
  {
    path: "/product/create",
    name: "Create Product",
    component: ProductCreate,
    layout: "/admin",
  },
  {
    path: "/product/edit/:id",
    name: "Edit Product",
    component: ProductCreate,
    layout: "/admin",
  },
  {
    path: "/product/:id",
    name: "Product",
    component: ProductView,
    layout: "/admin",
  },
  {
    isMenu: true,
    path: "/product",
    name: "Product",
    component: ProductIndex,
    layout: "/admin",
    icon: Storefront,
  },
  // =================================================================== ORDER
  {
    path: "/order/create",
    name: "Create Order",
    layout: "/admin",
    component: OrderCreate,
  },
  {
    path: "/order/:id",
    name: "Order",
    layout: "/admin",
  },
  {
    isMenu: true,
    path: "/order",
    name: "Order",
    component: OrderIndex,
    layout: "/admin",
    icon: EventNoteIcon,
  },
];
export default dashRoutes;
