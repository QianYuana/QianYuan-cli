#!/usr/bin/env node

import inquirer from "inquirer";
import { exec } from "child_process";
import ora from "ora";
import { promisify } from "util";
import { copy } from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
const execPromise = promisify(exec);
import fs, { readFileSync } from "fs";
// const templateDir = path.resolve("template");
// 获取当前文件的路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取 package.json 以获取版本号
const packageJsonPath = path.join(__dirname, "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
const version = packageJson.version;

console.log(process.argv, "ceshi");
if (process.argv.includes("--version") || process.argv.includes("-v")) {
  console.log(`create_QianYuan version: ${version}`);
  process.exit(0); //立即终止 Node.js 进程的
}
if (process.argv.includes("create")) {
  main();
  process.exit(0);
}

async function main() {
  console.log("欢迎使用小源的脚手架");
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "请输入你的项目名称：",
      },
      {
        type: "list",
        name: "operation",
        message: "请选择要使用的语言：",
        choices: ["Vue", "React"],
      },
    ])
    .then(async (answers) => {
      console.log("请稍等片刻，小源正在为你下载资源...");
      const { name, operation } = answers;
      const command = operation === "Vue" ? "vue" : "react";
      const spinner = ora(`正在下载 ${operation}项目模版...`).start();
      const targetDir = process.cwd();
      try {
        fs.mkdir(`./${name}`, (err) => {
          if (err) {
            console.log("创建文件夹失败", err);
            return;
          }
        });
        // 复制 template 文件夹到目标文件夹
        const templatePath = path.join(__dirname, "template");
        await copy(templatePath, `${targetDir}/${name}`);
        // console.log(`模板文件已复制到 ${targetDir}`);

        const { stdout, stderr } = await execPromise(
          `cd ./${name} & npm install `
        );
        spinner.succeed(`${operation} 下载完成！`);
        console.log(stdout);
        if (stderr) {
          console.error(`Stderr: ${stderr}`);
        }
        console.log("下载完成，可以开始你的路途了！！！");
      } catch (error) {
        spinner.fail(`下载 ${operation} 失败: ${error.message}`);
      }
    });
}
