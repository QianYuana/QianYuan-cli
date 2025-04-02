#!/usr/bin/env node
import path from "path";
import spawn from "cross-spawn";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

// 获取当前文件的路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前文件的目录
const __dirname = path.dirname(__filename);
// 获取项目的根目录
const projectRoot = path.resolve(__dirname, "..");

// 读取 package.json 以获取版本号
const packageJsonPath = path.join(projectRoot, "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
const version = packageJson.version;

const script = process.argv[2]; // 获取脚本名称
const args = process.argv.slice(3); // 获取脚本参数
// console.log(process.argv, "ceshi");

var result;

switch (script) {
  case "-v":
  case "--version":
    console.log(`QianYuan-cli version: ${version}`);
    process.exit(0); //立即终止 Node.js 进程的
    break;
  case "build":
  case "buildDll":
  case "dev":
  case "upload":
  case "create":
    const scriptPath = path.resolve(__dirname, "..", "lib", script + ".js"); // 需要执行的文件路径
    console.log(scriptPath);
    console.log("欢迎使用QianYuan📦工具：" + version);
    // const action=require(`../lib/${script}`);
    result = spawn.sync(
      "node",
      ["--max_old_space_size=8192", scriptPath].concat(args),
      { stdio: "inherit" } // eslint-disable-line
    );
    process.exit(result.status);
    break;
  case "--help":
  case "-h":
    // console.log("欢迎使用QianYuan📦工具：" + version);
    console.log(
      `QianYuan -v/--version -----获取版本号 \nQianYuan -h/--help -----查看帮助信息 \nQianYuan create -----创建项目`
    );
    process.exit(0); //立即终止 Node.js 进程的
    break;
  default:
    console.log(`Unknown script ${chalk.cyan(script)}.`); //chalk.cyan(script) 会将 script 变量的值用青色（cyan）高亮显示，以便用户更容易识别。
    break;
}

// result = spawn.sync(...):

// 这行代码使用 spawn.sync 方法同步地执行一个新的 Node.js 进程。spawn.sync 是 child_process 模块提供的一个方法，用于在当前 Node.js 进程中同步地启动一个新的子进程。
// 第一个参数 "node" 表示要执行的命令是 node，即启动一个新的 Node.js 进程。
// 第二个参数是一个数组，包含了传递给 node 命令的参数：
// "--max_old_space_size=8192" 是一个 Node.js 的运行时选项，用于设置 V8 引擎的堆内存上限为 8192MB（8GB），以避免内存不足的问题。
// require.resolve(../lib/${script}) 会解析并返回 ../lib/init 文件的绝对路径，这是 init 命令对应的执行脚本。
// args 是从命令行参数中获取的额外参数，这些参数会被传递给 init 脚本。
// 第三个参数 { stdio: "inherit" } 表示子进程的标准输入、输出和错误输出会被继承到父进程，这样子进程的输出会直接显示在父进程的控制台中。
