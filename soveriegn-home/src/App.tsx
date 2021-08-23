import './App.css';
import React from 'react';
import home from "./site";
import { Switch, Route } from "react-router-dom";
import Gaming from "./Gaming"
import gridGame from "./GridGame"

function App() {

  return (
    <Switch>
      <Route exact = {true} path = "/" component={home} />
      <Route path = "/gamer" component={Gaming} />
      <Route path = "/game" component = {gridGame} />
    </Switch>
  );
}

export default App;
