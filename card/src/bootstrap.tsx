import React from "react";
import { createRoot } from "react-dom/client";
import FoodApp from "./FoodApp";

const root = createRoot(document.getElementById("root")!);
root.render(<FoodApp />);
