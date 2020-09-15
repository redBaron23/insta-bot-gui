import React, { Component } from "react";
import "./App.css";
import Main from "./views/Main";
import LogIn from "./views/LogIn";
import { ThemeProvider } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Account } from "./fun/account";

const SecuredRoute = props => {
  return (
    <Route
      path={props.path}
      render={data =>
        props.isLogged ? (
          <props.render {...data}></props.render>
        ) : (
          <Redirect to={{ pathname: "/" }}></Redirect>
        )
      }
    ></Route>
  );
};

class App extends Component {
  state = {
    logged: false,
  };

  render() {
    const { logged } = this.state;


    const handleLogout = () => this.setState({ logged: false });
    const handleLogin = () => {
      this.setState( { logged: true } );
   };
    return (
      <ThemeProvider>
        {/*logged === false && <LogIn success={handleLogin}/>}
	  {logged === true && <Main logout={handleLogin}/>*/}
        <Router>
          <Switch>
            <SecuredRoute
              path="/home"
              isLogged={logged}
              render={props => <Main onLogout={handleLogout} {...props} />}
            ></SecuredRoute>
            <Route
              path="/"
              render={props =>
                !logged ? (
                  <LogIn onLogin={handleLogin} {...props} />
                ) : (
                  <Redirect to="/home" />
                )
              }
            >
	    </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}
export default App;
