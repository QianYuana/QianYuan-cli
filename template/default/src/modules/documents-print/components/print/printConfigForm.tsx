import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Form, Select, InputNumber } from "antd";
import PaperSize from "./components/paperSize";

interface IAppProps {
  printInit: () => void;
  ref: any;
}
type IprintList = {
  label: string;
  value: number | string;
};

const printConfig: React.FunctionComponent<IAppProps> = forwardRef(
  (props, ref) => {
    const [form] = Form.useForm();
    const { printInit } = props;
    const [iprintList, setIPrintList] = useState<IprintList[]>([]); //打印机列表
    const [paperLists, setPaperLists] = useState<IprintList[]>([]); //纸张列表
    const [paperType, setPaperType] = useState<string>("A4"); //纸张类型
    const DBstyle = {
      marginBottom: "12px",
    };
    useImperativeHandle(ref, () => ({
      form,
    }));
    //获取打印机列表
    const printList = () => {
      if (!window.LODOP) {
        printInit();
        // printList();
      }
      let iPrinterCount = window.LODOP?.GET_PRINTER_COUNT
        ? window.LODOP.GET_PRINTER_COUNT()
        : 1;
      let list = Array.from({ length: iPrinterCount }, (_, i) => {
        return {
          label: window.LODOP?.GET_PRINTER_NAME(i + 1) || "暂无启动LODOP服务",
          value: i + 1,
        };
      });
      setIPrintList(list);
      strPageSizeList(list[0]?.value);
    };
    //  获取纸张
    const strPageSizeList = (printerIndex: number) => {
      if (!window.LODOP || !window.LODOP.GET_PAGESIZES_LIST) {
        return false;
      }
      let paper = window.LODOP.GET_PAGESIZES_LIST(printerIndex, "\n");
      let paperlist = [];
      if (!(paper == "")) {
        paperlist = paper.split("\n");
      }
      paperlist.push("自定义尺寸");
      setPaperLists(
        paperlist.map((item: string) => ({ label: item, value: item }))
      );
      form.setFieldsValue({ printerPaper: paperlist[0] });
    };

    useEffect(() => {
      printList();
    }, []);

    return (
      <Form
        layout={"inline"}
        form={form}
        //   onValuesChange={onFormLayoutChange}
        style={{ maxWidth: "none" }}
        initialValues={{
          printerName: iprintList[0]?.value || 1,
          printerPaper: paperLists[0]?.value,
          printerNum: 1,
          printerSize: 13,
          printerOrientation: 1,
        }}
      >
        <Form.Item label={`打印机`} name="printerName" style={DBstyle}>
          <Select
            defaultValue={iprintList[0]?.value || 1}
            style={{ width: 300 }}
            onChange={(value) => {
              strPageSizeList(value as number);
            }}
            options={iprintList}
          />
        </Form.Item>
        <Form.Item label="打印纸张" name="printerPaper" style={DBstyle}>
          <Select
            defaultValue={paperLists[0]?.value}
            style={{ width: 300 }}
            onChange={(value) => {
              setPaperType(value as string);
            }}
            options={paperLists}
          />
        </Form.Item>
        <Form.Item label="打印份数" name="printerNum" style={DBstyle}>
          <InputNumber
            min={1}
            max={100}
            defaultValue={1}
            style={{ width: 80 }}
          />
        </Form.Item>
        <Form.Item
          // ‌1px等于0.75pt
          label="字号px"
          name="printerSize"
          style={DBstyle}
        >
          <InputNumber
            min={1}
            max={100}
            defaultValue={13}
            style={{ width: 80 }}
          />
        </Form.Item>
        <Form.Item label="打印方向" name="printerOrientation" style={DBstyle}>
          <Select
            defaultValue={1}
            style={{ width: 300 }}
            options={[
              {
                label: "纵向打印",
                value: 1,
              },
              {
                label: "横向打印",
                value: 2,
              },
              {
                label: "纵向打印，高度自适应",
                value: 3,
              },
              {
                label: "方向不定，自定义",
                value: 0,
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="纸张大小" name="paperSize" style={DBstyle}>
          <PaperSize paperType={paperType} />
        </Form.Item>
      </Form>
    );
  }
);

export default printConfig;
