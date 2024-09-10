import { makeAutoObservable } from "mobx";
import Api from "../api/index";

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
    return Api.addUser(data)
      .then((res) => {
        return res;
      })
      .finally(() => {
        this.isLogin = false;
      });
  };

  login = (data: Res) => {
    this.isLogin = true;
    return Api.login(data)
      .then((res) => {
        return res;
      })
      .finally(() => {
        this.isLogin = false;
      });
  };
}

export default MainStore;
