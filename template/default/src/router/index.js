import React from "react";
import {
  createHashRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import { interceptRoute } from "untils";

// 定义一些路由组件（可选）
import LoginPage from "../modules/login/index.tsx";
const HomePage = () => <div>我是首页</div>;
// const LoginPage  = React.lazy(() => import("../modules/demo/index"));
// const LoginPage = () => <div>我是登录</div>;
const A= interceptRoute(LoginPage)
const B = interceptRoute(HomePage)
// 创建路由配置
const router = createHashRouter([
  {
    path: "/",
    element: <Navigate replace to="/login" />, // 简化 Navigate 的使用
  },
  {
    path: "/login",
    element:<A></A>, // 使用组件代替直接 JSX
  },
  {
    path: "/home",
    element: <B></B>, // 使用组件代替直接 JSX
  },
]);

export default router;
