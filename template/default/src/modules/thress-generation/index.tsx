import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import ThreeModal from "./components/three-modal";

interface IAppProps {}

const DocumentsPrint: React.FunctionComponent<IAppProps> = observer((props) => {
  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState("");
  return (
    <Spin spinning={loading}>
      <div style={{ display: "flex", height: "100%", width: "100%" }}>
        <div id="tree-canvas" style={{ width: "70%", height: "100%" }}>
          <ThreeModal></ThreeModal>
        </div>
        <div style={{ width: "30%", height: "100%" }}></div>
      </div>
    </Spin>
  );
});

export default DocumentsPrint;
