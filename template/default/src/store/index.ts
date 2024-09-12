import React from "react";
import AppStore from "./AppStore";

export const storesContext = React.createContext({
  appStores: new AppStore(),
});

/**
 * @appStores 全局状态管理器
 * 由于没有后端，所以所有的数据都存储在前端，所有数据都存储在 appStore 中
 * @param routeList 路由列表 是完整的路由列表也是开发是需要添加界面的地方
 * @returns {Object} 返回一个状态对象
 */
export const useAppStores = () => React.useContext(storesContext);
