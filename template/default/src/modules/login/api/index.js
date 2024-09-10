import { Http } from "untils";

export default {
  addUser: (data) => {
    return Http.post("/add_users", data);
  },
  login: (data) => {
    return Http.post("/login", data);
  },
};
