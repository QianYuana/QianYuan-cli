const fs = require("fs");
const path = require("path");
const express = require("express");
const crypto = require("crypto");
const app = express();
const nodemailer = require("nodemailer");
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.all("*", function (req, res, next) {
  // 设置允许跨域的域名,*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "http://localhost:9100");
  res.header("Access-Control-Allow-Origin", "http://localhost:52331");
  // 允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  // 跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  // CORS策略
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method.toLowerCase() == "options")
    res.sendStatus(200); // 让options 尝试请求快速结束
  else next();
});

function generateRandomToken(length = 32) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") // 转换为十六进制格式
    .slice(0, length); // 取所需长度的字符串
}
const transporter = nodemailer.createTransport({
  host: "smtp.qq.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "1565054238@qq.com",
    pass: "uhweaouftbjgjfie",
  },
});

// async..await is not allowed in global scope, must use a wrapper
const main = async (req, callback) => {
  // send mail with defined transport object
  const info = await transporter.sendMail(
    {
      from: "1565054238@qq.com", // sender address
      to: "3527444527@qq.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    },
    callback
  );
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};
app.post("/add_users", (req, res) => {
  const users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "users.json")),
    "utf8"
  );
  let arr = users.users;
  let bool = arr.some((item) => {
    return item.username === req.body.username;
  });
  if (bool) {
    return res.send({
      status: "failed",
      message: "用户名已存在",
      resultObject: null,
      code: 200,
    });
  } else {
    arr.push({ ...req.body, role: "1" });
    fs.writeFileSync(
      path.join(__dirname, "users.json"),
      JSON.stringify({ ...users, users: arr, token: null }),
      "utf8"
    );
    console.log(users, req.body);
    res.send({
      status: "success",
      message: "注册成功",
      resultObject: { ...req.body, role: "1" },
      code: 200,
    });
  }
});
app.post("/login", (req, res) => {
  const users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "users.json")),
    "utf8"
  );
  let arr = users.users;
  let bool = arr.some((item) => {
    return (
      item.username === req.body.username && item.password === req.body.password
    );
  });
  if (!bool) {
    return res.send({
      status: "failed",
      message: "用户名或密码错误",
      resultObject: null,
      code: 200,
    });
  } else {
    let token = generateRandomToken(32);
    arr = arr.map((item) => {
      if (item.username === req.body.username) {
        return { ...item, token: token };
      }
    });
    fs.writeFileSync(
      path.join(__dirname, "users.json"),
      JSON.stringify({ ...users, users: arr }),
      "utf8"
    );
    console.log(users, req.body);
    res.send({
      status: "success",
      message: "登录成功",
      resultObject: { role: "1", token: token },
      code: 200,
    });
  }
});
app.post("/send_enmail", (req, res) => {
  main(req, (err, info) => {
    if (err) {
      console.log(err);
      res.send({
        status: "failed",
        message: "发送失败",
        resultObject: null,
        code: 200,
      });
    } else {
      res.send({
        status: "success",
        message: "发送成功",
        resultObject: null,
        code: 200,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
