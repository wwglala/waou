import commonjs from "@rollup/plugin-typescript";
import typescript from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";

const params = process.argv.slice(2);
const env = params.reduce((pre, cur) => {
  const [key, value = true] = cur.split("=");
  pre[key] = value;
  return pre;
}, {});

const input = env["--env"] === "dev" ? "./test/index.ts" : "./core/index.ts";
export default [
  {
    input,
    output: [
      {
        file: "./lib/index.js",
        format: "cjs",
      },
      {
        file: "./es/index.js",
        format: "es",
      },
    ],
    plugins: [typescript(), commonjs()],
  },
  {
    input: "./core/index.ts",
    output: {
      file: "./index.d.ts",
    },
    plugins: [dts()],
  },
];
