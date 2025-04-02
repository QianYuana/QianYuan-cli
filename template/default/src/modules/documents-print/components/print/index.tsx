import React, { useEffect, useState, useRef } from "react";
import { getLodop } from "./LodopFuncs";
import { Button, Select } from "antd";
import { baseTableStyle, codeRender } from "./printConfig";
import PrintConfigForm from "./printConfigForm";
import { salesSlip } from "./config/dataSource";

interface IAppProps {
  html: any;
}
declare global {
  interface Window {
    LODOP: any;
  }
}
interface ConfigType {
  form: {
    getFieldsValue: () => any;
  };
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const [message, setMessage] = useState("");
  const configRef = useRef<ConfigType | null>();
  const [printTarget, setPrintTarget] = useState("document");
  const printInit = () => {
    if (!window.LODOP) {
      let LODOP = getLodop();

      if (typeof LODOP == "string") {
        setMessage(
          "<div><font>打印控件未安装!点击这里<a href='http://www.c-lodop.com/download.html' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font></div>"
        );
        return;
      } else {
        setMessage("");
        window.LODOP = LODOP;
        return;
      }
    } else {
      setMessage("");
    }
  };
  const execution = ({ text = "预览打印文档", type = "1" }) => {
    if (!window.LODOP) {
      printInit();
    }
    const {
      paperSize,
      printerName,
      printerNum,
      printerOrientation,
      printerPaper,
      printerSize,
    } = configRef.current?.form?.getFieldsValue();
    window.LODOP.PRINT_INIT(text); //打印初始化
    window.LODOP.SEND_PRINT_RAWDATA(printerName); //设置打印机
    window.LODOP.SET_PRINTER_INDEX(printerName); //设置打印机序号
    window.LODOP.SET_PRINT_PAGESIZE(
      printerOrientation,
      paperSize.width || 0,
      paperSize.height || 0,
      printerPaper
    ); //设置纸张
    window.LODOP.SET_PRINT_COPIES(printerNum || 1); //设置打印份数
    window.LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "Auto-Width"); //按整宽不变形缩放
    window.LODOP.SET_SHOW_MODE("AUTO_CLOSE_PREWINDOW", true); // 打印完后自动关闭窗口
    let strStyle = baseTableStyle;
    const textHeight: number | any =
      document.getElementById("w-e-textarea-1")?.clientHeight;
    window.LODOP.ADD_PRINT_RECT(27,27,634,textHeight,0,1); //打印区域  左 上 右 下
    // let html = ;
    window.LODOP.ADD_PRINT_HTM(
      27,
      27,
      634,
      textHeight,
      strStyle + "<div id='print-footer'>" + codeRender(printTarget == "document" ? props.html : salesSlip) + "</div>"
    ); //打印html
    const footerHeight: number | any =
      document.getElementById("print-footer")?.clientHeight;
    window.LODOP.ADD_PRINT_TEXT(
      footerHeight + 20,
      27,
      634,
      30,
      "注：测试底部文字，测试底部文字，测试底部文字，测试底部文字，测试底部文字，测试底部文字，测试底部文字，测试底部文字，测试底部文字，测试底部文字，"
    );
    window.LODOP.SET_PRINT_STYLEA(1, "FontSize", printerSize); //字体大小
    window.LODOP.SET_PRINT_STYLEA(1, "Bold", 1); //字体加粗
    type === "1" ? window.LODOP.PREVIEW() : window.LODOP.PRINT();
  };
  useEffect(() => {
    setTimeout(() => {
      printInit();
      clearTimeout(1);
    }, 1000);
  }, []);
  return (
    <div style={{ width: "100%", height: "100%", padding: "0 12px" }}>
      {message === "" ? (
        <div></div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: message }}></div>
      )}
      <div>
        <PrintConfigForm ref={configRef} printInit={printInit} />
      </div>
      <div
        style={{ marginBottom: "12px", display: "flex", alignItems: "center" }}
      >
        <p>打印模版：</p>
        <Select
          defaultValue="document"
          style={{ width: 120 }}
          onChange={(value: string) => {
            setPrintTarget(value);
          }}
          options={[
            {
              value: "document",
              label: "左侧文档",
            },
            {
              value: "salesSlip",
              label: "销售单",
            },
          ]}
        />
      </div>
      <div style={{ display: "flex" }}>
        <Button
          type="primary"
          onClick={() => {
            execution({ text: "直接打印文档", type: "2" });
          }}
          style={{ marginRight: "12px" }}
        >
          打印
        </Button>
        <Button
          type="primary"
          onClick={() => {
            execution({ text: "预览打印文档", type: "1" });
          }}
        >
          预览打印
        </Button>
      </div>
    </div>
  );
};

export default App;
