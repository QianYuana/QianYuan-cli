import { makeAutoObservable } from "mobx";
import { PrinterOutlined, CodeSandboxOutlined } from "@ant-design/icons";
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
    {
      name: "three自定义生成",
      path: "three",
      icon: CodeSandboxOutlined,
      element: () => import("../modules/thress-generation"),
    },
  ];
  cacheList: string[] = ["print"];

  constructor() {
    makeAutoObservable(this);
  }

  setCacheList = (list: string) => {
    if (!this.cacheList.includes(list)) {
      if (this.cacheList.length < 9) {
        this.cacheList.push(list);
      } else {
        this.cacheList.shift();
        this.cacheList.push(list);
      }
    }
  };
  removeCacheList = (path: string) => {
    return new Promise((resolve, reject) => {
      const index = this.cacheList.indexOf(path);
      let result = "";
      if (this.cacheList[index + 1]) {
        result = this.cacheList[index + 1];
      } else if (this.cacheList[index - 1]) {
        result = this.cacheList[index - 1];
      } else {
        result = "print";
      }
      this.cacheList = this.cacheList.filter((item) => item !== path);
      resolve(result);
    });
  };
}

export default MainStore;
