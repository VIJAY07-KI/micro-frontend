import React, { Suspense, lazy } from "react";

// const FoodApp = lazy(() => import("foodMFE/FoodApp"));
const TodoApp = lazy(() => import("todoMFE/TodoApp"));

export default function App() {
  return (
    <div>
      <h1>Micro Frontend Host</h1>

      <h2>🍕 Food Cards</h2>
      <Suspense fallback={<p>Loading Food App...</p>}>
        {/* <FoodApp /> */}
      </Suspense>

      <h2>📝 Todo App</h2>
      <Suspense fallback={<p>Loading Todo App...</p>}>
        <TodoApp />
      </Suspense>
    </div>
  );
}
