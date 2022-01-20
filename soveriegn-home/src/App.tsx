import './App.css';
import React from 'react';
import home from "./site";
import { Switch, Route } from "react-router-dom";
import Gaming from "./Gaming"
import gridGame from "./GridGame"

function App() {

  return (
    <Switch>
      <Route path = "/game" component = {gridGame} />
      <Route exact path = "" component={home} />
    </Switch>
  );
}

export default App;
