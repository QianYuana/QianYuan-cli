import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import router from "./router/index";
dayjs.locale("zh-cn");

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
