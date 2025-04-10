import React, { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
  SlateElement,
} from "@wangeditor/editor";
import "@wangeditor/editor/dist/css/style.css";

type ImageElement = SlateElement & {
  src: string;
  alt: string;
  url: string;
  href: string;
};
interface IProps {
  onChange: (html: any) => void;
}

function MyEditor(props: IProps) {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法

  // 编辑器内容
  const [html, setHtml] = useState("<p>hello</p>");

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}; // TS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    MENU_CONF: {},
    placeholder: "请输入内容...",
  };
  // 自定义校验图片
  function customCheckImageFn(
    src: string,
    alt: string,
    url: string
  ): boolean | undefined | string {
    // TS 语法
    // function customCheckImageFn(src, alt, url) {                                                    // JS 语法
    if (!src) {
      return;
    }
    if (src.indexOf("http") !== 0) {
      return "图片网址必须以 http/https 开头";
    }
    return true;

    // 返回值有三种选择：
    // 1. 返回 true ，说明检查通过，编辑器将正常插入图片
    // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
    // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
  }
  // 转换图片链接
  function customParseImageSrc(src: string): string {
    // TS 语法
    // function customParseImageSrc(src) {               // JS 语法
    if (src.indexOf("http") !== 0) {
      return `http://${src}`;
    }
    return src;
  }
  // 确保 MENU_CONF 已经存在
  if (!editorConfig.MENU_CONF) {
    editorConfig.MENU_CONF = {};
  }
  // 插入图片
  editorConfig.MENU_CONF["insertImage"] = {
    onInsertedImage(imageNode: ImageElement | null) {
      // TS 语法
      // onInsertedImage(imageNode) {                    // JS 语法
      if (imageNode == null) return;

      const { src, alt, url, href } = imageNode;
      // console.log("inserted image", src, alt, url, href);
    },
    checkImage: customCheckImageFn, // 也支持 async 函数
    parseImageSrc: customParseImageSrc, // 也支持 async 函数
  };
  // 编辑图片
  editorConfig.MENU_CONF["editImage"] = {
    onUpdatedImage(imageNode: ImageElement | null) {
      // TS 语法
      // onUpdatedImage(imageNode) {                    // JS 语法
      if (imageNode == null) return;

      const { src, alt, url } = imageNode;
      // console.log("updated image", src, alt, url);
    },
    checkImage: customCheckImageFn, // 也支持 async 函数
    parseImageSrc: customParseImageSrc, // 也支持 async 函数
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);
  useEffect(() => {
    props.onChange(html);
  }, [html]);
  return (
    <>
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: "500px", overflowY: "hidden" }}
        />
      </div>
      <div style={{ marginTop: "15px", height: 168, overflow: "auto" }}>
        {html}
      </div>
    </>
  );
}

export default MyEditor;
