import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { fileURLToPath } from "url";

const { ModuleFederationPlugin } = webpack.container;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/index.tsx",

  mode: "development",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "auto",
    clean: true
  },

  devServer: {
    port: 3000,
    historyApiFallback: true
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        exclude: /node_modules/,
        use: "ts-loader"
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        foodMFE: "foodMFE@http://localhost:3001/remoteEntry.js",
        todoMFE: "todoMFE@http://localhost:3002/remoteEntry.js"
      }
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
