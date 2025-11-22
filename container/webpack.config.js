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
    filename: "[name].js",
    publicPath: "auto"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
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
        todoMFE: "todoMFE@https://todo-micro-frontend.vercel.app/remoteEntry.js",
        foodMFE: "foodMFE@https://card-micro-frontend.vercel.app/remoteEntry.js"
      },

      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true }
      }
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],

  devServer: {
    port: 3000,
    historyApiFallback: true
  }
};
