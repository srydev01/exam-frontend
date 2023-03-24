import React from "react";
import Home from "./pages/Home";

import './main.scss'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";



const App = () => {
  return (
    <div className="App">
      <Header />
      <div className='container'>
        <Router>
          <Switch>
            <Route path="/" exact component={() => <Home />} />
          </Switch>
        </Router>
      </div>
    </div>
  )
};

export default App;
