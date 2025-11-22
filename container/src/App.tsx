import React, { Suspense, lazy } from "react";
import ErrorBoundary from "./ErrorBoundary";

// Must match remote names in webpack.config.js
const TodoApp = lazy(() => import("todoMFE/TodoApp"));
const FoodApp = lazy(() => import("foodMFE/FoodApp"));

export default function App() {
  return (
    <div>
      <h1>Micro Frontend Host</h1>

      <h2>🍕 Food Cards</h2>
      <Suspense fallback={<p>Loading Food App...</p>}>
        <ErrorBoundary>
          <FoodApp />
        </ErrorBoundary>
      </Suspense>

      <h2>📝 Todo App</h2>
      <Suspense fallback={<p>Loading Todo App...</p>}>
        <ErrorBoundary>
          <TodoApp />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}
