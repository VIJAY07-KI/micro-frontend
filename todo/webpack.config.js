const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",

  devServer: {
    port: 3002,
    static: path.resolve(__dirname, "public"),
    hot: true,
    historyApiFallback: true,
  },

  output: {
    publicPath: "auto",
    clean: true
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },

  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
      { test: /\.css$/i, use: ["style-loader", "css-loader"] }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "todoMFE",
      filename: "remoteEntry.js",
      exposes: {
        "./TodoApp": "./src/TodoApp.tsx"
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.2.0" },
        "react-dom": { singleton: true, requiredVersion: "^18.2.0" }
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
