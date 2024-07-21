import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";


// 定义一些路由组件（可选）
import LoginPage from "../modules/demo/index";
const HomePage = () => <div>我是首页</div>;
// const LoginPage  = React.lazy(() => import("../modules/demo/index"));
// const LoginPage = () => <div>我是登录</div>;

// 创建路由配置
const router = createHashRouter([
  {
    path: "/",
    element: <Navigate replace to="/login" />, // 简化 Navigate 的使用
  },
  {
    path: "/login",
    element: <LoginPage />, // 使用组件代替直接 JSX
  },
  {
    path: "/home",
    element: <HomePage />, // 使用组件代替直接 JSX
  },
]);
export default router;
