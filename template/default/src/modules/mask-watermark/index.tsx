import React, { useEffect, useState } from "react";
import { AntDesignOutlined } from "@ant-design/icons";
import {
  Spin,
  Watermark,
  Form,
  Switch,
  ColorPicker,
  Button,
  ConfigProvider,
} from "antd";
import { createStyles, ThemeProvider } from "antd-style";

interface IAppProps {}

const MaskWaterMark: React.FunctionComponent<IAppProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [num, setNum] = useState(0);
  const [switchBool, setSwitchBool] = useState(false);
  const [colors, setColors] = useState<any>("rgb(16, 142, 233)");
  const useStyles = createStyles(
    ({ token, css, prefixCls, iconPrefixCls }, props: { btnColor: string }) => {
      const buttonClass = css`
        background-color: #3498db;
        border: none;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
        font-size: 16px;
        padding: 12px 24px;

        &:hover {
          background-color: #2980b9;
        }
      `;
      return {
        grayscale: {
          position: "relative",
          filter: "grayscale(100%)",
          "-webkit-filter": "grayscale(100%)",
          "-moz-filter": "grayscale(100%)",
          "-ms-filter": "grayscale(100%)",
          "-o-filter": "grayscale(100%)",
          "&::after": {
            position: "absolute",
            zIndex: "999",
            content: '""',
            left: "0px",
            right: "0px",
            bottom: "0px",
            top: "0px",
            background: "rgba(0,0,0,.3)",
          },
        },

        operation: css`
          & .${prefixCls}-btn {
            padding: "0px 8px";
            color: " #fff";
            //可以使用props.btnColor 也可以使用colors
            //注意 这个一定要放在btn组件的上一级
            background-color: ${colors};
            border-color: ${colors};
            &:hover,
            &:focus {
              background-color: #6193ff;
              border-color: #6193ff;
            }
            &:active,
            &.active:focus {
              background-color: #6193ff;
              border-color: #6193ff;
            }
          }
        `,
        containerClass: css`
          display: flex;
          flex-direction: column;
          align-items: center;

          .button-wrapper {
            margin-top: 24px;
            //buttonClass 的 样式 会合并到 .button-wrapper里
            //Css方法默认不生成className，你需要这种级联的话，在需要classname的地方加个cx
            ${buttonClass} {
              font-size: 20px;
            }
          }
        `,
      };
    }
  );
  const { styles } = useStyles({ btnColor: colors });
  return (
    <Spin spinning={loading}>
      <div style={{ display: "flex", height: "100%", width: "100%" }}>
        <Watermark content={["千源星", "QIANYUANX"]} style={{ width: "70%" }}>
          <div
            className={`${switchBool && styles.grayscale}`}
            style={{
              width: "100%",
              height: "100%",
              padding: "20px",
              border: "1px solid #ccc",
              minHeight: 600,
            }}
          >
            <div className={styles.operation}>
              <Button
                type="primary"
                size="large"
                icon={<AntDesignOutlined />}
                onClick={() => setNum(num + 1)}
              >
                点击
              </Button>
              <p>点击次数：{num}</p>
            </div>
          </div>
        </Watermark>
        <div style={{ width: "30%", height: "100%", marginLeft: 12 }}>
          <p>
            由于当前项目中使用的
            <span style={{ color: "#007bff" }}>"antd": "^5.19.2"</span>
            所以使用 <span style={{ color: "#007bff" }}>"antd-style"</span>
          </p>
          <Form>
            <Form.Item label="遮罩层">
              <Switch
                value={switchBool}
                checkedChildren="开启"
                unCheckedChildren="关闭"
                defaultChecked
                onChange={(checked) => setSwitchBool(checked)}
              />
            </Form.Item>
            <Form.Item label="按钮颜色">
              <ColorPicker
                showText
                value={colors}
                onChange={(v) => {
                  console.log(v.toHexString());

                  setColors(v.toHexString());
                }}
              />
              {/* <ConfigProvider prefixCls={"cp"} iconPrefixCls={"cpicon"}>   //他的作用就是把antd的样式前缀修改为cp  起到样式隔离作用
                <Button
                  type="primary"
                  size="large"
                  icon={<AntDesignOutlined />}
                  onClick={() => setNum(num + 1)}
                >
                  点击2
                </Button>
              </ConfigProvider> */}
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default MaskWaterMark;
