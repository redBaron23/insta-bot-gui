import React, { Component } from "react";
import "./App.css";
import Main from "./views/Main";
import LogIn from './views/LogIn'
import { ThemeProvider } from "@material-ui/core/styles";

class App extends Component {
  state = {
    logged: false
  };
  
  render() {
    const { logged } = this.state;

    const handleLogin = () => {
      this.setState({
	logged:!logged
      })
    }
    return (
        <ThemeProvider >
	  {logged === false && <LogIn success={handleLogin}/>}
	  {logged === true && <Main logout={handleLogin}/>}
	  </ThemeProvider>
    );
  }
}
export default App;
