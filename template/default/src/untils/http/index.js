import axios from "axios"; // 引入axios
import QS from "qs";
import { message } from "antd";
import { Cookie } from "untils";

const http = axios.create({
  timeout: 5000,
  withCredentials: true,
});
// 环境的切换
if (process.env.NODE_ENV == "development") {
  http.defaults.baseURL = "http://localhost:3000";
} else if (process.env.NODE_ENV == "debug") {
  http.defaults.baseURL = "https://www.ceshi.com";
} else if (process.env.NODE_ENV == "production") {
  http.defaults.baseURL = "http://localhost:3000";
}
// http.defaults.timeout = 10000;

http.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (["/add_users"].includes(config.url)) {
      return config;
    } else {
      // config.headers["token"] = Cookie.getCookie("token");
      return config;
    }
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    if (["/login"].includes(response.config?.url)) {
      if (response.data?.status == "success") {
        Cookie.setUserCookie(
          "token",
          response.data?.resultObject?.token,
          86400000
        );
        let data = JSON.parse(JSON.stringify(response.data?.resultObject));
        delete data.token;
        let result = { ...response.data, resultObject: data };
        response.data = result;
      }
    }
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么

    return Promise.reject(error);
  }
);
export default class Http {
  /**
   * get方法，对应get请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  static get = (url, params) => {
    return new Promise((resolve, reject) => {
      http
        .get(url, {
          params: params,
        })
        .then(({ data }) => {
          if (data.status == "failed") {
            message.destroy();
            message.error(data.message || "请求错误");
            reject("请求错误");
          }
          resolve(data);
        })
        .catch((err) => {
          message.destroy();
          message.error(err.message || "请求错误");
          reject("请求错误");
        });
    });
  };
  /**
   * post方法，对应post请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  static post = (url, params) => {
    return new Promise((resolve, reject) => {
      http
        .post(url, QS.stringify(params))
        .then(({ data }) => {
          if (data.status == "failed") {
            message.destroy();
            message.error(data.message || "请求错误");
            reject("请求错误");
          }
          resolve(data);
        })
        .catch((err) => {
          message.destroy();
          message.error(err.message || "请求错误");
          reject("请求错误");
        });
    });
  };
}
