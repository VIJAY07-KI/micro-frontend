import React from "react";
import { foods } from "./FoodData";

export default function FoodApp() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
      {foods.map((food) => (
        <div
          key={food.name}
          style={{
            padding: 20,
            border: "1px solid #ccc",
            borderRadius: 20,
            textAlign: "center"
          }}
        >
          <img
            src="https://via.placeholder.com/180"
            style={{ width: 120, height: 120, borderRadius: "50%" }}
          />

          <h3>{food.name}</h3>
          <p>Cuisine: {food.cuisine}</p>
          <p>Rating: ⭐ {food.rating}</p>
          <p>₹250</p>
        </div>
      ))}
    </div>
  );
}
