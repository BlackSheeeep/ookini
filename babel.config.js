module.exports = {
  presets: [
    "@babel/preset-env", // 转换 ES6+ 代码
    "@babel/preset-react", // 如果你使用 React
  ],
  plugins: [
    "@babel/plugin-transform-modules-commonjs", // 转换模块为 CommonJS
  ],
};
