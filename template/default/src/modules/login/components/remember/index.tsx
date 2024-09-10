import * as React from "react";
import { Checkbox } from "antd";
/**
 * @param value 是否勾选
 * @function onChange :(value: boolean) => {} 勾选回调函数
 * @function onForget :() => void 忘记密码回调函数
 */
export interface RememberType {
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

export default RememberT;
