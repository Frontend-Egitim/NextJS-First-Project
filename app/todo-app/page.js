"use client";

import { useState } from "react";
import styles from "./style.module.css";

export default function TodoScreen() {
  const [todolist, setTodoList] = useState([]);
  const [input, setInput] = useState("");

  function addItem() {
    if (input.trim().length > 0) {
      const newItem = { title: input, id: Date.now() };
      setTodoList((eskiListe) => [...eskiListe, newItem]);
    }
    setInput("");
  }

  function handleDeleteItem(id) {
    const newTodolist = todolist.filter((a) => a.id !== id);
    setTodoList(newTodolist);
  }

  return (
    <div className={styles.container}>
      {/* Header */}

      <h1>Todo List</h1>

      {/* Todo List */}
      <div>
        <div>
          <input
            type="text"
            placeholder="add new todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
              height: 40,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 16,
            }}
          >
            <p>{item.title}</p>
            <button onClick={() => handleDeleteItem(item.id)}>Sil</button>
          </div>
        ))}
      </div>
    </div>
  );
}
