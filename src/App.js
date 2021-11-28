import { useState } from "react";

import { allTasks } from "./tasks";

import AppStyles from "./App.module.css";

function App() {
  const [tasks, setTasks] = useState(allTasks);
  const complete = tasks.filter((task) => task.status === "complete");
  const pending = tasks.filter((task) => task.status === "pending");

  function handleDragStart(e, id) {
    e.dataTransfer.setData("text/plain", id);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e, status) {
    const id = e.dataTransfer.getData("text/plain");
    const newTasks = tasks.filter((task) => {
      if (task.id === id) {
        task.status = status;
      }
      return task;
    });
    setTasks(newTasks);
  }

  return (
    <div className={AppStyles.container}>
      <div className={AppStyles.completetasks}>
        <p>Complete</p>
        <div
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, "complete")}
          className={AppStyles.tasklist}
        >
          {complete.map((task) => {
            return (
              <div draggable onDragStart={(e) => handleDragStart(e, task.id)}>
                <p>{task.name}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e, "pending")}
        className={AppStyles.pendingtasks}
      >
        <p>Pending</p>
        <div className={AppStyles.tasklist}>
          {pending.map((task) => {
            return (
              <div draggable onDragStart={(e) => handleDragStart(e, task.id)}>
                <p>{task.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
