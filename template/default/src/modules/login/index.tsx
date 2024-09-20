import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Spin, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { toJS } from "mobx";

import { useStores } from "./store";
import RememberT from "./components/remember";
import "./index.scss";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
interface IAppProps {
  title?: string;
}

const App: React.FunctionComponent<IAppProps> = observer((props) => {
  const [form] = Form.useForm(); //登录表单
  const [logonForm] = Form.useForm(); //注册表单
  const { mainStore } = useStores();
  const { loginStatus, setLoginStatus, isLogin } = toJS(mainStore);
  let navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    mainStore.login(values).then((res) => {
      if (res.status == "success") {
        message.destroy();
        message.success("登录成功");
        form.resetFields();
        navigate("/home");
      } else {
        message.destroy();
        message.error(res.msg);
      }
    });
  };
  const onFinishLogon: FormProps<FieldType>["onFinish"] = (values) => {
    mainStore.addUser(values).then((res) => {
      if (res.status == "success") {
        message.destroy();
        message.success("注册成功");
        logonForm.resetFields();
        setLoginStatus(1);
      }
    });
  };
  return (
    <div className="login">
      <img
        src="/image/login-bg.png"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          padding: "0 0 0 48px",
          background: "#cea1f0",
          height: "100%",
        }}
      />
      <img
        src="/image/Saly-1.png"
        style={{
          position: "absolute",
          top: "100px",
          left: "30px",
          width: "378px",
          height: "auto",
        }}
      />
      <img
        src="/image/Saly-16.png"
        style={{
          position: "absolute",
          bottom: "0px",
          left: "400px",
          width: "378px",
          height: "auto",
        }}
      />
      <img
        src="/image/Saly-18.png"
        style={{
          position: "absolute",
          bottom: "0px",
          left: "800px",
          width: "100px",
          height: "auto",
        }}
      />
      <img
        src="/image/Saly-43.png"
        style={{
          position: "absolute",
          top: "140px",
          right: "140px",
          width: "240px",
          height: "auto",
        }}
      />
      <img
        src="/image/right-bottom.png"
        style={{
          position: "absolute",
          bottom: "0",
          right: "0",
          width: "378px",
          height: "auto",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "0",
          width: "378px",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src="/image/aircle.png"
          style={{
            display: "inline-block",
            width: "378px",
            height: "auto",
            position: "absolute",
            top: "0",
            right: "-192px",
            clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
          }}
        />
      </div>

      <div className="form-login">
        <img
          src="/image/logo.png"
          alt="千源星"
          style={{ marginLeft: "48px", marginBottom: "12px" }}
        />
        {loginStatus == 1 ? (
          <Form
            key={loginStatus}
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item<FieldType>
              name="username"
              rules={[{ required: true, message: "请输入你的账号!" }]}
              style={{ width: "100%" }}
            >
              <Input placeholder="请输入你的账号!" style={{ width: "350px" }} />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[{ required: true, message: "请输入你的密码!" }]}
              style={{ width: "100%" }}
            >
              <Input.Password
                placeholder="请输入你的密码!"
                style={{ width: "350px" }}
              />
            </Form.Item>

            <Form.Item<FieldType> name="remember" style={{ width: "100%" }}>
              <RememberT onForget={() => {}} />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "350px", background: "#AE62E7" }}
              >
                登录
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 16 }}>
              <Button
                type="primary"
                onClick={() => {
                  setLoginStatus(2);
                  form.resetFields();
                }}
                style={{ width: "350px", background: "#AE62E7" }}
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Form
            key={loginStatus}
            form={logonForm}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinishLogon}
          >
            <Form.Item<FieldType>
              name="username"
              rules={[{ required: true, message: "请输入你的账号!" }]}
              style={{ width: "100%" }}
            >
              <Input placeholder="请输入你的账号!" style={{ width: "350px" }} />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[{ required: true, message: "请输入你的密码!" }]}
              style={{ width: "100%" }}
            >
              <Input.Password
                placeholder="请输入你的密码!"
                style={{ width: "350px" }}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 16 }}>
              <Button
                type="primary"
                loading={isLogin}
                htmlType="submit"
                style={{ width: "350px", background: "#AE62E7" }}
              >
                注册
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 16 }}>
              <a
                style={{
                  display: "block",
                  width: "350px",
                  textAlign: "center",
                  color: "#AE62E7",
                }}
                onClick={() => {
                  logonForm.resetFields();
                  setLoginStatus(1);
                }}
              >
                {"<<<返回登录"}
              </a>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
});

export default App;
