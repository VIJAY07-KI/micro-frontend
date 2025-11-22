import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "url";
import webpack from "webpack";
import { FederationTypeScriptRemotePlugin } from "@module-federation/typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/index.tsx",
  mode: "development",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "auto",
    clean: true,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  module: {
    rules: [
      { test: /\.(ts|tsx)$/, use: "ts-loader", exclude: /node_modules/ },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },

  plugins: [
    // -----------------------------
    // ⭐ Module Federation (Remote)
    // -----------------------------
    new webpack.container.ModuleFederationPlugin({
      name: "todoMFE",
      filename: "remoteEntry.js",

      exposes: {
        "./TodoApp": "./src/TodoApp.tsx",
      },

      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),

    // -----------------------------
    // ⭐ TypeScript d.ts generator
    // -----------------------------
    new FederationTypeScriptRemotePlugin({
      moduleFederationConfig: "./modulefederation.config.js",
      dts: {
        output: "./src/remoteTypes.d.ts", // ← Required (you missed this)
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],

  devServer: {
    port: 3002,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};
