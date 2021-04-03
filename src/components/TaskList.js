import React, { useEffect, useRef, useState } from "react"

function TaskList(props) {
  const [isEditing, setEditing] = useState(false)
  const [newName, setNewName] = useState("")
  const editFieldRef = useRef(null)

  function handleChange(e) {
    setNewName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (newName !== "") {
      props.editTask(props.id, newName)
      setNewName("")
      setEditing(false)
    } else {
      alert("Please insert a task name!")
    }
  }

  const editingTemplate = (
    <div className="col-12">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor={props.id}>
            New task name
          </label>
          <input id={props.id} className="form-control" type="text" value={newName} onChange={handleChange} ref={editFieldRef} />
        </div>
        <div className="btn-group btn-group-sm border border-white rounded">
          <button type="button" className="btn btn-danger" onClick={() => setEditing(false)}>
            Cancel
          </button>
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>
      </form>
    </div>
  )
  const viewTemplate = (
    <>
      <div className="col-sm-3">
        <p>{props.id}</p>
      </div>
      <div className="col-sm-6">
        <div className="form-check mb-2">
          <input id={props.id} className="form-check-input" type="checkbox" defaultChecked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)} />
          <label className="form-check-label" htmlFor={props.id}>
            {props.name}
          </label>
        </div>
        <button type="button" className="btn btn-secondary btn-sm d-block" onClick={() => setEditing(true)}>
          Edit Task
        </button>
      </div>
      <div className="col-sm-3">
        <p>{props.completed ? "Done" : "On Going"}</p>
      </div>
    </>
  )

  useEffect(() => {
    if (isEditing) {
      editFieldRef.current.focus()
    }
  }, [isEditing])

  return <div className={"row align-items-center border rounded mb-1 py-2 bg-gradient text-white" + (props.completed ? " bg-success" : " bg-danger")}>{isEditing ? editingTemplate : viewTemplate}</div>
}

export default TaskList
