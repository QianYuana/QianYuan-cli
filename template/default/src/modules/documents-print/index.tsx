import React, { useEffect, useState } from "react";
import { Spin } from "antd";

interface IAppProps {}

const DocumentsPrint: React.FunctionComponent<IAppProps> = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <Spin spinning={loading}>
      <div>DocumentsPrint</div>
    </Spin>
  );
};

export default DocumentsPrint;
