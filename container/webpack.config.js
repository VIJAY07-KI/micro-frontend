import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const foodRemote = process.env.REACT_APP_FOOD_MFE || "http://localhost:3001/remoteEntry.js";
const todoRemote = process.env.REACT_APP_TODO_MFE || "http://localhost:3002/remoteEntry.js";

export default {
  entry: "./src/index.tsx",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "auto",
    clean: true
  },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, use: "ts-loader", exclude: /node_modules/ },
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new webpack.container.ModuleFederationPlugin({
      name: "container",
      remotes: {
        foodMFE: `foodMFE@${foodRemote}`,
        todoMFE: `todoMFE@${todoRemote}`
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } }
    })
  ],
  devServer: { port: 3000, historyApiFallback: true }
};
