import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from "../Header"
import Landing from "../Landing"
import Footer from "../Footer"
import Welcome from "../Welcome/index"
import Login from "../Login/index"
import Signup from "../Signup/index"
import ErrorPage from "../ErrorPage/index"
import ForgetPassword from '../ForgetPassword/index'
import { IconContext } from 'react-icons'

import '../../App.css';

function App() {
  return (
    <Router>
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <Header />

          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgetpassword" component={ForgetPassword} />
            <Route component={ErrorPage} />
          </Switch>

        <Footer />
      </IconContext.Provider>
    </Router>
  );
}

export default App;
