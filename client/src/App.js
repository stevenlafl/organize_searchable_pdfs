import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";

import CreateDocument from "./components/Document/CreateDocument";
import EditDocument from "./components/Document/EditDocument";
import DocumentList from "./components/Document/DocumentList";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/" target="_blank">
              Logo
            </a>
            <Link to="/" className="navbar-brand">DAM</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Documents</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Document</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={DocumentList} />
          <Route path="/edit/:id" component={EditDocument} />
          <Route path="/create" component={CreateDocument} />
        </div>
      </Router>
    );
  }
}

export default App;