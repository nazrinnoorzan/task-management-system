import React from "react"
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Task Management
        </Link>
        <div className="" id="navbarNav">
          <form className="container-fluid justify-content-start mb-0">
            <Link to="/add-task" className="btn btn-sm btn-outline-success" role="button">
              Add Task
            </Link>
            <Link to="/" className="btn btn-sm btn-outline-secondary ml-sm-1 mt-1 mt-sm-0" role="button">
              View Task
            </Link>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
