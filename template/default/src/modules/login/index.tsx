import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import "./index.scss";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
interface IAppProps {}
interface RememberType {
  /**
   *
   * @param value 是否勾选
   * @function onChange :(value: boolean) => {} 勾选回调函数
   * @function onForget :() => void 忘记密码回调函数
   */
  onChange?: (value: boolean) => {};
  value?: boolean;
  onForget: () => void;
}
const RememberT = (props: RememberType) => {
  return (
    <div
      style={{
        width: "350px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Checkbox
        onChange={(e) => props.onChange && props.onChange(e.target.checked)}
        checked={props.value}
      >
        记住密码
      </Checkbox>
      <a href="#" onClick={props.onForget}>
        忘记密码?
      </a>
    </div>
  );
};
const App: React.FunctionComponent<IAppProps> = (props) => {
  const [loginStatus, setLoginStatus] = useState<number>(1);
  const [form] = Form.useForm(); //登录表单
  const [logonForm] = Form.useForm(); //注册表单
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
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
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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
                }}
                style={{ width: "350px", background: "#AE62E7" }}
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Form
            form={logonForm}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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
};

export default App;
