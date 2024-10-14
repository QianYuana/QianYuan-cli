import React, { useEffect, useState } from "react";
import { InputNumber } from "antd";

interface IAppProps {
  onChange?: (size: {
    width: number | undefined | null | 0;
    height: number | undefined | null | 0;
  }) => void;
  paperType: string;
}

const PaperSize: React.FunctionComponent<IAppProps> = (props) => {
  const [width, setWidth] = useState<number | undefined | null | 0>();
  const [height, setHeight] = useState<number | undefined | null | 0>();
  useEffect(() => {
    props.onChange &&
      props.onChange({
        width,
        height,
      });
  }, [width, height]);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <InputNumber
        min={0}
        value={width}
        placeholder="0.1mm"
        disabled={props.paperType !== "自定义尺寸"}
        onChange={(v) => setWidth(v || 0)}
      />
      <span style={{ margin: "0 5px" }}>X</span>
      <InputNumber
        min={0}
        value={height}
        placeholder="0.1mm"
        disabled={props.paperType !== "自定义尺寸"}
        onChange={(v) => setHeight(v || 0)}
      />
    </div>
  );
};

export default PaperSize;
