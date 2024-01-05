import "./App.css";
import Navbar from "./Navbar";
import axios from "axios";
import Todo from "./Todo";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8080/api/tasks");
    setTasks(response.data);
  };

  useEffect(() => {
    fetchData();
  }, [tasks]);

  return (
    <div>
      <Navbar />
      <Todo tasks={tasks} />
      {tasks.length === 0 ? <p className="text-center">Nothing to do</p> : ""}
    </div>
  );
}

export default App;
