import React, { useRef, useState } from "react"

function AddTask(props) {
  const [name, setName] = useState("")
  const [parentID, setTaskID] = useState("")
  const addFieldRef = useRef(null)

  function handleChangeTaskName(e) {
    setName(e.target.value)
  }

  function handleChangeTaskID(e) {
    setTaskID(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    addFieldRef.current.focus()

    if (name !== "" && parentID !== "") {
      props.addTask(name, parentID)
      setName("")
      setTaskID("")
    } else if (name !== "") {
      props.addTask(name, parentID)
      setName("")
    } else {
      alert("Please insert a task name!")
    }
  }

  return (
    <div className="container mt-5 text-center">
      <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            Add new task
          </label>
        </h2>
        <div className="mb-3">
          <input type="text" autoFocus id="new-todo-input" className="form-control" name="text" autoComplete="off" placeholder="Enter task name*" value={name} onChange={handleChangeTaskName} ref={addFieldRef} />
        </div>
        <div className="mb-3">
          <input type="text" id="new-todo-id" className="form-control" name="text" autoComplete="off" placeholder="Enter parent task ID" value={parentID} onChange={handleChangeTaskID} />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  )
}

export default AddTask
