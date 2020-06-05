import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import FormManager from './components/FormManager/FormManager';
import FormDetail from './components/FormManager/FormDetail/FormDetail';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className="container">
        <nav className="navbar navbar-light bg-dark text-white">
          <Link style={{color:"white",textDecoration:"none"}} to={{pathname:"/forms"}}><h5>Form Manager</h5></Link>
        </nav>
        <Switch>
          <Route exact path="/forms" component={FormManager} />
          <Route path="/forms/:id" component={FormDetail} />
          <Route path="/forms/:id" component={FormDetail} />
          <Redirect to={"/forms"} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
