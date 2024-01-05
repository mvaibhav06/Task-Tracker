import { useState } from "react";
import axios from "axios";

const Todo = ({ tasks }) => {
  const [task, setTask] = useState("");

  const handleStatus = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/tasks/${id}`);
    let data = response.data;
    data.status = !data.status;

    const res = await axios.put("http://localhost:8080/api/tasks", data);
    console.log(res.data);
  };

  const handleDelete = async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/api/tasks/${id}`
    );
    console.log(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (task.length > 0) {
      try {
        const data = {
          date: "2024-04-22",
          status: 0,
          title: task,
        };
        const response = await axios.post(
          "http://localhost:8080/api/tasks",
          data
        );
        console.log(response);
        setTask("");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const renderedItems = tasks.map((newTask) => {
    return (
      <div className="row container my-2" key={newTask.id}>
        <div className="col-4 py-3 bg-light">
          <input
            type="checkbox"
            checked={newTask.status === true}
            onChange={() => handleStatus(newTask.id)}
            className="form-check-input mx-4 my-2"
          />
          <span>
            <strong
              className={newTask.status ? "text-decoration-line-through" : ""}
            >
              {newTask.title}
            </strong>
          </span>
          <button
            onClick={() => handleDelete(newTask.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="container mt-3">
      <h3 className="mx-3">Todo List</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control bg-light mt-2"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="+ Add task to the application. Press Enter to save!"
        />
      </form>
      <div className="mx-4 my-3">{renderedItems}</div>
    </div>
  );
};

export default Todo;
