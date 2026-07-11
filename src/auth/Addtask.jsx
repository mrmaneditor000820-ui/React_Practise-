import { useState, useEffect } from "react";
import {
  addTask,
  getAllTasks,
  deleteTask,
  updateTask,
  toggleTaskComplete,
  auth,
} from "../firebasecode/Firebase";
import "./Addtask.css";

function TaskManager() {
  // ---- Sirf 3 states, pehle 6 the ----
  const [tasks, setTasks] = useState([]);        // saare tasks ki list
  const [loading, setLoading] = useState(true);   // loading dikhana hai ya nahi
  const [error, setError] = useState("");         // koi error message

  const [newTaskText, setNewTaskText] = useState("");  // naya task likhne wala input
  const [editingTask, setEditingTask] = useState(null); // { id, text } — jo task edit ho raha hai

  // ---- Tasks load karna (page load pe ek dafa) ----
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---- ADD ----
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    if (!auth.currentUser) {
      setError("Task add karne ke liye login karo");
      return;
    }

    try {
      await addTask(newTaskText, auth.currentUser);
      setNewTaskText("");
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  // ---- DELETE ----
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  // ---- EDIT SAVE ----
  const handleUpdate = async () => {
    if (!editingTask.text.trim()) return;
    try {
      await updateTask(editingTask.id, editingTask.text);
      setEditingTask(null); // edit mode band karo
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  // ---- TOGGLE COMPLETE ----
  const handleToggle = async (task) => {
    try {
      await toggleTaskComplete(task.id, task.completed);
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="task-container">
      <h2>My Tasks</h2>

      <form onSubmit={handleAdd} className="task-form">
        <input
          type="text"
          placeholder="Naya task likho..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {error && <p className="error-text">{error}</p>}

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>Koi task nahi hai.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              {editingTask?.id === task.id ? (
                // ---- EDIT MODE ----
                <>
                  <input
                    type="text"
                    value={editingTask.text}
                    onChange={(e) =>
                      setEditingTask({ ...editingTask, text: e.target.value })
                    }
                    className="edit-input"
                  />
                  <div className="task-actions">
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditingTask(null)}>Cancel</button>
                  </div>
                </>
              ) : (
                // ---- NORMAL VIEW ----
                <>
                  <span
                    onClick={() => handleToggle(task)}
                    className={task.completed ? "task-done" : ""}
                  >
                    {task.text}
                  </span>
                  <div className="task-actions">
                    <button onClick={() => setEditingTask({ id: task.id, text: task.text })}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskManager;