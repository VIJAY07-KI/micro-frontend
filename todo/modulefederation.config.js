export default {
  name: "todoMFE",
  filename: "remoteEntry.js",
  exposes: {
    "./TodoApp": "./src/TodoApp.tsx"
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true }
  }
};
