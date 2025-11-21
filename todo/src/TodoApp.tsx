import React, { useState } from "react";
import "./styles.css";

export default function TodoApp() {
  const [text, setText] = useState<string>("");
  const [list, setList] = useState<string[]>([]);

  const addTodo = () => {
    if (!text.trim()) return;
    setList([...list, text]);
    setText("");
  };

  const deleteTodo = (index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <input
        value={text}
        placeholder="Enter todo..."
        onChange={(e) => setText(e.target.value)}
        className="todo-input"
      />
      <button onClick={addTodo} className="todo-add-btn">
        Add
      </button>
      <ul className="todo-list">
        {list.map((item, idx) => (
          <li key={idx} className="todo-item">
            {item}
            <button onClick={() => deleteTodo(idx)} className="delete-btn">
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
