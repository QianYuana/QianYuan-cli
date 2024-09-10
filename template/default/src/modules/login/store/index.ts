import React from "react";
import MainStore from "./MainStore";
 
export const storesContext = React.createContext({
  mainStore: new MainStore(),
});
 
export const useStores = () => React.useContext(storesContext);