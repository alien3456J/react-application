import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Effect to apply theme class
  useEffect(() => {
    document.body.className = isDarkTheme ? "dark-theme" : "light-theme";
  }, [isDarkTheme]);

  function toggleTheme() {
    setIsDarkTheme((prev) => !prev);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title: newItem, completed: false },
    ]);
    setNewItem("");
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  function startEditing(todo) {
    setIsEditing(todo.id);
    setEditInput(todo.title);
  }

  function saveEdit(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, title: editInput } : todo
      )
    );
    setIsEditing(null);
    setEditInput("");
  }

  return (
    <>
      <button onClick={toggleTheme} className="btn">
        Toggle Theme
      </button>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">Input New Item</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="text"
          />
        </div>
        <button className="btn" disabled={!newItem.trim()}>
          Add
        </button>
      </form>
      <h1 className="header">Todo List</h1>
      <h2>{todos.filter((todo) => !todo.completed).length} tasks remaining</h2>
      <ul className="list">
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <div className="todo-container">
                {isEditing === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                      className="edit-input"
                    />
                    <button onClick={() => saveEdit(todo.id)} className="btn">
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <label>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                      />
                      {todo.title}
                    </label>
                    <button
                      onClick={() => startEditing(todo)}
                      className="btn btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
