import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"

//components
import Navbar from "./components/Navbar"
import TaskList from "./components/TaskList"
import AddTask from "./components/AddTask"
import FilterTask from "./components/FilterTask"

const FILTER_MAP = {
  All: () => true,
  "On Going": task => !task.completed,
  Done: task => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

function App(props) {
  const [tasks, setTasks] = useState(props.tasks)
  const [filter, setFilter] = useState("All")

  // only run once the first time this component is rendered
  useEffect(() => {
    if (localStorage.getItem("taskListData")) {
      setTasks(JSON.parse(localStorage.getItem("taskListData")))
    }
  }, [])

  // run every time out tasks state changes
  useEffect(() => {
    localStorage.setItem("taskListData", JSON.stringify(tasks))
  }, [tasks])

  function addTask(name, parentID) {
    const newTask = {
      id: "#Task-" + nanoid(),
      name: name,
      completed: false,
      parentID: parentID
    }
    setTasks([...tasks, newTask])
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName, completed: false }
      }
      return task
    })
    setTasks(editedTaskList)
  }

  //render tasklist
  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => <TaskList id={task.id} parentID={task.parentID} name={task.name} completed={task.completed} key={task.id} toggleTaskCompleted={toggleTaskCompleted} editTask={editTask} />)

  //render filter button
  const filterList = FILTER_NAMES.map(name => <FilterTask key={name} name={name} isPressed={name === filter} setFilter={setFilter} />)

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <div className="container mt-5 text-center">{filterList}</div>
          <div className="container mt-3">{taskList}</div>
          <div className="container mt-3 text-center">
            <Link to="/add-task" className="btn btn-sm btn-outline-success" role="button">
              Add Task
            </Link>
          </div>
        </Route>
        <Route path="/add-task" exact>
          <AddTask addTask={addTask} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
