import React, { useState, useEffect } from "react";
import { BiCheck, BiPencil, BiUndo } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

export default function ToDoPage() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [status, setStatus] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("all");

  const completedCount = status.filter((s) => s === "Completed").length;
  const pendingCount = tasks.length - completedCount;

  const filteredIndices = tasks
    .map((_, i) => i)
    .filter((i) => {
      if (filter === "pending") return status[i] === "Incomplete";
      if (filter === "done") return status[i] === "Completed";
      return true;
    });

  const addTask = () => {
    if (!task.trim()) return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = task;
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setEditIndex(null);
    } else {
      const updatedTasks = [...tasks, task];
      const updatedStatus = [...status, "Incomplete"];
      setTasks(updatedTasks);
      setStatus(updatedStatus);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      localStorage.setItem("status", JSON.stringify(updatedStatus));
    }

    setTask("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  const toggleStatus = (i) => {
    const newStatus = [...status];
    newStatus[i] = newStatus[i] === "Incomplete" ? "Completed" : "Incomplete";
    setStatus(newStatus);
    localStorage.setItem("status", JSON.stringify(newStatus));
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    const updatedStatus = status.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setStatus(updatedStatus);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem("status", JSON.stringify(updatedStatus));

    if (editIndex === index) {
      setEditIndex(null);
      setTask("");
    }
  };

  const editTask = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setTask("");
  };

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const savedStatus = JSON.parse(localStorage.getItem("status")) || [];
    setTasks(savedTasks);
    setStatus(savedStatus);
  }, []);

  const StatusBadge = ({ value }) =>
    value === "Completed" ? (
      <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700">
        Done
      </span>
    ) : (
      <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">
        Pending
      </span>
    );

  const FilterBtn = ({ value, label, count }) => (
    <button
      onClick={() => setFilter(value)}
      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
        filter === value
          ? "bg-indigo-600 text-white border-indigo-600"
          : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
      }`}
    >
      {label}
      <span
        className={`ml-1.5 text-xs ${
          filter === value ? "text-indigo-200" : "text-gray-400"
        }`}
      >
        {count}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-xl font-medium text-gray-900 mb-1">My Tasks</h1>
          <p className="text-sm text-gray-400">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"} ·{" "}
            {completedCount} completed
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="What needs to be done?"
            className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {editIndex !== null && (
            <button
              onClick={cancelEdit}
              className="px-4 py-2.5 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            onClick={addTask}
            className="px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:scale-95 transition-all"
          >
            {editIndex !== null ? "Update" : "+ Add task"}
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <FilterBtn value="all" label="All" count={tasks.length} />
          <FilterBtn value="pending" label="Pending" count={pendingCount} />
          <FilterBtn value="done" label="Completed" count={completedCount} />
        </div>

        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          {filteredIndices.length === 0 ? (
            <div className="py-16 text-center text-sm text-gray-400">
              {filter === "done"
                ? "No completed tasks yet"
                : filter === "pending"
                  ? "No pending tasks — you're all caught up!"
                  : "Add a task above to get started"}
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-xs font-medium uppercase tracking-wide text-gray-400 px-5 py-3 text-left border-b border-gray-100 w-1/2">
                    Task
                  </th>
                  <th className="text-xs font-medium uppercase tracking-wide text-gray-400 px-5 py-3 text-left border-b border-gray-100">
                    Status
                  </th>
                  <th className="text-xs font-medium uppercase tracking-wide text-gray-400 px-5 py-3 text-right border-b border-gray-100">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredIndices.map((i) => (
                  <tr
                    key={i}
                    className={`group transition-colors hover:bg-gray-50 ${
                      editIndex === i ? "bg-indigo-50" : ""
                    }`}
                  >
                    <td
                      className={`px-5 py-3.5 text-sm border-b border-gray-100 ${
                        status[i] === "Completed"
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {tasks[i]}
                    </td>

                    <td className="px-5 py-3.5 border-b border-gray-100">
                      <StatusBadge value={status[i]} />
                    </td>

                    <td className="px-5 py-3.5 border-b border-gray-100">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => toggleStatus(i)}
                          title={
                            status[i] === "Incomplete"
                              ? "Mark as done"
                              : "Mark as pending"
                          }
                          className={`p-1.5 rounded-md text-gray-400 transition-colors ${
                            status[i] === "Incomplete"
                              ? "hover:text-green-600 hover:bg-green-50"
                              : "hover:text-amber-600 hover:bg-amber-50"
                          }`}
                        >
                          {status[i] === "Incomplete" ? (
                            <BiCheck size={16} />
                          ) : (
                            <BiUndo size={16} />
                          )}
                        </button>

                        <button
                          onClick={() => deleteTask(i)}
                          title="Delete task"
                          className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <MdDelete size={16} />
                        </button>

                        <button
                          onClick={() => editTask(i)}
                          title="Edit task"
                          disabled={status[i] === "Completed"}
                          className={`p-1.5 rounded-md transition-colors ${
                            status[i] === "Completed"
                              ? "text-gray-200 cursor-not-allowed"
                              : "text-gray-400 hover:text-indigo-500 hover:bg-indigo-50"
                          }`}
                        >
                          <BiPencil size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {tasks.length > 0 && (
          <p className="text-xs text-gray-400 text-center mt-4">
            {pendingCount === 0
              ? "All tasks completed 🎉"
              : `${pendingCount} task${pendingCount !== 1 ? "s" : ""} remaining`}
          </p>
        )}
      </div>
    </div>
  );
}
