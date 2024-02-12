"use client";
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'


const priorityColors = {
  low: 'green',
  medium: 'yellow',
  high: 'red',
};

const Todo = () => {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('low');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');
  const [editedTaskPriority, setEditedTaskPriority] = useState('low');
  const [filterPriority, setFilterPriority] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks && storedTasks.length > 0) {
      setTasks(storedTasks);
    } 
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      const newTaskObj = {
        id: tasks.length + 1,
        title: newTask,
        priority,
        completed: false,
      };
      Swal.fire({
        title: "Congrats!",
        text: `Task ${newTask} has been added successfully!`,
        icon: "success"
      });
      setTasks([...tasks, newTaskObj]);
      localStorage.setItem('tasks', JSON.stringify([...tasks, newTaskObj]));
      setNewTask('');
    }
  };

  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    Swal.fire({
      title: "Deleted!",
      text: `Task ${id} has been deleted successfully!`,
      icon: "success"
    });
  };

  const startEditing = (id, title, priority) => {
    setEditTaskId(id);
    setEditedTaskTitle(title);
    setEditedTaskPriority(priority);
  };

  const saveEditedTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editTaskId
          ? { ...task, title: editedTaskTitle, priority: editedTaskPriority }
          : task
      )
    );
    setEditTaskId(null);
    setEditedTaskTitle('');
    setEditedTaskPriority('low');
  };

  const filterTasks = (priority) => {
    setFilterPriority(priority);
  };

  const filteredTasks = filterPriority
    ? tasks.filter((task) => task.priority === filterPriority)
    : tasks;

  return (
    <div className="bg-teal-300 p-4 mx-auto w-fit mt-3">
      <form className="flex gap-2" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter your task"
          className="py-2 px-5 rounded-sm"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <select
          value={priority} onChange={(e) => setPriority(e.target.value)}
          className="bg-yellow-700 px-3"
        >
           <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          className="rounded-sm border px-3 bg-green-600"
        >Add Task</button>
      </form>

      <div className="mt-3">
        <label className="mr-2">Filter by Priority:</label>
        <select
          value={filterPriority}
          onChange={(e) => filterTasks(e.target.value)}
          className="bg-yellow-700 px-3"
        >
          <option value="">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="overflow-x-auto mt-2">
        <table className="table-auto w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th></th>
              <th className="px-4 py-2">Tasks</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Priority</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td className="border px-4 py-2">{task.id}</td>
                <td className="border px-4 py-2">{task.title}</td>
                <td className={`border px-4 py-2 ${priorityColors[task.priority]}`}>{task.completed ? 'Completed' : 'Pending'}</td>
                <td className={`border px-4 py-2 bg-${priorityColors[task.priority]}`}>{task.priority}</td>
                <td className="border px-4 py-2 flex gap-3">
                  {editTaskId === task.id ? (
                    <>
                      <input
                        type="text"
                        value={editedTaskTitle}
                        onChange={(e) => setEditedTaskTitle(e.target.value)}
                      />
                      <select
                        value={editedTaskPriority}
                        onChange={(e) => setEditedTaskPriority(e.target.value)}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      <button onClick={saveEditedTask}>Save</button>
                    </>
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskStatus(task.id)}
                      />
                      <label htmlFor="completed">{task.completed ? 'Completed' : 'Pending'}</label>
                      <button onClick={() => startEditing(task.id, task.title, task.priority)}>Edit</button>
                      <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Todo;
