import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom'
import routes from "./routes";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          {routes.map((route, i) => <Route key={i} {...route} />)}
        </Switch>
      </div>
    )
  }
}

export default App
