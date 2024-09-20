import { makeAutoObservable } from "mobx";

interface Res {
  [key: string]: any;
}

class MainStore {
  isLogin = false;
  loginStatus = 1;

  constructor() {
    makeAutoObservable(this);
  }

  setLoginStatus = (val: number) => {
    this.loginStatus = val;
  };

  addUser = (data: Res) => {
    this.isLogin = true;
  };
}

export default MainStore;
