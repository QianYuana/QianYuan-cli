import React, { useEffect, useState } from "react";
import { Spin, Button, message } from "antd";
import { WangEditor } from "components";
import { Http } from "untils";
interface IAppProps {}

const Sendemail: React.FunctionComponent<IAppProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState("");

  return (
    <Spin spinning={loading}>
      <div style={{ display: "flex", height: "100%", width: "100%" }}>
        <div style={{ width: "70%", height: "100%" }}>
          <WangEditor onChange={(html) => setHtml(html)} />
        </div>
        <div style={{ width: "30%", height: "100%" }}>
          <Button
            type="primary"
            onClick={() => {
              setLoading(true);
              Http.post("/send_enmail", {})
                .then((res) => {
                  setLoading(false);
                  message.success("发送成功");
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          >
            发送邮件
          </Button>
        </div>
      </div>
    </Spin>
  );
};

export default Sendemail;
