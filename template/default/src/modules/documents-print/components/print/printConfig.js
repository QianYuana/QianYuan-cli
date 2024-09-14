/**
 * @baseTableStyle  打印表格基础样式
 */
export const baseTableStyle = `
<style> 
  table {  
    width: 100%; /* 表格宽度为100% */  
    border-collapse: collapse; /* 边框合并为一个单一的边框 */  
    margin: 20px 0; /* 上下外边距 */  
  }  
  /* 设置表格的边框样式 */  
  table, th, td {  
    border: 1px solid #ddd; /* 边框粗细、样式和颜色 */  
  }  
  
  /* 设置表头的样式 */  
  th {  
    background-color: #f2f2f2; /* 背景颜色 */  
    padding: 8px; /* 内边距 */  
    text-align: left; /* 文本左对齐 */  
  }  
  
  /* 设置表格单元格的样式 */  
  td {  
    padding: 8px; /* 内边距 */  
    text-align: left; /* 文本左对齐 */  
  }  
  
  /* 鼠标悬停在表格行上的样式 */  
  tr:hover {  
    background-color: #f5f5f5; /* 背景颜色变浅 */  
  }  
</style> `;

/**
 * @function codeRender 代码块渲染
 * @param {*} html  html文本内容
 * @returns  html文本内容
 */
export const codeRender = (html) => {
  // 正则表达式匹配完整的<code>...</code>块
  // 注意：这里假设<code>标签内没有嵌套的<code>标签或特殊字符需要转义
  const regex = /<pre><code\s*>([\s\S]*?)<\/code><\/pre>/g;

  // 使用replace方法和回调函数来替换匹配的文本
  return html.replace(regex, (match, p1) => {
    // p1 是第一个捕获组的内容，即<code>和</code>之间的文本
    return `<div style="background-color: rgb(251, 233, 230);padding: 12px ; width: 100% ; white-space: pre-wrap ;border-radius:4px">${p1}</div>`;
  });
};
