import React from "react"

function FilterTask(props) {
  return (
    <button type="button" className={"btn btn-primary mx-1 mb-1" + (props.name == "On Going" ? " btn-danger" : "") + (props.name == "Done" ? " btn-success" : "")} aria-pressed={props.isPressed} onClick={() => props.setFilter(props.name)}>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  )
}

export default FilterTask
