"use client";

import { useState, useEffect } from "react";
import styles from "./style.module.css";

export default function TodoApp2() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos-app2");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos-app2", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim().length > 0) {
      const newTodo = {
        id: Date.now(),
        text: input.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        priority: "medium",
      };
      setTodos([newTodo, ...todos]);
      setInput("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const setPriority = (id, priority) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, priority } : todo))
    );
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (editText.trim().length > 0) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, text: editText.trim() } : todo
        )
      );
    }
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const handleEditKeyPress = (e) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#ff4757";
      case "medium":
        return "#ffa502";
      case "low":
        return "#2ed573";
      default:
        return "#70a1ff";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.todoApp}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <span className={styles.icon}>✓</span>
            Gelişmiş Todo Uygulaması
          </h1>
          <p className={styles.subtitle}>
            Görevlerinizi organize edin ve verimli olun
          </p>
        </header>

        <div className={styles.inputSection}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Yeni görev ekleyin..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={handleKeyPress}
              className={styles.input}
            />
            <button onClick={addTodo} className={styles.addButton}>
              <span className={styles.addIcon}>+</span>
            </button>
          </div>
        </div>

        <div className={styles.filterSection}>
          <div className={styles.filterButtons}>
            <button
              onClick={() => setFilter("all")}
              className={`${styles.filterButton} ${
                filter === "all" ? styles.active : ""
              }`}
            >
              Tümü ({todos.length})
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`${styles.filterButton} ${
                filter === "active" ? styles.active : ""
              }`}
            >
              Aktif ({activeCount})
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`${styles.filterButton} ${
                filter === "completed" ? styles.active : ""
              }`}
            >
              Tamamlanan ({completedCount})
            </button>
          </div>
          {completedCount > 0 && (
            <button onClick={clearCompleted} className={styles.clearButton}>
              Tamamlananları Temizle
            </button>
          )}
        </div>

        <div className={styles.todoList}>
          {filteredTodos.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>📝</span>
              <p className={styles.emptyText}>
                {filter === "all"
                  ? "Henüz görev yok. Yukarıdan yeni görev ekleyin!"
                  : filter === "active"
                  ? "Tüm görevler tamamlanmış! 🎉"
                  : "Henüz tamamlanmış görev yok."}
              </p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`${styles.todoItem} ${
                  todo.completed ? styles.completed : ""
                }`}
              >
                <div className={styles.todoContent}>
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`${styles.checkbox} ${
                      todo.completed ? styles.checked : ""
                    }`}
                  >
                    {todo.completed && (
                      <span className={styles.checkmark}>✓</span>
                    )}
                  </button>

                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={handleEditKeyPress}
                      onBlur={saveEdit}
                      className={styles.editInput}
                      autoFocus
                    />
                  ) : (
                    <span
                      className={styles.todoText}
                      onDoubleClick={() => startEdit(todo)}
                    >
                      {todo.text}
                    </span>
                  )}
                </div>

                <div className={styles.todoActions}>
                  <div className={styles.prioritySelector}>
                    <select
                      value={todo.priority}
                      onChange={(e) => setPriority(todo.id, e.target.value)}
                      className={styles.prioritySelect}
                      style={{ borderColor: getPriorityColor(todo.priority) }}
                    >
                      <option value="low">Düşük</option>
                      <option value="medium">Orta</option>
                      <option value="high">Yüksek</option>
                    </select>
                  </div>

                  <button
                    onClick={() => startEdit(todo)}
                    className={styles.actionButton}
                    title="Düzenle"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    title="Sil"
                  >
                    🗑️
                  </button>
                </div>

                <div
                  className={styles.priorityIndicator}
                  style={{ backgroundColor: getPriorityColor(todo.priority) }}
                ></div>
              </div>
            ))
          )}
        </div>

        {todos.length > 0 && (
          <footer className={styles.footer}>
            <div className={styles.stats}>
              <span className={styles.stat}>
                Toplam: <strong>{todos.length}</strong>
              </span>
              <span className={styles.stat}>
                Aktif: <strong>{activeCount}</strong>
              </span>
              <span className={styles.stat}>
                Tamamlanan: <strong>{completedCount}</strong>
              </span>
              <span className={styles.stat}>
                İlerleme:{" "}
                <strong>
                  {todos.length > 0
                    ? Math.round((completedCount / todos.length) * 100)
                    : 0}
                  %
                </strong>
              </span>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
