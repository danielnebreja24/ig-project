import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./component/home";
import Profile from "./component/profile";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Message from "./component/messageComponent/messages";
// import Sample from "./component/sample";

import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile" component={Profile} />
        <Route path="/message" component={Message} />
        {/* <Route path="/sample" component={Sample} /> */}
      </Switch>
    </Router>
  );
}

export default App;
