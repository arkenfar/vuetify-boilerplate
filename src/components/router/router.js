import Vue from "vue";
import Router from "vue-router";
import AuthGuard from "./auth-guard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import About from "../pages/About";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      beforeEnter: AuthGuard,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/about",
      name: "About",
      component: About,
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp,
    },
    {
      path: "/forgotpassword",
      name: "ForgotPassword",
      component: ForgotPassword,
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      beforeEnter: AuthGuard,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      beforeEnter: AuthGuard,
    },
  ],
  mode: "history",
});
