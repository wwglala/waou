import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
const fs = require("fs");
const path = require("path");

const params = process.argv.slice(2);
const env = params.reduce((pre, cur) => {
  const [key, value = true] = cur.split("=");
  pre[key] = value;
  return pre;
}, {});

const getFiles = (src, aim) => {
  const data = fs.statSync(src);
  if (data.isDirectory()) {
    const files = fs.readdirSync(src);
    files.forEach((item) => {
      getFiles(path.join(src, `./${item}`), aim);
    });
  } else {
    const name = src.split("\\").slice(-1)[0].split(".")[0];
    aim[name] = src;
  }
};
const aim = {};

getFiles(path.resolve(__dirname, "./core"), aim);

const output = (ctx) => {
  const names = ctx.facadeModuleId.split("\\").slice(7);
  names.pop();
  return names.join("/") ? names.join("/") + "/[name].js" : "[name].js";
};

const input = env["--env"] === "dev" ? "./test/index.ts" : aim;
export default [
  {
    input,
    output: [
      // {
      //   file: "./umd/index.js",
      //   format: "umd",
      //   name: "fp",
      // },
      {
        dir: "es",
        format: "es",
        entryFileNames: output,
      },
      {
        dir: "lib",
        format: "cjs",
        entryFileNames: output,
      },
    ],
    plugins: [typescript(), commonjs()],
    experimentalCodeSplitting: true,
  },
  {
    input: "./core/index.ts",
    output: {
      file: "./index.d.ts",
    },
    plugins: [dts()],
  },
];
