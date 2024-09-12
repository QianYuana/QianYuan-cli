import { makeAutoObservable } from "mobx";
import { PrinterOutlined } from "@ant-design/icons";
import { lazy } from "react";
interface Res {
  [key: string]: any;
}

class MainStore {
  routeList = [
    {
      name: "文档打印组件",
      path: "print",
      icon: PrinterOutlined,
      element: () => import("../modules/documents-print"),
    },
  ];
  loginStatus = 1;

  constructor() {
    makeAutoObservable(this);
  }
}

export default MainStore;
