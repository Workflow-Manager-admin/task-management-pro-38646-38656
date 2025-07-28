import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import "@fontsource/jost"; // modern font import; fallback in index.css

import AppBar from "./components/AppBar";
import StatusBar from "./components/StatusBar";
import FabAddTodo from "./components/FabAddTodo";
import NavigasiBar from "./components/NavigasiBar";
import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";

/* Utility: Generate unique IDs (for demo only) */
const uuid = () => Math.random().toString(36).substr(2, 9);

const initialDemoTasks = [
  {
    id: uuid(),
    title: "Buy groceries",
    detail: "Milk, Eggs, Bread, Bananas",
    completed: false,
  },
  {
    id: uuid(),
    title: "Call Alex",
    detail: "Project handoff, meeting 3pm",
    completed: false,
  },
  {
    id: uuid(),
    title: "Morning Jog",
    detail: "30 minutes in park",
    completed: true,
  },
];

// PUBLIC_INTERFACE
function App() {
  // Theme state
  const [theme, setTheme] = useState("light");

  // Task storage (would be remote/backend in a real app)
  const [tasks, setTasks] = useState(() => [...initialDemoTasks]);

  // Track current filter: 'all' | 'completed'
  const [filter, setFilter] = useState("all");

  // For focus and animation transitions
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Navigation helpers for programmatic navigation
  // Use wrapper to provide router context to child components needing navigation
  return (
    <Router>
      <MainContent
        theme={theme}
        setTheme={setTheme}
        tasks={tasks}
        setTasks={setTasks}
        filter={filter}
        setFilter={setFilter}
      />
    </Router>
  );
}

// Internal component so useNavigate is available
function MainContent({ theme, setTheme, tasks, setTasks, filter, setFilter }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Route-based selection
  const isMain = location.pathname === "/" || location.pathname === "/all";
  const isCompleted = location.pathname === "/completed";
  const isAdd = location.pathname === "/add";
  const isEdit = location.pathname.startsWith("/edit/");

  // Accessibility: trap focus, reset scroll for modal/add/edit screens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Actions for CRUD
  const handleAdd = (task) => {
    setTasks((prev) => [
      ...prev,
      { id: uuid(), ...task, completed: false },
    ]);
    navigate("/");
  };

  const handleEdit = (id, updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedTask } : t))
    );
    navigate("/");
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: true } : t
      )
    );
  };

  // Listen for filter change (navigates to correct route)
  const navHandler = (nextFilter) => {
    setFilter(nextFilter);
    if (nextFilter === "completed") navigate("/completed");
    else navigate("/");
  };

  // Editing existing task state
  let editTask = null;
  if (isEdit) {
    const id = location.pathname.replace("/edit/", "");
    editTask = tasks.find((t) => t.id === id);
  }

  // List rendering
  const tasksAll = tasks;
  const tasksCompleted = tasks.filter((t) => t.completed);
  const tasksPending = tasks.filter((t) => !t.completed);

  // AppBar titles by route
  let appBarTitle = "TODO APP";
  if (isAdd) appBarTitle = "Add Task";
  else if (isCompleted) appBarTitle = "Completed Task";
  else if (isEdit) appBarTitle = "Edit Task";

  return (
    <div className="App" style={{ minHeight: "100vh", background: "var(--color-ffffff)" }}>
      <StatusBar />
      <AppBar
        title={appBarTitle}
        showBack={isAdd || isEdit || isCompleted}
        onBack={()=>navigate(-1)}
        rightIcon={
          (!isAdd && !isEdit && !isCompleted) &&
          <img
            src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/40c83010-6203-4ae0-ab3c-786d068b8495"
            width={32}
            height={32}
            alt="Calendar"
          />
        }
      />
      <button
        className="theme-toggle"
        style={{ position: "absolute", top: 20, right: 80, zIndex: 500 }}
        onClick={()=>setTheme(theme === "light" ? "dark" : "light")}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      <main className="screen-frame" style={{ background: isMain || isCompleted ? "var(--color-d6d7ef)" : "var(--color-ffffff)",  minHeight: "896px", maxWidth: "414px", margin:"0 auto" }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section
                  className="todos-list"
                  role="list"
                  aria-label="All Tasks"
                  style={{ marginBottom: "80px" }}
                >
                  {tasksPending.length === 0 ? (
                    <div className="todo-item" style={{ justifyContent: "center", opacity: 0.5 }}>
                      <span>No pending tasks</span>
                    </div>
                  ) : (
                    tasksPending.map((task, i) => (
                      <TaskItem
                        key={task.id}
                        title={task.title}
                        detail={task.detail}
                        completed={task.completed}
                        onEdit={() => navigate(`/edit/${task.id}`)}
                        onDelete={() => handleDelete(task.id)}
                        onComplete={() => handleComplete(task.id)}
                        aria-posinset={i + 1}
                        aria-setsize={tasksPending.length}
                      />
                    ))
                  )}
                </section>
                <FabAddTodo onClick={()=>navigate("/add")} />
                <NavigasiBar selected={"all"} onSelect={navHandler} />
              </>
            }
          />
          <Route
            path="/all"
            element={
              <>
                <section
                  className="todos-list"
                  role="list"
                  aria-label="All Tasks"
                  style={{ marginBottom: "80px" }}
                >
                  {tasksPending.length === 0 ? (
                    <div className="todo-item" style={{ justifyContent: "center", opacity: 0.5 }}>
                      <span>No pending tasks</span>
                    </div>
                  ) : (
                    tasksPending.map((task, i) => (
                      <TaskItem
                        key={task.id}
                        title={task.title}
                        detail={task.detail}
                        completed={task.completed}
                        onEdit={() => navigate(`/edit/${task.id}`)}
                        onDelete={() => handleDelete(task.id)}
                        onComplete={() => handleComplete(task.id)}
                        aria-posinset={i + 1}
                        aria-setsize={tasksPending.length}
                      />
                    ))
                  )}
                </section>
                <FabAddTodo onClick={()=>navigate("/add")} />
                <NavigasiBar selected={"all"} onSelect={navHandler} />
              </>
            }
          />
          <Route
            path="/completed"
            element={
              <>
                <section
                  className="todos-list"
                  role="list"
                  aria-label="Completed Tasks"
                  style={{ marginBottom: "80px" }}
                >
                  {tasksCompleted.length === 0
                    ? <div className="todo-item" style={{ justifyContent: "center", opacity: 0.5 }}>
                        <span>No completed tasks</span>
                      </div>
                    : tasksCompleted.map((task, i) => (
                        <TaskItem
                          key={task.id}
                          title={task.title}
                          detail={task.detail}
                          completed={true}
                          onEdit={undefined}
                          onDelete={() => handleDelete(task.id)}
                          onComplete={undefined}
                          aria-posinset={i + 1}
                          aria-setsize={tasksCompleted.length}
                        />
                      ))}
                </section>
                <NavigasiBar selected={"completed"} onSelect={navHandler} />
              </>
            }
          />
          <Route
            path="/add"
            element={
              <TaskForm
                submitLabel="ADD"
                onSubmit={handleAdd}
                onCancel={() => navigate(-1)}
              />
            }
          />
          <Route
            path="/edit/:id"
            element={
              editTask ? (
                <TaskForm
                  submitLabel="Update"
                  initialValues={editTask}
                  onSubmit={(values) => handleEdit(editTask.id, values)}
                  onCancel={() => navigate(-1)}
                />
              ) : (
                <div style={{padding:"48px",textAlign:"center"}}>Task not found.</div>
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
