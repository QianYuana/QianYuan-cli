import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { WangEditor } from "components";
import Print from "./components/print";
interface IAppProps {}

const DocumentsPrint: React.FunctionComponent<IAppProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState("");
  return (
    <Spin spinning={loading}>
      <div style={{ display: "flex", height: "100%", width: "100%" }}>
        <div style={{ width: "70%", height: "100%" }}>
          <WangEditor onChange={(html) => setHtml(html)} />
        </div>
        <div style={{ width: "30%", height: "100%" }}>
          <Print html={html} />
        </div>
      </div>
    </Spin>
  );
};

export default DocumentsPrint;
