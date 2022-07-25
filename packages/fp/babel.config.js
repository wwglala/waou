const isCommonjs = process.argv.some((env) => env === "lib");

const presets = [];

if (isCommonjs) {
  presets.push([
    "@babel/preset-env",
    {
      modules: "commonjs",
    },
  ]);
}

presets.push("@babel/preset-typescript");

module.exports = {
  presets,
};
