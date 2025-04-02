import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import inquirer from "inquirer";
import { exec } from "child_process";
import { copy } from "fs-extra";
import { fileURLToPath } from "url";
import { promisify } from "util";
import path from "path";
import ora from "ora";
import fs from "fs";
var execPromise = promisify(exec);
export default function main() {
  return _main.apply(this, arguments);
}
function _main() {
  _main = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    var filename, dirname, projectRoot;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          // 获取当前文件的路径
          filename = fileURLToPath(import.meta.url); // 获取当前文件的目录
          dirname = path.dirname(filename); // 获取项目的根目录
          projectRoot = path.resolve(dirname, "..");
          console.log("欢迎使用QianYuan📦工具：");
          inquirer.prompt([{
            type: "input",
            name: "name",
            message: "请输入你的项目名称："
          }, {
            type: "list",
            name: "operation",
            message: "请选择要使用的语言：",
            choices: ["Vue", "React"]
          }, {
            type: "list",
            name: "vueTemplate",
            message: "请选择你要是用的模版？",
            when: function when(answers) {
              return answers.operation === "Vue";
            },
            choices: ["Vue Cli", "Vite(仅支持Vue3)"]
          }, {
            type: "list",
            name: "vueTemplate2",
            message: "请选择你要是用的Vue语言的模版？",
            when: function when(answers) {
              return answers.vueTemplate === "Vue Cli";
            },
            choices: ["Vue2", "Vue3"]
          }, {
            type: "list",
            name: "ReactTemplate",
            message: "请选择你要是用的模版？",
            when: function when(answers) {
              return answers.operation === "React";
            },
            choices: ["create-react-app", "Vite(默认函数)", "默认自己搭建的模版"]
          }, {
            type: "list",
            name: "ReactTemplate",
            message: "请选择你要是用的模版？",
            when: function when(answers) {
              return answers.operation === "React";
            },
            choices: ["create-react-app", "Vite(默认函数)"]
          }, {
            type: "list",
            name: "lage",
            message: "请选择你要是用的语言？",
            when: function when(answers) {
              return answers.vueTemplate === "Vite(仅支持Vue3)";
            },
            choices: ["JavaScript", "TypeScript"]
          }]).then(/*#__PURE__*/function () {
            var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee2(answers) {
              var name, operation, command, spinner, targetDir, createDir;
              return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    console.log("请稍等片刻，正在为你下载资源...");
                    name = answers.name, operation = answers.operation;
                    command = operation === "Vue" ? "vue" : "react";
                    spinner = ora("\u6B63\u5728\u4E0B\u8F7D ".concat(operation, "\u9879\u76EE\u6A21\u7248...")).start();
                    targetDir = process.cwd(); // 当前操作的目标文件夹
                    // console.log(targetDir);
                    createDir = /*#__PURE__*/function () {
                      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(dir) {
                        var templatePath, _yield$execPromise, stdout, stderr;
                        return _regeneratorRuntime.wrap(function _callee$(_context) {
                          while (1) switch (_context.prev = _context.next) {
                            case 0:
                              fs.mkdir("./".concat(name), function (err) {
                                if (err) {
                                  console.log("创建文件夹失败", err);
                                  return;
                                }
                              });
                              // 复制 template 文件夹到目标文件夹
                              templatePath = path.join(projectRoot, "template/".concat(dir));
                              _context.next = 4;
                              return copy(templatePath, "".concat(targetDir, "/").concat(name));
                            case 4:
                              _context.next = 6;
                              return execPromise("cd ./".concat(name, " & npm install "));
                            case 6:
                              _yield$execPromise = _context.sent;
                              stdout = _yield$execPromise.stdout;
                              stderr = _yield$execPromise.stderr;
                              spinner.succeed("".concat(operation, "\u6A21\u7248 \u4E0B\u8F7D\u5B8C\u6210\uFF01"));
                              // console.log(stdout);
                              if (stderr) {
                                console.error("Stderr: ".concat(stderr));
                              }
                            case 11:
                            case "end":
                              return _context.stop();
                          }
                        }, _callee);
                      }));
                      return function createDir(_x2) {
                        return _ref2.apply(this, arguments);
                      };
                    }();
                    _context2.prev = 6;
                    if (!(operation == "Vue")) {
                      _context2.next = 31;
                      break;
                    }
                    if (!(answers.vueTemplate === "Vue Cli")) {
                      _context2.next = 19;
                      break;
                    }
                    if (!(answers.vueTemplate2 === "Vue3")) {
                      _context2.next = 14;
                      break;
                    }
                    _context2.next = 12;
                    return createDir("Vue-cli-vue3");
                  case 12:
                    _context2.next = 17;
                    break;
                  case 14:
                    if (!(answers.vueTemplate2 === "Vue2")) {
                      _context2.next = 17;
                      break;
                    }
                    _context2.next = 17;
                    return createDir("Vue-cli-vue2");
                  case 17:
                    _context2.next = 29;
                    break;
                  case 19:
                    if (!(answers.vueTemplate === "Vite(仅支持Vue3)")) {
                      _context2.next = 29;
                      break;
                    }
                    if (!(answers.lage === "TypeScript")) {
                      _context2.next = 26;
                      break;
                    }
                    _context2.next = 23;
                    return execPromise("npm create vite@latest ".concat(name, " -- --template vue-ts "));
                  case 23:
                    spinner.succeed("".concat(operation, "-").concat(answers.vueTemplate, "-ts \u4E0B\u8F7D\u5B8C\u6210\uFF01"));
                    _context2.next = 29;
                    break;
                  case 26:
                    _context2.next = 28;
                    return execPromise("npm create vite@latest ".concat(name, " -- --template vue "));
                  case 28:
                    spinner.succeed("".concat(operation, "-").concat(answers.vueTemplate, " \u4E0B\u8F7D\u5B8C\u6210\uFF01"));
                  case 29:
                    _context2.next = 51;
                    break;
                  case 31:
                    if (!(operation == "React")) {
                      _context2.next = 51;
                      break;
                    }
                    if (!(answers.ReactTemplate === "create-react-app")) {
                      _context2.next = 36;
                      break;
                    }
                    createDir("react-app");
                    _context2.next = 51;
                    break;
                  case 36:
                    if (!(answers.ReactTemplate === "Vite(默认函数)")) {
                      _context2.next = 48;
                      break;
                    }
                    if (!(answers.lage === "TypeScript")) {
                      _context2.next = 43;
                      break;
                    }
                    _context2.next = 40;
                    return execPromise("npm create vite@latest ".concat(name, " -- --template react-ts "));
                  case 40:
                    spinner.succeed("".concat(operation, "-").concat(answers.ReactTemplate, "-ts \u4E0B\u8F7D\u5B8C\u6210\uFF01"));
                    _context2.next = 46;
                    break;
                  case 43:
                    _context2.next = 45;
                    return execPromise("npm create vite@latest ".concat(name, " -- --template react "));
                  case 45:
                    spinner.succeed("".concat(operation, "-").concat(answers.ReactTemplate, " \u4E0B\u8F7D\u5B8C\u6210\uFF01"));
                  case 46:
                    _context2.next = 51;
                    break;
                  case 48:
                    if (!(answers.ReactTemplate === "默认自己搭建的模版")) {
                      _context2.next = 51;
                      break;
                    }
                    _context2.next = 51;
                    return createDir("default");
                  case 51:
                    console.log("下载完成，可以开始你的路途了！！！");
                    _context2.next = 57;
                    break;
                  case 54:
                    _context2.prev = 54;
                    _context2.t0 = _context2["catch"](6);
                    spinner.fail("\u4E0B\u8F7D ".concat(operation, " \u5931\u8D25: ").concat(_context2.t0.message));
                  case 57:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2, null, [[6, 54]]);
            }));
            return function (_x) {
              return _ref.apply(this, arguments);
            };
          }());
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _main.apply(this, arguments);
}
if (import.meta.url === new URL(import.meta.url).href) {
  main();
}