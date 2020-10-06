import React, { Component } from "react";
import "./App.css";
import Main from "./views/Main";
import LogIn from "./views/LogIn";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
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
    logged: localStorage.getItem("logged")
  };

  render() {
    const { logged } = this.state;

    const theme = createMuiTheme({
      status: {
        danger: orange[500]
      }
    });
    const handleLogout = () => {
      //Borro sesion
      localStorage.clear();
      this.setState({ logged: false });
    };
    const handleLogin = () => {
      localStorage.setItem("logged", true);
      this.setState({ logged: true });
    };
    return (
      <ThemeProvider theme={theme}>
        {/*logged === false && <LogIn success={handleLogin}/>}
	  {logged === true && <Main logout={handleLogin}/>*/}
        <Router>
          <Switch>
            <SecuredRoute
              path="/unfollowers"
              isLogged={logged}
              render={props => (
                <Main page="unfollowers" onLogout={handleLogout} {...props} />
              )}
            ></SecuredRoute>
            <SecuredRoute
              path="/bot"
              isLogged={logged}
              render={props => (
                <Main page="bot" onLogout={handleLogout} {...props} />
              )}
            ></SecuredRoute>
            <Route
              path="/"
              render={props =>
                !logged ? (
                  <LogIn onLogin={handleLogin} {...props} />
                ) : (
                  <Redirect to="/bot" />
                )
              }
            ></Route>
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}
export default App;
