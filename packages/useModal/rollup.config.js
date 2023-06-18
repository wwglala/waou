import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "./index.ts",
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
    external: ["react", "react-dom"],
    plugins: [
      typescript(),
      resolve(),
      commonjs(),
      babel({
        exclude: "node_modules/**",
      }),
    ],
  },
  {
    input: "./index.ts",
    output: {
      file: "./index.d.ts",
    },
    plugins: [dts()],
  },
];
