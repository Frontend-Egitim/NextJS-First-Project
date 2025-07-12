"use client";

import { useState } from "react";

export default function TodoScreen() {
  const [todolist, setTodoList] = useState([]);
  const [input, setInput] = useState("");

  const addItem = () => {
    if (input.trim().length > 0) {
      setTodoList((eskiListe) => [...eskiListe, { title: input }]);
    }
    setInput("");
  };

  return (
    <div style={{ fontFamily: "helvetica" }}>
      {/* Header */}

      <h1>Todo List</h1>

      {/* Todo List */}
      <div>
        <div style={{ display: "flex" }}>
          <input
            id="input"
            type="text"
            placeholder="add new todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              borderRadius: 12,
              marginRight: 6,
              paddingLeft: 6,
              borderWidth: 1,
              outlineWidth: 0,
            }}
          />
          <div
            onClick={addItem}
            style={{
              padding: 8,
              cursor: "pointer",
              userSelect: "none",
              backgroundColor: "#007AFF",
              borderRadius: 12,
              color: "white",
              fontWeight: "bold",
            }}
          >
            Ekle
          </div>
        </div>
        {todolist.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#909090",
              color: "white",
              marginBlock: 6,
              paddingInline: 12,
              height: 30,
              display: "flex",
              alignItems: "center",
              borderRadius: 16,
            }}
          >
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
