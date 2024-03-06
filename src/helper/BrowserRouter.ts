import { createBrowserRouter } from "react-router-dom";
import Blogs from "../component/Blogs.tsx";
import MyFavorites from "../component/MyFavorites";
import MyPosts from "../component/MyPosts.tsx";
import Register from "../component/Register.tsx";
import Home from "../component/Home.tsx";
import Login from "../component/Login.tsx";
import View from "../component/View.tsx";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/blogs",
    Component: Blogs,
  },
  {
    path: "/favorites",
    Component: MyFavorites,
  },
  {
    path: "/posts",
    Component: MyPosts,
  },
  {
    path: "/view",
    Component: View,
  },
]);
export default Router;
