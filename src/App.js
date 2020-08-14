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
    logged: false
  };

  render() {
    const { logged } = this.state;

    const keepAccount = async (data, customAlert,isLoading) => {
      if (data.status === 200) {
        localStorage.setItem("account", JSON.stringify(data.data));
        this.setState({ logged: true });
	console.log(data.data)
      } else {
        customAlert("Wrong password or username", "error");
      }
      isLoading(false)
    };
    const handleLogout = () => this.setState({ logged: false });
    const handleLogin = (username, password, customAlert,isLoading) => {
      let account = new Account(username, password);
      account
        .init()
        .then(res => keepAccount(res, customAlert,isLoading))
        .catch(e => console.log(e));
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
            ></Route>
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}
export default App;
