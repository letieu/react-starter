// @material-ui/icons
import Business from "@material-ui/icons/Business";
import Group from "@material-ui/icons/Group";
import CategoryIcon from "@material-ui/icons/Category";
import Storefront from "@material-ui/icons/Storefront";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssessmentIcon from '@material-ui/icons/Assessment';
import EventNoteIcon from '@material-ui/icons/EventNote';

import LoginPage from "views/Auth/LoginPage.js";
import RegisterPage from "views/Auth/RegisterPage";
import CompanyIndex from "views/Company/CompanyIndex";
import CompanyCreate from "views/Company/CompanyCreate";
import CompanyView from "views/Company/CompanyView";
import UserIndex from "views/User/UserIndex";
import UserView from "views/User/UserView";
import UserCreate from "views/User/UserCreate";
import CategoryView from "views/Category/CategoryView";
import CategoryIndex from "views/Category/CategoryIndex";
import CategoryCreate from "views/Category/CategoryCreate";
import ProductIndex from "views/Product/ProductIndex";
import ProductView from "views/Product/ProductView";
import ProductCreate from "views/Product/ProductCreate";


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
  // =================================================================== COMPANY
  {
    path: "/company/create",
    name: "Create company",
    component: CompanyCreate,
    layout: "/admin",
  },
  {
    path: "/company/:id",
    name: "Company",
    component: CompanyView,
    layout: "/admin",
  },
  {
    isMenu: true,
    path: "/company",
    name: "Company",
    component: CompanyIndex,
    layout: "/admin",
    icon: Business,
  },

  // =================================================================== USER
  {
    path: "/user/create",
    name: "Create User",
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
    path: "/category/:id",
    name: "Category",
    component: CategoryView,
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
  // =================================================================== CUSTOMER
  {
    path: "/customer/create",
    name: "Create Customer",
    component: CompanyCreate,
    layout: "/admin",
  },
  {
    path: "/customer/:id",
    name: "Customer",
    component: CompanyView,
    layout: "/admin",
  },
  {
    isMenu: true,
    path: "/customer",
    name: "Customer",
    component: CompanyIndex,
    layout: "/admin",
    icon: AssignmentIndIcon,
  },
  // =================================================================== PROJECT
  {
    path: "/project/create",
    name: "Create Project",
    component: CompanyCreate,
    layout: "/admin",
  },
  {
    path: "/project/:id",
    name: "Project",
    component: CompanyView,
    layout: "/admin",
  },
  {
    isMenu: true,
    path: "/project",
    name: "Project",
    component: CompanyIndex,
    layout: "/admin",
    icon: AssessmentIcon,
  },
  // =================================================================== ORDER
  {
    path: "/order/create",
    name: "Create Order",
    component: CompanyCreate,
    layout: "/admin",
  },
  {
    path: "/order/:id",
    name: "Order",
    component: CompanyView,
    layout: "/admin",
  },
  {
    isMenu: true,
    path: "/order",
    name: "Order",
    component: CompanyIndex,
    layout: "/admin",
    icon: EventNoteIcon,
  },
];
export default dashRoutes;
