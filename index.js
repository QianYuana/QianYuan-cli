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

// console.log(process.argv, "ceshi");
if (process.argv.includes("--version") || process.argv.includes("-v")) {
  console.log(`create_QianYuan version: ${version}`);
  process.exit(0); //立即终止 Node.js 进程的
}
if (process.argv.includes("create")) {
  main();
}

async function main() {
  console.log("欢迎使用秦归的脚手架");
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
      {
        type: "list",
        name: "vueTemplate",
        message: "请选择你要是用的模版？",
        when: (answers) => answers.operation === "Vue",
        choices: ["Vue Cli", "Vite(仅支持Vue3)"],
      },
      {
        type: "list",
        name: "vueTemplate2",
        message: "请选择你要是用的Vue语言的模版？",
        when: (answers) => answers.vueTemplate === "Vue Cli",
        choices: ["Vue2", "Vue3"],
      },
      {
        type: "list",
        name: "ReactTemplate",
        message: "请选择你要是用的模版？",
        when: (answers) => answers.operation === "React",
        choices: ["create-react-app", "Vite(默认函数)", "默认自己搭建的模版"],
      },
      {
        type: "list",
        name: "ReactTemplate",
        message: "请选择你要是用的模版？",
        when: (answers) => answers.operation === "React",
        choices: ["create-react-app", "Vite(默认函数)"],
      },
      {
        type: "list",
        name: "lage",
        message: "请选择你要是用的语言？",
        when: (answers) => answers.vueTemplate === "Vite(仅支持Vue3)",
        choices: ["JavaScript", "TypeScript"],
      },
    ])
    .then(async (answers) => {
      console.log("请稍等片刻，正在为你下载资源...");
      const { name, operation } = answers;
      const command = operation === "Vue" ? "vue" : "react";
      const spinner = ora(`正在下载 ${operation}项目模版...`).start();
      const targetDir = process.cwd();
      const createDir = async (dir) => {
        fs.mkdir(`./${name}`, (err) => {
          if (err) {
            console.log("创建文件夹失败", err);
            return;
          }
        });
        // 复制 template 文件夹到目标文件夹
        const templatePath = path.join(__dirname, `template/${dir}`);
        await copy(templatePath, `${targetDir}/${name}`);
        // console.log(`模板文件已复制到 ${targetDir}`);

        const { stdout, stderr } = await execPromise(
          `cd ./${name} & npm install `
        );
        spinner.succeed(`${operation}模版 下载完成！`);
        console.log(stdout);
        if (stderr) {
          console.error(`Stderr: ${stderr}`);
        }
      };
      try {
        if (operation == "Vue") {
          if (answers.vueTemplate === "Vue Cli") {
            if (answers.vueTemplate2 === "Vue3") {
              await createDir("Vue-cli-vue3");
            } else if (answers.vueTemplate2 === "Vue2") {
              await createDir("Vue-cli-vue2");
            }
          } else if (answers.vueTemplate === "Vite(仅支持Vue3)") {
            if (answers.lage === "TypeScript") {
              await execPromise(
                `npm create vite@latest ${name} -- --template vue-ts `
              );
              spinner.succeed(
                `${operation}-${answers.vueTemplate}-ts 下载完成！`
              );
            } else {
              await execPromise(
                `npm create vite@latest ${name} -- --template vue `
              );
              spinner.succeed(`${operation}-${answers.vueTemplate} 下载完成！`);
            }
          }
        } else if (operation == "React") {
          if (answers.ReactTemplate === "create-react-app") {
            createDir("react-app");
          } else if (answers.ReactTemplate === "Vite(默认函数)") {
            if (answers.lage === "TypeScript") {
              await execPromise(
                `npm create vite@latest ${name} -- --template react-ts `
              );
              spinner.succeed(
                `${operation}-${answers.ReactTemplate}-ts 下载完成！`
              );
            } else {
              await execPromise(
                `npm create vite@latest ${name} -- --template react `
              );
              spinner.succeed(
                `${operation}-${answers.ReactTemplate} 下载完成！`
              );
            }
          } else if (answers.ReactTemplate === "默认自己搭建的模版") {
            await createDir("default");
          }
        }

        console.log("下载完成，可以开始你的路途了！！！");
      } catch (error) {
        spinner.fail(`下载 ${operation} 失败: ${error.message}`);
      }
    });
}
