const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCss = require("mini-css-extract-plugin");
const CriticalCssPlugin = require("critical-css-webpack-plugin");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(scss)$/,
        use: [miniCss.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          outputPath: "images",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new miniCss({
      filename: "style.css",
    }),
    new CriticalCssPlugin({
      base: path.resolve(__dirname, "dist"),
      src: "./src/index.html",
      target: {
        html: "index.html",
        uncritical: "style.css",
      },
      inline: true,
      extract: false,
      dimensions: [
        { width: 320, height: 568 }, // iPhone 5
        { width: 768, height: 1024 }, // iPad
        { width: 1280, height: 800 }, // Desktop
      ],
    }),
  ],
};
