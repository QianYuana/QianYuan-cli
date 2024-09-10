import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import router from "./router/index";
dayjs.locale("zh-cn");

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
// ReactDOM.render(
//  ,
//   document.getElementById("root")
// );
