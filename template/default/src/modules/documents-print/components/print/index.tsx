import React, { useEffect, useState } from "react";
import { getLodop } from "./LodopFuncs";
import { Button } from "antd";
import { baseTableStyle, codeRender } from "./printConfig";

interface IAppProps {
  html: any;
}
declare global {
  interface Window {
    LODOP: any;
  }
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const [message, setMessage] = useState("");
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
  const printPageView = () => {
    if (!window.LODOP) {
      printInit();
    }
    // console.log(codeRender(props.html));
    window.LODOP.PRINT_INIT("预览打印文档"); //打印初始化
    let strStyle = baseTableStyle;
    const textHeight: number | any =
      document.getElementById("w-e-textarea-1")?.clientHeight;
    // window.LODOP.ADD_PRINT_RECT(27,27,634,textHeight,0,1); //打印区域  左 上 右 下
    window.LODOP.SET_PRINT_STYLEA(2, "FontSize", 18); //字体大小
    window.LODOP.SET_PRINT_STYLEA(2, "Bold", 1); //字体加粗
    window.LODOP.ADD_PRINT_HTM(
      27,
      27,
      634,
      textHeight,
      strStyle + "<div>" + codeRender(props.html) + "</div>"
    ); //打印html
    window.LODOP.ADD_PRINT_TEXT(
      textHeight + 20,
      27,
      634,
      30,
      "注：其中《表单一》按显示大小，《表单二》在程序控制宽度(285px)内自适应调整"
    );
    window.LODOP.PREVIEW(); //最后一个打印(预览)语句
  };
  const printStart = () => {
    if (!window.LODOP) {
      printInit();
    }
    window.LODOP.PRINT_INIT("直接打印文档"); //打印初始化
    let strStyle = `<style> 打印的样式需要写在这里，下面引入</style> `;
    window.LODOP.ADD_PRINT_HTM(100, "5%", "90%", 450, strStyle + props.html);
    window.LODOP.PRINT(); //最后一个打印(直接打印)语句
  };
  useEffect(() => {
    setTimeout(() => {
      printInit();
    }, 1000);
  }, []);
  return (
    <div style={{ width: "100%", height: "100%", padding: "0 12px" }}>
      {message === "" ? (
        <div></div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: message }}></div>
      )}
      <div style={{ display: "flex" }}>
        <Button
          type="primary"
          onClick={printStart}
          style={{ marginRight: "12px" }}
        >
          打印
        </Button>
        <Button type="primary" onClick={printPageView}>
          预览打印
        </Button>
      </div>
    </div>
  );
};

export default App;
