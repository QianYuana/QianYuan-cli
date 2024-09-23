# QianYuan-cli

QianYuan-cli 是通过深入学习，尝试自己搭建的脚手架。

**计划：** 目前主要支持 React(学习工程化中),搭建一个基础模版，可通过命令选择进行下载模版。  

**支持的脚手架：** 为了方便更多的选择，同时集成了 Vue-Cli、Vite、Create-React-App....

**技术选型：** 集成 Webpack、Babel、node、inquirer、ora...... 

**目前进度：** 目前还在基础搭建模版中，后续会增加功能。

## 1.安装

先把代码 mock 到本地

```
git clone https://github.com/qianyuan-cli/qianyuan-cli.git
cd qianyuan-cli
```

## 2.使用

在文件夹内进行全局安装

```
npm install -g .
```

使用命令

```
QianYuan create   // 创建项目
QianYuan help     // 帮助
QianYuan --version | -v  // 查看版本

```
## 3.模版文件夹（template/default）

### 模版框架技术选型：
- 语言：React v18 + TypeScript
- 构建打包工具：Webpack
- 编译工具：babel
- 状态管理：mobx
- 路由：react-router v6 
- keepAlive缓存：react-activation
- 请求：axios
- 样式：sass 
- 命令工具: concurrently
- UI库：Ant Design
- 文档编辑器：wangeditor 5
- 打印：c-lodop
- 可视化3d：three.js
### 框架已完成功能：
- 基础配置 ：
    - webpack配置：多页面打包配置
    - babel配置：ts、js、jsx、es6转码
    - node命令工具：concurrently 多任务同时执行
    - 静态资源配置：静态资源路径配置
    - 公共组件工具配置：components、utils 路径配置
- 路由配置 ：
    - 路由配置：react-router v6 基础路由配置
    - keepAlive缓存：react-activation 路由缓存配置
    - 路由懒加载：lazy 路由懒加载配置
    - 路由拦截：token 验证路由拦截配置
- 状态管理 ：
    - 状态管理：mobx 基础配置
    - 全局状态管理：项目已经配置全局AppStore管理
- 网络请求 ：
    - 请求封装：axios 基础配置
    - 拦截器配置：axios 拦截器配置
- 样式配置
    - 样式封装：sass 基础配置
- UI库配置
    - Ant Design 基础配置





