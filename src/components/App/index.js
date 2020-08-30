import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from "../Header"
import Landing from "../Landing"
import Footer from "../Footer"
import Welcome from "../Welcome/index"
import Login from "../Login/index"
import Signup from "../Signup/index"
import ErrorPage from "../ErrorPage/index"

import '../../App.css';

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route component={ErrorPage} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;